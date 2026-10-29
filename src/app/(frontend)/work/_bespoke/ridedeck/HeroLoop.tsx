'use client';

import { useEffect, useRef, useState } from 'react';

type Props = { src: string; poster: string; alt: string };

/**
 * The ride behind the hero. The poster is the picture: it is what paints first, what stays under
 * reduced motion or Save-Data, and what shows without JS. The clip is added only after that, and
 * stops whenever the hero has scrolled away.
 */
export function HeroLoop({ src, poster, alt }: Props) {
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
    <div ref={box} className="rd-hero__media" data-shown={shown ? 'on' : 'off'}>
      {/* eslint-disable-next-line @next/next/no-img-element -- a fixed local file, already sized */}
      <img src={poster} alt={alt} width={1280} height={720} fetchPriority="high" decoding="async" className="rd-hero__poster" />
      {play && (
        <video
          src={src}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="rd-hero__video"
          onPlaying={() => setShown(true)}
        />
      )}
    </div>
  );
}
