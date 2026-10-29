/**
 * Files and the lean curve behind RideDeck's own page (ADR 0013, 0014). Kept free of React and
 * three.js so the tests can read them. The files live in public/, outside the Payload sync: they
 * belong to this one page, like the mood photos in public/assets/suasana.
 */
export const RIDEDECK_DIR = '/assets/ridedeck';

export const RIDEDECK_FILES = {
  ronin: 'ronin.v1.glb',
  roninPoster: 'ronin-poster.v2.webp',
  before: 'dasbor-22okt.v1.webp',
  iconSheet: 'konsep-ikon.v1.webp',
  icon: 'ikon.v1.svg',
  heroLoop: 'hero-jalan-loop.v1.mp4',
  heroPoster: 'hero-jalan-loop.v1.poster.webp',
  transferLoop: 'transfer-loop.v1.mp4',
  transferPoster: 'transfer-loop.v1.poster.webp',
} as const;

/**
 * Budget in KB per file type. Loop and poster follow ADR 0006 like the rest of the portfolio; the
 * model loads late but on a phone connection, so it stays small too.
 */
export function ridedeckBudget(file: string): number {
  if (file.endsWith('.glb')) return 512;
  if (file.endsWith('.svg')) return 10;
  if (/-loop\.v\d+\.mp4$/.test(file)) return 600;
  if (file.includes('.poster.')) return 150;
  return 300;
}

/** Widest the illustration leans, either side. The app's dial reads past this; the page keeps it calm. */
export const MAX_LEAN = (32 * Math.PI) / 180;

/**
 * Lean in radians for a scroll position: upright at both ends of the scene, left through the first
 * half, right through the second. Scroll stands in for a ride here; it is not ride data.
 */
export function leanAt(p: number): number {
  if (!Number.isFinite(p)) return 0;
  const q = Math.min(1, Math.max(0, p));
  return Math.sin(q * Math.PI * 2) * MAX_LEAN;
}
