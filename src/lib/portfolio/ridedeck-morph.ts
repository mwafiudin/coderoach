/**
 * The shape and timing of the bike-to-phone morph, kept pure so the tests can read them. Scroll
 * progress runs 0..1 across the pinned scene; the mesh gives way to points, the points travel to a
 * phone silhouette, and the real screenshot takes over at the end.
 */

/** Phone silhouette in metres, portrait, drawn in the plane facing the camera. */
export const PHONE = { width: 0.62, height: 1.3, radius: 0.09, edge: 0.025 };

export type Phases = { mesh: number; dots: number; travel: number; shot: number };

/** mesh: body opacity; dots: point opacity; travel: 0..1 of the particle journey; shot: screenshot opacity. */
export function morphPhases(p: number): Phases {
  const q = Number.isFinite(p) ? Math.min(1, Math.max(0, p)) : 0;
  return {
    mesh: 1 - smoothstep((q - 0.12) / 0.18),
    dots: smoothstep((q - 0.1) / 0.1) * (1 - smoothstep((q - 0.84) / 0.14)),
    travel: smoothstep((q - 0.14) / 0.6),
    shot: smoothstep((q - 0.74) / 0.18),
  };
}

export function smoothstep(x: number): number {
  const t = Math.min(1, Math.max(0, Number.isFinite(x) ? x : 0));
  return t * t * (3 - 2 * t);
}

/**
 * Where the k-th point lands on the phone: `u` picks the feature (the first 62% trace the outer
 * edge, the rest the three card outlines), `a` walks along it, `b` jitters across the stroke.
 * Returns x right, y up from the phone's bottom edge, z toward the viewer.
 */
export function phonePoint(u: number, a: number, b: number): { x: number; y: number; z: number } {
  const { width: w, height: h, radius: r, edge } = PHONE;
  const jitter = (b - 0.5) * edge;
  if (u < 0.62) {
    const pt = roundedRect(a, w, h, r);
    return { x: pt.x + pt.nx * jitter, y: pt.y + pt.ny * jitter, z: 0 };
  }
  // Three cards inside, each a smaller rounded rect, stacked like the dashboard.
  const card = Math.min(2, Math.floor(((u - 0.62) / 0.38) * 3));
  const cw = w - 0.14;
  const ch = (h - 0.3) / 3 - 0.06;
  const cy = 0.15 + card * (ch + 0.06);
  const pt = roundedRect(a, cw, ch, 0.05);
  return { x: pt.x + pt.nx * jitter, y: cy + pt.y + pt.ny * jitter, z: 0.01 };
}

/** A point `a` (0..1) along the perimeter of a w×h rounded rect centred horizontally, bottom at y = 0, with its outward normal. */
export function roundedRect(a: number, w: number, h: number, r: number): { x: number; y: number; nx: number; ny: number } {
  const sw = w - 2 * r;
  const sh = h - 2 * r;
  const arc = (Math.PI / 2) * r;
  const per = 2 * sw + 2 * sh + 4 * arc;
  let d = ((a % 1) + 1) % 1 * per;
  // bottom edge, left to right
  if (d < sw) return { x: -sw / 2 + d, y: 0, nx: 0, ny: -1 };
  d -= sw;
  if (d < arc) return corner(sw / 2, r, -Math.PI / 2, d / r);
  d -= arc;
  if (d < sh) return { x: w / 2, y: r + d, nx: 1, ny: 0 };
  d -= sh;
  if (d < arc) return corner(sw / 2, r + sh, 0, d / r);
  d -= arc;
  if (d < sw) return { x: sw / 2 - d, y: h, nx: 0, ny: 1 };
  d -= sw;
  if (d < arc) return corner(-sw / 2, r + sh, Math.PI / 2, d / r);
  d -= arc;
  if (d < sh) return { x: -w / 2, y: r + sh - d, nx: -1, ny: 0 };
  d -= sh;
  return corner(-sw / 2, r, Math.PI, d / r);

  function corner(cx: number, cy: number, from: number, t: number) {
    const ang = from + t;
    return { x: cx + Math.cos(ang) * r, y: cy + Math.sin(ang) * r, nx: Math.cos(ang), ny: Math.sin(ang) };
  }
}
