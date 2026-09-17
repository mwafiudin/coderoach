/**
 * Server-only: the benchmark for a results page, from finished sessions when an industry has enough of
 * them, otherwise the estimate.
 */
import { unstable_cache } from 'next/cache';
import type { Payload } from 'payload';
import { LEADS, SESSIONS } from './api';
import { BENCHMARK_MIN_SESSIONS, averageOf, estimateFor, isIndustry, type Benchmark, type IndustryId } from './benchmark';
import { INSTRUMENT_VERSION } from './config';
import type { Scores } from './scoring';

async function finishedResults(payload: Payload, industry: IndustryId) {
  const leads = await payload.find({
    collection: LEADS,
    where: {
      and: [
        { industry: { equals: industry } },
        // Test and internal sessions are ticked out in the admin.
        { or: [{ excludeFromBenchmark: { equals: false } }, { excludeFromBenchmark: { exists: false } }] },
      ],
    },
    select: { session: true },
    pagination: false,
    depth: 0,
    overrideAccess: true,
  });
  const ids = leads.docs.flatMap((lead) => (typeof lead.session === 'string' ? [lead.session] : []));
  if (ids.length < BENCHMARK_MIN_SESSIONS) return [];

  const sessions = await payload.find({
    collection: SESSIONS,
    where: {
      and: [
        { id: { in: ids } },
        { status: { in: ['completed', 'gated'] } },
        { instrumentVersion: { equals: INSTRUMENT_VERSION } },
      ],
    },
    select: { scores: true },
    pagination: false,
    depth: 0,
    overrideAccess: true,
  });
  return sessions.docs.flatMap((session) => (session.scores ? [session.scores as Scores] : []));
}

export async function benchmarkFor(payload: Payload, industry: unknown): Promise<Benchmark> {
  const id = isIndustry(industry) ? industry : 'lainnya';
  try {
    // An hour is fresh enough for averages; every results page would otherwise scan the leads.
    const fromSessions = unstable_cache(
      async () => averageOf(id, await finishedResults(payload, id)),
      ['opsscore-benchmark', id, String(INSTRUMENT_VERSION)],
      { revalidate: 3600 },
    );
    return (await fromSessions()) ?? estimateFor(id);
  } catch (err) {
    console.error('[opsscore] benchmark failed', err);
    return estimateFor(id);
  }
}
