'use client';

import { useEffect, useRef } from 'react';

/**
 * Animated dotted-surface background, scoped to the Studio section.
 * Pure Canvas 2D — no three.js — to keep bundle small.
 *
 * Effect: a perspective-projected grid of dots animated by two sine waves
 * (one along X, one along Y). Dots tinted with electric blue near wave peaks,
 * mist-grey baseline. Pauses when off-screen and respects reduce-motion.
 *
 * Sized to its parent (parent must be `relative`; mount as first child).
 */
export function StudioWaveBg({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const AMOUNT_X = 38;
    const AMOUNT_Y = 28;
    const SEPARATION = 38; // base world spacing in px

    let width = 0;
    let height = 0;
    let count = 0;
    let raf = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const horizon = height * 0.5;
      const tilt = 0.56; // y-axis compression for perspective

      const totalW = (AMOUNT_X - 1) * SEPARATION;
      const totalH = (AMOUNT_Y - 1) * SEPARATION;

      // Render back-to-front so closer dots overlap farther ones
      for (let iy = AMOUNT_Y - 1; iy >= 0; iy--) {
        const depth = iy / (AMOUNT_Y - 1); // 0 = front, 1 = back
        const scale = 1 - depth * 0.7;

        for (let ix = 0; ix < AMOUNT_X; ix++) {
          const wx = ix * SEPARATION - totalW / 2;
          const wy = iy * SEPARATION - totalH / 2;

          // Two sine waves combined for organic motion
          const waveY =
            Math.sin((ix + count) * 0.3) * 14 + Math.sin((iy + count) * 0.5) * 14;

          const sx = centerX + wx * scale;
          const sy = horizon + wy * tilt * scale - waveY * scale * 0.65;

          // Off-screen culling
          if (sx < -8 || sx > width + 8 || sy < -8 || sy > height + 8) continue;

          // Wave-crest intensity 0..1
          const intensity = (waveY + 28) / 56;

          const size = Math.max(0.8, scale * 1.7);
          const baseAlpha = 0.14 + scale * 0.40 + intensity * 0.18;

          // Electric tint when intensity is in the upper third
          const electricMix = Math.max(0, intensity - 0.62) * 2.6;
          if (electricMix > 0.05) {
            // electric (#2C70FE) blended on top of mist
            ctx.fillStyle = `rgba(44, 112, 254, ${Math.min(0.85, baseAlpha + electricMix * 0.25)})`;
          } else {
            // mist-400 (#C4C0C5)
            ctx.fillStyle = `rgba(196, 192, 197, ${baseAlpha})`;
          }

          ctx.beginPath();
          ctx.arc(sx, sy, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const tick = () => {
      if (visible && !reduceMotion) {
        count += 0.05;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    resize();
    draw();

    if (reduceMotion) {
      // Static frame only — no rAF loop
    } else {
      tick();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        // Anchor wave to top of section, gradually fade out toward bottom
        maskImage: 'linear-gradient(to bottom, black 0%, black 28%, transparent 86%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 28%, transparent 86%)',
      }}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
