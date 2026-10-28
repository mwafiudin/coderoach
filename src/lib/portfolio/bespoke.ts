import type { PortfolioEntry } from './projects';

/**
 * Projects with a page of their own (ADR 0013). The components live in work/_bespoke/registry.ts;
 * the list is here so it can be tested without rendering them.
 */
export const BESPOKE_SLUGS = ['laporta', 'jeda', 'yiheecam'] as const;

export type BespokeSlug = (typeof BESPOKE_SLUGS)[number];

/**
 * Why a project cannot have its own page, or null when it can. A bespoke page adds drawings and
 * scenes the shared template does not have, so it needs a permission that allows new material:
 * a legacy entry may only be reworded (ADR 0009). It also only renders once the story is written.
 */
export function bespokeBlocker(entry: PortfolioEntry | undefined): string | null {
  if (!entry) return 'tidak ada di projects.ts';
  if (entry.hidden) return 'disembunyikan';
  if (entry.consent === 'legacy') return 'izin legacy hanya boleh ditulis ulang, bukan diberi visual baru';
  if (entry.showcase && entry.showcase.consent === 'legacy') return 'tangkapan layar berizin legacy';
  if (!entry.summary?.problem) return 'summary.problem kosong, jadi halaman cerita belum dipakai';
  return null;
}
