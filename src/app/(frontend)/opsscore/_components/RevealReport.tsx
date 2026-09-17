'use client';

import { useEffect } from 'react';

export const JUST_GATED_KEY = 'opsscore.justGated';

/**
 * Two jobs for the report once it mounts:
 * - After the gate, the form is replaced on refresh and cannot scroll by itself; it leaves a flag and
 *   this scrolls the report into view.
 * - The site-wide reveal observer only sees elements present on first load, so the report reveals its
 *   own cards (they arrive later, after the gate).
 */
export function RevealReport({ sessionId }: { sessionId: string }) {
  useEffect(() => {
    const report = document.getElementById('report');
    if (!report) return;

    const targets = report.querySelectorAll<HTMLElement>('.reveal, .reveal-stagger');
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
        report.scrollIntoView({ behavior: 'smooth' });
      }
    } catch {}

    return () => observer.disconnect();
  }, [sessionId]);
  return null;
}
