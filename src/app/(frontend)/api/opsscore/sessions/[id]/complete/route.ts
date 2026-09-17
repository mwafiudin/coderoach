import type { NextRequest } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import { SESSIONS, findSession, json, rateLimited, readJson } from '@/lib/opsscore/api';
import { missingAnswers, sanitizeAnswers, scoreAnswers } from '@/lib/opsscore/scoring';

/**
 * Scores a finished quiz on the server. Accepts the final answers in the body so the last area does
 * not depend on a separate save. Gated sessions keep their result.
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const limited = rateLimited(req, 'opsscore:complete', 30);
  if (limited) return limited;

  const { id } = await params;
  const body = (await readJson(req)) ?? {};

  try {
    const payload = await getPayload({ config });
    const session = await findSession(payload, id);
    if (!session) return json({ ok: false, code: 'not_found' }, 404);
    if (session.status === 'gated') {
      return json({ ok: true, phase: session.phase, total: session.total });
    }

    const answers = sanitizeAnswers(body.answers ?? session.answers);
    const missing = missingAnswers(answers);
    if (missing.length) return json({ ok: false, code: 'incomplete', missing }, 422);

    const scores = scoreAnswers(answers);
    await payload.update({
      collection: SESSIONS,
      id,
      data: {
        answers,
        scores,
        phase: scores.phase,
        total: scores.total,
        status: 'completed',
        completedAt: session.completedAt ?? new Date().toISOString(),
      },
      overrideAccess: true,
      depth: 0,
    });
    return json({ ok: true, phase: scores.phase, total: scores.total });
  } catch (err) {
    console.error('[opsscore] complete session failed', err);
    return json({ ok: false, code: 'server_error' }, 500);
  }
}
