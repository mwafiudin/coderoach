'use client';

import { useEffect } from 'react';

export const JUST_GATED_KEY = 'opsscore.justGated';

/**
 * Two jobs for the results once the report mounts:
 * - The gate refreshes the page into the results while the visitor is scrolled down to the form; it
 *   leaves a flag and this brings them back to the top, where the score reveals.
 * - The site-wide reveal observer only sees elements present on first load, so the results reveal their
 *   own rows and cards (they arrive after the gate).
 */
export function RevealReport({ sessionId }: { sessionId: string }) {
  useEffect(() => {
    const report = document.getElementById('report');
    const root = report?.closest('main');
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>('.reveal:not(.in), .reveal-stagger:not(.in)');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    targets.forEach((target) => observer.observe(target));

    try {
      if (sessionStorage.getItem(JUST_GATED_KEY) === sessionId) {
        sessionStorage.removeItem(JUST_GATED_KEY);
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      }
    } catch {}

    return () => observer.disconnect();
  }, [sessionId]);
  return null;
}
