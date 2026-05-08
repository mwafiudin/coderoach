'use client';

import { useEffect, useState } from 'react';

/**
 * Thin electric progress bar fixed at top, fills as user reads down article body.
 * Tracks scroll progress over the article element by `targetSelector`.
 */
export function ReadingProgress({ targetSelector = 'article' }: { targetSelector?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number | null = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const target = document.querySelector(targetSelector) as HTMLElement | null;
        if (!target) {
          raf = null;
          return;
        }
        const rect = target.getBoundingClientRect();
        const start = window.scrollY + rect.top;
        const total = rect.height;
        const passed = Math.max(0, window.scrollY - start + window.innerHeight * 0.5);
        const p = Math.max(0, Math.min(1, passed / total));
        setProgress(p);
        raf = null;
      });
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  }, [targetSelector]);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-20 h-[2px] bg-paper-200/50 pointer-events-none"
    >
      <div
        className="h-full bg-electric origin-left transition-transform duration-100 ease-linear"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
