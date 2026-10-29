'use client';

import { useEffect, useRef, useState } from 'react';

/** `base` names the CSS block, so the same loop serves the hero and the transfer scene. */
type Props = { src: string; poster: string; alt: string; base?: string; priority?: boolean };

/**
 * The ride behind the hero. The poster is the picture: it is what paints first, what stays under
 * reduced motion or Save-Data, and what shows without JS. The clip is added only after that, and
 * stops whenever the hero has scrolled away.
 */
export function HeroLoop({ src, poster, alt, base = 'rd-hero', priority = true }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!reduce && !saveData) setPlay(true);
  }, []);

  useEffect(() => {
    const video = box.current?.querySelector('video');
    if (!play || !video) return;
    const seen = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    seen.observe(video);
    return () => seen.disconnect();
  }, [play]);

  return (
    <div ref={box} className={`${base}__media`} data-shown={shown ? 'on' : 'off'}>
      {/* eslint-disable-next-line @next/next/no-img-element -- a fixed local file, already sized */}
      <img src={poster} alt={alt} width={1280} height={720} fetchPriority={priority ? 'high' : 'auto'} loading={priority ? 'eager' : 'lazy'} decoding="async" className={`${base}__poster`} />
      {play && (
        <video
          src={src}
          muted
          loop
          playsInline
          preload={priority ? 'auto' : 'none'}
          aria-hidden="true"
          className={`${base}__video`}
          onPlaying={() => setShown(true)}
        />
      )}
    </div>
  );
}
