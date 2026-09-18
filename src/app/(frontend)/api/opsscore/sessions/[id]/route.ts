import type { NextRequest } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import { SESSIONS, findSession, crossSite, json, rateLimited, readJson, upsertLead } from '@/lib/opsscore/api';
import { sanitizeProfile } from '@/lib/opsscore/profile';
import { sanitizeAnswers } from '@/lib/opsscore/scoring';

const isObject = (value: unknown) => Boolean(value) && typeof value === 'object' && !Array.isArray(value);

/**
 * Silent autosave: the quiz sends answers and profile whenever a section closes, and again when the
 * tab is hidden. Answers are locked once the gate is sent.
 */
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const blocked = crossSite(req) ?? rateLimited(req, 'opsscore:save', 120);
  if (blocked) return blocked;

  const { id } = await params;
  const body = await readJson(req);
  // Without an answers or profile object there is nothing to save, and nothing may be wiped.
  if (!body || (!isObject(body.answers) && !isObject(body.profile))) {
    return json({ ok: false, code: 'invalid_body' }, 400);
  }

  try {
    const payload = await getPayload({ config });
    const session = await findSession(payload, id);
    if (!session) return json({ ok: false, code: 'not_found' }, 404);
    if (session.status === 'gated') return json({ ok: false, code: 'locked' }, 409);

    if (isObject(body.answers)) {
      await payload.update({
        collection: SESSIONS,
        id,
        data: { answers: sanitizeAnswers(body.answers) },
        overrideAccess: true,
        depth: 0,
      });
    }
    if (isObject(body.profile)) await upsertLead(payload, id, sanitizeProfile(body.profile));
    return json({ ok: true });
  } catch (err) {
    console.error('[opsscore] save failed', err);
    return json({ ok: false, code: 'server_error' }, 500);
  }
}
