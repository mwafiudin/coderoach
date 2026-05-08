'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Animates count-up from 0 → target when element enters viewport.
 * Falls back to static value if not numeric or if reduced-motion preferred.
 */
export function AnimatedCount({
  value,
  duration = 1400,
  className = '',
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  // Parse leading number from value like "11", "4", "40", "JKT"
  const numeric = parseInt(value, 10);
  const isNumeric = !Number.isNaN(numeric);

  const [display, setDisplay] = useState(isNumeric ? '0' : value);
  const ref = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isNumeric || !ref.current) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(String(numeric));
      return;
    }

    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
              const current = Math.round(eased * numeric);
              setDisplay(String(current));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isNumeric, numeric, duration]);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {display}
    </span>
  );
}
