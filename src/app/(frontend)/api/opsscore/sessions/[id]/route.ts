import type { NextRequest } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import { SESSIONS, findSession, json, rateLimited, readJson } from '@/lib/opsscore/api';
import { sanitizeAnswers } from '@/lib/opsscore/scoring';

/** Saves the quiz answers so far (the client syncs after each area). Locked once the gate is sent. */
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const limited = rateLimited(req, 'opsscore:save', 120);
  if (limited) return limited;

  const { id } = await params;
  const body = await readJson(req);
  // Without an answers object this would wipe what was saved.
  if (!body?.answers || typeof body.answers !== 'object') {
    return json({ ok: false, code: 'invalid_body' }, 400);
  }

  try {
    const payload = await getPayload({ config });
    const session = await findSession(payload, id);
    if (!session) return json({ ok: false, code: 'not_found' }, 404);
    if (session.status === 'gated') return json({ ok: false, code: 'locked' }, 409);

    await payload.update({
      collection: SESSIONS,
      id,
      data: { answers: sanitizeAnswers(body.answers) },
      overrideAccess: true,
      depth: 0,
    });
    return json({ ok: true });
  } catch (err) {
    console.error('[opsscore] save answers failed', err);
    return json({ ok: false, code: 'server_error' }, 500);
  }
}
