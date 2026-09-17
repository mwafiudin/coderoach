import type { NextRequest } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import { SESSIONS, findSession, json, rateLimited, readJson, upsertLead } from '@/lib/opsscore/api';
import { normalizePhone } from '@/lib/opsscore/phone';
import { sanitizeProfile } from '@/lib/opsscore/profile';
import { serviceClass, type Scores } from '@/lib/opsscore/scoring';

/**
 * Gate: the profile is already saved during the quiz, so this only needs WhatsApp and consent.
 * Any profile fields in the body are a fallback for saves that never reached the server.
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const limited = rateLimited(req, 'opsscore:gate', 10);
  if (limited) return limited;

  const { id } = await params;
  const body = await readJson(req);
  if (!body) return json({ ok: false, code: 'invalid_body' }, 400);

  // Honeypot — bots fill it; pretend it worked.
  if (body.company_url) return json({ ok: true });

  const rawPhone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const phoneE164 = normalizePhone(rawPhone);
  const errors: Record<string, string> = {};
  if (!phoneE164) errors.phone = rawPhone ? 'phone' : 'required';
  if (body.consent !== true) errors.consent = 'consent';
  if (Object.keys(errors).length) return json({ ok: false, code: 'invalid', errors }, 400);

  try {
    const payload = await getPayload({ config });
    const session = await findSession(payload, id);
    if (!session) return json({ ok: false, code: 'not_found' }, 404);
    if (session.status === 'gated') return json({ ok: true });
    if (session.status !== 'completed' || !session.scores) {
      return json({ ok: false, code: 'not_completed' }, 409);
    }

    const now = new Date().toISOString();
    const lead = await upsertLead(payload, id, sanitizeProfile(body.profile), { phoneE164: phoneE164!, consentAt: now });

    // Normally already final at completion; recomputed in case team size only arrived with this request.
    const scores = session.scores as Scores;
    const cls = serviceClass({ areas: scores.areas, phase: scores.phase, employees: lead?.employees ?? undefined });
    await payload.update({
      collection: SESSIONS,
      id,
      data: {
        scores: { ...scores, serviceClass: cls, cta: cls === 'READY' ? 'automation' : 'brief' },
        status: 'gated',
        gatedAt: now,
      },
      overrideAccess: true,
      depth: 0,
    });
    return json({ ok: true });
  } catch (err) {
    console.error('[opsscore] gate failed', err);
    return json({ ok: false, code: 'server_error' }, 500);
  }
}
