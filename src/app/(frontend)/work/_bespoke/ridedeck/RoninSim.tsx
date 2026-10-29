'use client';

import { useEffect, useRef, useState } from 'react';
import { initialRide, type RideState } from '@/lib/portfolio/ridedeck-sim';
import type { RigHandle } from './ronin-rig';
import { SimCards } from './SimCards';

type Props = { poster: string; posterAlt: string };

const CARD_HZ = 12;

/**
 * The simulator: the app's Ronin rig on the left, the app's cards on the right, one ride model
 * between them. Drag turns the bike (and leans it when rolling), vertical drag tilts the road,
 * the phone's own sensors can take over, Gas and Rem are held, Hujan wets the road. three.js and
 * the rig load only when the scene nears the screen; the poster stands in before and without WebGL.
 */
export function RoninSim({ poster, posterAlt }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const rig = useRef<RigHandle | null>(null);
  const [live, setLive] = useState(false);
  const [state, setState] = useState<RideState>(initialRide);
  const [rain, setRain] = useState(false);
  const [sensor, setSensor] = useState<'off' | 'on' | 'denied'>('off');
  const [held, setHeld] = useState<{ gas: boolean; brake: boolean }>({ gas: false, brake: false });

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let cancelled = false;
    let lastPaint = 0;
    const near = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        try {
          const { mountRig } = await import('./ronin-rig');
          if (cancelled) return;
          const h = await mountRig(el, {
            onReady: () => setLive(true),
            onState: (s) => {
              const now = performance.now();
              if (now - lastPaint >= 1000 / CARD_HZ) {
                lastPaint = now;
                setState(s);
              }
            },
          });
          if (cancelled) h.dispose();
          else rig.current = h;
        } catch {
          // No WebGL or the parts failed to load: the poster and the cards' resting values stay.
        }
      },
      { rootMargin: '400px 0px' },
    );
    near.observe(el);
    return () => {
      cancelled = true;
      near.disconnect();
      rig.current?.dispose();
      rig.current = null;
    };
  }, []);

  // Drag: horizontal turns the heading and asks for lean, vertical tilts the road.
  useEffect(() => {
    const el = host.current;
    if (!el || !live) return;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let leanDecay = 0;
    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        // Same as above: the drag still works without capture.
      }
    };
    const move = (e: PointerEvent) => {
      const h = rig.current;
      if (!dragging || !h || sensor === 'on') return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      h.input.headingDeg += dx * 0.5;
      h.input.leanDeg = Math.max(-45, Math.min(45, h.input.leanDeg + dx * 0.6));
      h.input.gradePercent = Math.max(-15, Math.min(15, h.input.gradePercent - dy * 0.1));
      clearTimeout(leanDecay);
      leanDecay = window.setTimeout(() => {
        if (rig.current) rig.current.input.leanDeg = 0;
      }, 600);
    };
    const up = () => {
      dragging = false;
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      clearTimeout(leanDecay);
    };
  }, [live, sensor]);

  // Phone sensors: gamma (roll) leans, beta (pitch) tilts the road, alpha turns the heading.
  useEffect(() => {
    if (sensor !== 'on') return;
    const onOrient = (e: DeviceOrientationEvent) => {
      const h = rig.current;
      if (!h) return;
      const landscape = Math.abs(window.orientation ?? 0) === 90;
      const roll = (landscape ? e.beta : e.gamma) ?? 0;
      const pitch = (landscape ? e.gamma : e.beta) ?? 0;
      h.input.leanDeg = Math.max(-45, Math.min(45, roll));
      h.input.gradePercent = Math.max(-15, Math.min(15, (pitch - 45) * 0.3));
      if (e.alpha != null) h.input.headingDeg = 360 - e.alpha;
    };
    window.addEventListener('deviceorientation', onOrient);
    return () => window.removeEventListener('deviceorientation', onOrient);
  }, [sensor]);

  const askSensor = async () => {
    if (sensor === 'on') {
      setSensor('off');
      return;
    }
    const D = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<'granted' | 'denied'> };
    try {
      const ok = typeof D.requestPermission === 'function' ? (await D.requestPermission()) === 'granted' : 'DeviceOrientationEvent' in window;
      setSensor(ok ? 'on' : 'denied');
    } catch {
      setSensor('denied');
    }
  };

  const hold = (key: 'gas' | 'brake', on: boolean) => {
    setHeld((h) => ({ ...h, [key]: on }));
    if (rig.current) rig.current.input[key] = on ? 1 : 0;
  };
  const toggleRain = () => {
    setRain((r) => {
      if (rig.current) rig.current.input.rain = !r;
      return !r;
    });
  };

  // Keyboard: arrows for gas, brake, and heading, so the scene works without a pointer.
  useEffect(() => {
    if (!live) return;
    const keys = (e: KeyboardEvent, on: boolean) => {
      const h = rig.current;
      if (!h || !host.current?.closest('.rd-sim')?.contains(document.activeElement)) return;
      if (e.key === 'ArrowUp') hold('gas', on);
      else if (e.key === 'ArrowDown') hold('brake', on);
      else if (on && e.key === 'ArrowLeft') h.input.headingDeg -= 10;
      else if (on && e.key === 'ArrowRight') h.input.headingDeg += 10;
      else return;
      e.preventDefault();
    };
    const kd = (e: KeyboardEvent) => keys(e, true);
    const ku = (e: KeyboardEvent) => keys(e, false);
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    return () => {
      window.removeEventListener('keydown', kd);
      window.removeEventListener('keyup', ku);
    };
  }, [live]);

  const press = (key: 'gas' | 'brake') => ({
    onPointerDown: (e: React.PointerEvent) => {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // A pointer that cannot be captured still counts as a press.
      }
      hold(key, true);
    },
    onPointerUp: () => hold(key, false),
    onPointerCancel: () => hold(key, false),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') hold(key, true);
    },
    onKeyUp: (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') hold(key, false);
    },
  });

  return (
    <div className="rd-sim">
      <div className="rd-sim__stage">
        <div ref={host} className="rd-sim__view" data-live={live ? 'on' : 'off'} data-rain={rain ? 'on' : 'off'} tabIndex={0} aria-label="Model Ronin 3D. Seret untuk membelokkan dan memiringkan, seret naik turun untuk tanjakan. Panah atas gas, panah bawah rem.">
          {/* eslint-disable-next-line @next/next/no-img-element -- a fixed local file, already sized */}
          <img src={poster} alt={posterAlt} width={1200} height={800} loading="lazy" decoding="async" className="rd-sim__poster" />
          <span className="rd-sim__rain" aria-hidden="true" />
          {live && <p className="rd-sim__hint">Seret: belok, miring</p>}
        </div>
        <div className="rd-sim__controls" role="group" aria-label="Kendali simulasi">
          <button type="button" className="rd-sim__btn rd-sim__btn--gas" aria-pressed={held.gas} disabled={!live} {...press('gas')}>
            Gas
          </button>
          <button type="button" className="rd-sim__btn rd-sim__btn--brake" aria-pressed={held.brake} disabled={!live} {...press('brake')}>
            Rem
          </button>
          <button type="button" className="rd-sim__btn" aria-pressed={rain} disabled={!live} onClick={toggleRain}>
            Hujan
          </button>
          <button type="button" className="rd-sim__btn" aria-pressed={sensor === 'on'} disabled={!live || sensor === 'denied'} onClick={askSensor}>
            {sensor === 'denied' ? 'Sensor ditolak' : 'Sensor HP'}
          </button>
          <button type="button" className="rd-sim__btn" disabled={!live} onClick={() => rig.current?.reset()}>
            Ulang
          </button>
        </div>
      </div>
      <SimCards s={state} rain={rain} />
    </div>
  );
}
