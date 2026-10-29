'use client';

import { useEffect, useRef, useState } from 'react';

type Props = { src: string; poster: string; posterAlt: string };

/**
 * The Ronin in 3D (ADR 0014). The still render is the page's content: it is what shows without
 * JS, before the model arrives, and if WebGL fails. three.js loads only when the viewer comes near
 * the screen, so it never weighs on the first paint. With reduced motion the model still turns by
 * hand, but neither spins nor leans on its own.
 */
export function RoninViewer({ src, poster, posterAlt }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    const near = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        try {
          const { mountRonin } = await import('./ronin-scene');
          if (cancelled) return;
          const stop = await mountRonin(el, { src, reduce, onReady: () => setLive(true) });
          if (cancelled) stop();
          else cleanup = stop;
        } catch {
          // No WebGL, or the model failed to load: the poster already says everything.
        }
      },
      { rootMargin: '400px 0px' },
    );
    near.observe(el);
    return () => {
      cancelled = true;
      near.disconnect();
      cleanup?.();
    };
  }, [src]);

  return (
    <div ref={host} className="rd-viewer" data-live={live ? 'on' : 'off'}>
      {/* eslint-disable-next-line @next/next/no-img-element -- a fixed local file, already sized */}
      <img src={poster} alt={posterAlt} width={1200} height={800} loading="lazy" decoding="async" className="rd-viewer__poster" />
      {live && <p className="rd-viewer__hint">Seret untuk memutar</p>}
    </div>
  );
}
