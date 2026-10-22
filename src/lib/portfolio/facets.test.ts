import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { facetCounts, matches } from './facets';

const projects = [
  { pillar: 'erp', industry: 'finance' },
  { pillar: 'erp', industry: 'fb' },
  { pillar: 'otomasi', industry: 'media' },
  { pillar: 'otomasi', industry: 'fb' },
];

describe('facetCounts', () => {
  test('without filters, every chip counts the whole catalog', () => {
    const c = facetCounts(projects, { pilar: '', bidang: '' });
    assert.deepEqual([...c.pillar], [['erp', 2], ['otomasi', 2]]);
    assert.deepEqual([...c.industry], [['finance', 1], ['fb', 2], ['media', 1]]);
    assert.equal(c.allPillars, 4);
  });

  test('industry chips count only within the chosen service', () => {
    // The reported bug: "finance 1" showed under Otomasi, and clicking it gave an empty list.
    const c = facetCounts(projects, { pilar: 'otomasi', bidang: '' });
    assert.equal(c.industry.get('finance'), 0);
    assert.equal(c.industry.get('fb'), 1);
    assert.equal(c.allIndustries, 2);
  });

  test('service chips count only within the chosen industry, and the active chip is not counted against itself', () => {
    const c = facetCounts(projects, { pilar: 'erp', bidang: 'finance' });
    assert.equal(c.pillar.get('erp'), 1);
    assert.equal(c.pillar.get('otomasi'), 0);
    assert.equal(c.allPillars, 1);
    assert.equal(c.industry.get('fb'), 1);
  });

  test('every count is exactly what clicking the chip returns', () => {
    for (const f of [{ pilar: '', bidang: '' }, { pilar: 'otomasi', bidang: '' }, { pilar: 'erp', bidang: 'fb' }]) {
      const c = facetCounts(projects, f);
      for (const [pilar, n] of c.pillar) assert.equal(n, projects.filter((p) => matches(p, { ...f, pilar })).length);
      for (const [bidang, n] of c.industry) assert.equal(n, projects.filter((p) => matches(p, { ...f, bidang })).length);
    }
  });
});
