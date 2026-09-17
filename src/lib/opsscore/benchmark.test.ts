import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { BENCHMARK_MIN_SESSIONS, averageOf, estimateFor, gapTo } from './benchmark';
import { INDUSTRY_FACTS, SECTION_FACTS } from './copy';
import { SECTIONS } from './flow';
import { INDUSTRY_OPTIONS } from './questions';

describe('benchmark', () => {
  test('every industry option has an estimate and a fact; unknown industries fall back to the national one', () => {
    for (const { id } of INDUSTRY_OPTIONS) {
      const estimate = estimateFor(id);
      assert.equal(estimate.industry, id);
      assert.equal(estimate.source, 'estimate');
      assert.ok(estimate.total > 0 && estimate.total < 100);
      assert.ok(INDUSTRY_FACTS[estimate.industry]);
    }
    assert.equal(estimateFor(undefined).industry, 'lainnya');
    assert.equal(estimateFor('warung').industry, 'lainnya');
  });

  test('estimates never mark stock, which has no public data', () => {
    for (const { id } of INDUSTRY_OPTIONS) assert.equal(estimateFor(id).areas.stock, undefined);
  });

  test('finished sessions replace the estimate only from the minimum count', () => {
    const results = (count: number) =>
      Array.from({ length: count }, (_, i) => ({
        total: 40 + (i % 3),
        areas: i % 2 ? { sales: 50, stock: 20 } : { sales: 30 },
      }));
    assert.equal(averageOf('retail', results(BENCHMARK_MIN_SESSIONS - 1)), null);
    const benchmark = averageOf('retail', results(BENCHMARK_MIN_SESSIONS));
    assert.equal(benchmark?.source, 'sessions');
    assert.equal(benchmark?.count, BENCHMARK_MIN_SESSIONS);
    assert.equal(benchmark?.total, 41);
    assert.equal(benchmark?.areas.sales, 40);
    // Stock averages only the sessions that scored it.
    assert.equal(benchmark?.areas.stock, 20);
  });

  test('a gap within two points reads as level', () => {
    const estimate = estimateFor('fashion');
    assert.equal(gapTo(estimate.total + 2, estimate), 0);
    assert.equal(gapTo(estimate.total - 2, estimate), 0);
    assert.equal(gapTo(estimate.total + 9, estimate), 9);
    assert.equal(gapTo(estimate.total - 9, estimate), -9);
  });

  test('every scored section has a quick fact for its score card', () => {
    for (const section of SECTIONS.filter((s) => s.areas.length)) {
      assert.ok(SECTION_FACTS[section.id]?.text, section.id);
      assert.ok(SECTION_FACTS[section.id]?.source, section.id);
    }
  });
});
