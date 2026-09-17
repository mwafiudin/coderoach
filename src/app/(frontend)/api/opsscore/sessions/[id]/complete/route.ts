import type { NextRequest } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import { SESSIONS, findSession, json, rateLimited, readJson, upsertLead } from '@/lib/opsscore/api';
import { sanitizeProfile } from '@/lib/opsscore/profile';
import { missingAnswers, sanitizeAnswers, scoreAnswers } from '@/lib/opsscore/scoring';

/**
 * Scores a finished quiz on the server. Takes the final answers and profile in the body so the last
 * section does not depend on a separate save. Team size is known by now, so the service class is final.
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

    const lead = await upsertLead(payload, id, sanitizeProfile(body.profile));
    const scores = scoreAnswers(answers, { employees: lead?.employees ?? undefined });
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
