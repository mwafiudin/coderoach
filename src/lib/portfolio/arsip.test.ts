import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { describe, test } from 'node:test';
import { ARSIP_LEGACY } from './arsip-legacy';
import { LEGACY_ENTRIES, numericTokens } from './legacy-baseline';
import { PORTFOLIO } from './projects';

/**
 * Screens pulled from the site. The files are kept outside this public repo (the note says where),
 * so only the restore note is checked here.
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
    test(`${w.file} stays off ${w.slug}, and its restore note stays in the repo`, () => {
      assert.ok(!used(w.slug).includes(w.file), 'still referenced in projects.ts');
      assert.ok(!existsSync(`docs/portfolio-arsip/aset/${w.file}`) && !existsSync(`scripts/portfolio-assets/${w.file}`), 'the file must stay out of this public repo');
      assert.ok(existsSync(w.note), 'restore note missing');
    });
  }
});

describe('archived legacy copy', () => {
  for (const slug of ['rpn-os', 'uruzin']) {
    const old = ARSIP_LEGACY.find((e) => e.slug === slug);
    const now = PORTFOLIO.find((e) => e.slug === slug);

    test(`${slug}: the old copy is archived whole, ready to swap back`, () => {
      assert.ok(old && now, 'missing from the archive or from projects.ts');
      // Same identity, permission, and images: restoring is a pure copy swap.
      assert.equal(old.consent, 'legacy');
      assert.equal(now.consent, old.consent);
      assert.equal(now.cover?.file, old.cover?.file);
      assert.ok(old.summary?.problem && old.body.length > 0, 'archived copy is incomplete');
    });

    test(`${slug}: the archived copy still passes the legacy rules`, () => {
      // The words only: `{ h2: … }` keys would read as the number 2.
      const body = old!.body.map((b) => (typeof b === 'string' ? b : 'h2' in b ? b.h2 : ''));
      const text = [old!.tagline, old!.excerpt, ...Object.values(old!.summary ?? {}), ...body].join(' ');
      const added = numericTokens(text).filter((n) => !LEGACY_ENTRIES[slug].numbers.includes(n));
      assert.deepEqual(added, []);
      assert.ok(LEGACY_ENTRIES[slug].files.includes(old!.cover!.file));
    });
  }
});
