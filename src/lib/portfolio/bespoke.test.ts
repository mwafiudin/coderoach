import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { BESPOKE_SLUGS, bespokeBlocker } from './bespoke';
import { PORTFOLIO, type PortfolioEntry } from './projects';

const studio = PORTFOLIO.find((p) => p.slug === 'laporta') as PortfolioEntry;

describe('bespoke project pages', () => {
  test('every bespoke slug is a shown project whose permission allows new material', () => {
    for (const slug of BESPOKE_SLUGS) {
      assert.equal(bespokeBlocker(PORTFOLIO.find((p) => p.slug === slug)), null, slug);
    }
  });

  test('a legacy client entry is refused, even with its story written', () => {
    assert.match(bespokeBlocker({ ...studio, consent: 'legacy' }) ?? '', /legacy/);
  });

  test('legacy screenshots are refused even when the entry itself is studio', () => {
    const showcase = { ...studio.showcase, frame: 'laptop' as const, consent: 'legacy' as const };
    assert.match(bespokeBlocker({ ...studio, showcase }) ?? '', /legacy/);
  });

  test('a page without its story, a hidden entry, and an unknown slug are refused', () => {
    assert.match(bespokeBlocker({ ...studio, summary: undefined }) ?? '', /summary/);
    assert.match(bespokeBlocker({ ...studio, hidden: true }) ?? '', /sembunyi/);
    assert.match(bespokeBlocker(undefined) ?? '', /tidak ada/);
  });
});
