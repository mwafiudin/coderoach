/**
 * Height for one logo in the client marquee.
 *
 * Equal heights make wide wordmarks shout and square marks vanish. Sizing by area instead
 * (height = sqrt(area / aspect)) gives every logo about the same visual weight, then a clamp keeps
 * tall marks from towering over the row. Canonical, "Taming unruly logo sections" (2021); Sanity,
 * "The logo soup problem" (2026), whose scale factor 0.5 is this square root.
 */
export const LOGO_AREA = 4600;
export const LOGO_MIN_HEIGHT = 24;
export const LOGO_MAX_HEIGHT = 52;

export function logoHeight(width?: number | null, height?: number | null): number {
  if (!width || !height || width <= 0 || height <= 0) return 36;
  const h = Math.sqrt(LOGO_AREA / (width / height));
  return Math.round(Math.min(LOGO_MAX_HEIGHT, Math.max(LOGO_MIN_HEIGHT, h)));
}
