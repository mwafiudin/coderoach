/**
 * Where similar businesses stand, for the results page. Every industry starts from a Coderoach estimate
 * built from public data (docs/opsscore-brief.md, "Benchmark"); once an industry has enough finished
 * OpsScore sessions of its own, their averages replace the estimate. The page labels which one it shows.
 */
import { AREAS } from './questions';
import type { AreaScores } from './scoring';

export type IndustryId = 'produksi' | 'distribusi' | 'jasa' | 'retail' | 'kuliner' | 'fashion' | 'kriya' | 'lainnya';

export type Benchmark = {
  industry: IndustryId;
  /** `estimate` until the industry has BENCHMARK_MIN_SESSIONS finished sessions. */
  source: 'estimate' | 'sessions';
  total: number;
  areas: AreaScores;
  /** Sessions behind a `sessions` benchmark; 0 for an estimate. */
  count: number;
};

export const BENCHMARK_MIN_SESSIONS = 30;

const INDUSTRIES: IndustryId[] = ['produksi', 'distribusi', 'jasa', 'retail', 'kuliner', 'fashion', 'kriya', 'lainnya'];

export const isIndustry = (value: unknown): value is IndustryId =>
  typeof value === 'string' && (INDUSTRIES as string[]).includes(value);

/**
 * Estimated averages for micro and small businesses: a typical answer profile per question, scored with
 * the OpsScore formula, then sales, operations, online presence, and AI scaled by each industry's
 * internet use (BPS 2024). Stock has no estimate, because no public data covers how UMKM record stock.
 */
const ESTIMATES: Record<IndustryId, { total: number; areas: AreaScores }> = {
  produksi: { total: 34, areas: { sales: 28, ops: 31, finance: 37, people: 30, owner: 34, web: 27, ai: 37 } },
  distribusi: { total: 34, areas: { sales: 28, ops: 31, finance: 37, people: 30, owner: 34, web: 27, ai: 37 } },
  jasa: { total: 32, areas: { sales: 26, ops: 28, finance: 37, people: 30, owner: 34, web: 25, ai: 34 } },
  retail: { total: 34, areas: { sales: 28, ops: 31, finance: 37, people: 30, owner: 34, web: 27, ai: 37 } },
  kuliner: { total: 35, areas: { sales: 31, ops: 34, finance: 37, people: 30, owner: 34, web: 29, ai: 41 } },
  fashion: { total: 36, areas: { sales: 35, ops: 38, finance: 37, people: 30, owner: 34, web: 33, ai: 46 } },
  kriya: { total: 32, areas: { sales: 25, ops: 28, finance: 37, people: 30, owner: 34, web: 24, ai: 34 } },
  lainnya: { total: 34, areas: { sales: 28, ops: 31, finance: 37, people: 30, owner: 34, web: 27, ai: 37 } },
};

/** The estimate for an industry; unknown or missing industries use the national one (`lainnya`). */
export function estimateFor(industry: unknown): Benchmark {
  const id = isIndustry(industry) ? industry : 'lainnya';
  return { industry: id, source: 'estimate', count: 0, total: ESTIMATES[id].total, areas: { ...ESTIMATES[id].areas } };
}

/**
 * Averages of finished sessions in one industry, or null below the minimum. Each area averages only the
 * sessions that scored it, so stock comes from businesses that hold stock.
 */
export function averageOf(industry: IndustryId, results: Array<{ total: number; areas: AreaScores }>): Benchmark | null {
  if (results.length < BENCHMARK_MIN_SESSIONS) return null;
  const mean = (values: number[]) => Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  const areas: AreaScores = {};
  for (const { id } of AREAS) {
    const values = results.map((result) => result.areas[id]).filter((value): value is number => typeof value === 'number');
    if (values.length) areas[id] = mean(values);
  }
  return { industry, source: 'sessions', count: results.length, total: mean(results.map((result) => result.total)), areas };
}

/** Points above (positive) or below (negative) the benchmark; within two points reads as level. */
export const gapTo = (total: number, benchmark: Benchmark) => {
  const gap = total - benchmark.total;
  return Math.abs(gap) <= 2 ? 0 : gap;
};
