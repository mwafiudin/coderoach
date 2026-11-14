'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * Number reveal: counts 0 → target when the element enters the viewport. Only for measured
 * results (DESIGN.md, Motion vocabulary). The final value is what the server renders, so the HTML,
 * no-JS readers and reduced motion all get the real number; the count only rewinds to 0 in the
 * browser, before the first client paint, and only when motion is allowed.
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

  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement | null>(null);
  const animate = useRef(false);

  useLayoutEffect(() => {
    if (!isNumeric || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    animate.current = true;
    setDisplay('0');
  }, [isNumeric]);

  useEffect(() => {
    const el = ref.current;
    if (!animate.current || !el) return;

    let frame = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
          setDisplay(String(Math.round(eased * numeric)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [numeric, duration]);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {display}
    </span>
  );
}
