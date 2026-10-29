'use client';

import { useEffect, useRef, useState } from 'react';

type Props = { poster: string; posterAlt: string; screen: string; screenAlt: string };

/**
 * Scroll-scrubbed: the Ronin dissolves from its front hub into points that gather into a phone,
 * then the real screenshot fades in where the points settled. Reads the scene's `--p`, so it
 * rests finished (the screenshot) without JS, under reduced motion, and without WebGL.
 */
export function RoninMorph({ poster, posterAlt, screen, screenAlt }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    const near = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        try {
          const { mountMorph } = await import('./morph-scene');
          if (cancelled) return;
          const stop = await mountMorph(el, { onReady: () => setLive(true) });
          if (cancelled) stop();
          else cleanup = stop;
        } catch {
          // Without WebGL the stills below carry the idea.
        }
      },
      { rootMargin: '600px 0px' },
    );
    near.observe(el);
    return () => {
      cancelled = true;
      near.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <div ref={host} className="rd-morph" data-live={live ? 'on' : 'off'}>
      {/* eslint-disable-next-line @next/next/no-img-element -- a fixed local file, already sized */}
      <img src={poster} alt={posterAlt} width={1200} height={800} loading="lazy" decoding="async" className="rd-morph__poster" />
      <div className="rd-morph__phone">
        {/* eslint-disable-next-line @next/next/no-img-element -- the synced screenshot, sized by its frame */}
        <img src={screen} alt={screenAlt} width={780} height={1576} loading="lazy" decoding="async" />
      </div>
    </div>
  );
}
