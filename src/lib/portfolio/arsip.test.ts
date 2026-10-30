import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { describe, test } from 'node:test';
import { PORTFOLIO } from './projects';

/**
 * Screens pulled from the site but kept for restoring later. They move to docs/portfolio-arsip/aset
 * because scripts/portfolio-assets may only hold what the site uses (portfolio.test.ts).
 */
const WITHDRAWN = [{ slug: 'rencana-ro', file: 'rencana-ro-rencana-ro.v2.webp', note: 'docs/portfolio-arsip/rencana-ro.md' }];

const used = (slug: string) => {
  const entry = PORTFOLIO.find((p) => p.slug === slug);
  const s = entry?.showcase;
  return [entry?.cover, s?.screen, s?.screenPhone, s?.loopPoster, s?.tourPoster, ...(entry?.features ?? []).map((f) => f.screen)]
    .filter(Boolean)
    .map((a) => a!.file);
};

describe('withdrawn portfolio assets', () => {
  for (const w of WITHDRAWN) {
    test(`${w.file} stays off ${w.slug}, and its file and restore note stay in the repo`, () => {
      assert.ok(!used(w.slug).includes(w.file), 'still referenced in projects.ts');
      assert.ok(existsSync(`docs/portfolio-arsip/aset/${w.file}`), 'the file itself must be kept in the archive');
      assert.ok(existsSync(w.note), 'restore note missing');
    });
  }
});
