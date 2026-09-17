import type { NextRequest } from 'next/server';
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload';
import config from '@payload-config';
import { LEADS, SESSIONS, findSession, json, rateLimited, readJson } from '@/lib/opsscore/api';
import { normalizePhone } from '@/lib/opsscore/phone';
import { EMPLOYEE_OPTIONS, INDUSTRY_OPTIONS, REVENUE_OPTIONS, type Option } from '@/lib/opsscore/questions';
import { serviceClass, type Scores } from '@/lib/opsscore/scoring';

type LeadData = RequiredDataFromCollectionSlug<'assessment-leads'>;

const pick = (options: Option[], value: unknown) =>
  typeof value === 'string' && options.some((o) => o.id === value) ? value : null;

const text = (value: unknown) => (typeof value === 'string' ? value.trim().slice(0, 120) : '');

/**
 * Gate: stores the lead, then opens the full report. The service class is recomputed from the stored
 * scores with the employee band, because "phase 1 with more than 20 employees" needs it.
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const limited = rateLimited(req, 'opsscore:gate', 10);
  if (limited) return limited;

  const { id } = await params;
  const body = await readJson(req);
  if (!body) return json({ ok: false, code: 'invalid_body' }, 400);

  // Honeypot — bots fill it; pretend it worked.
  if (body.company_url) return json({ ok: true });

  const lead = {
    name: text(body.name),
    phoneE164: normalizePhone(text(body.phone)),
    brand: text(body.brand),
    industry: pick(INDUSTRY_OPTIONS, body.industry),
    employees: pick(EMPLOYEE_OPTIONS, body.employees),
    revenueBand: pick(REVENUE_OPTIONS, body.revenue),
  };
  const errors: Record<string, string> = {};
  if (!lead.name) errors.name = 'required';
  if (!lead.phoneE164) errors.phone = text(body.phone) ? 'phone' : 'required';
  if (!lead.brand) errors.brand = 'required';
  if (!lead.industry) errors.industry = 'required';
  if (!lead.employees) errors.employees = 'required';
  if (!lead.revenueBand) errors.revenue = 'required';
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
    // A double submit can land here twice; one lead per session is enforced by a unique index too.
    const existing = await payload.count({
      collection: LEADS,
      where: { session: { equals: id } },
      overrideAccess: true,
    });
    if (!existing.totalDocs) {
      await payload.create({
        collection: LEADS,
        data: {
          session: id,
          name: lead.name,
          phoneE164: lead.phoneE164!,
          brand: lead.brand,
          industry: lead.industry as LeadData['industry'],
          employees: lead.employees as LeadData['employees'],
          revenueBand: lead.revenueBand as LeadData['revenueBand'],
          consentAt: now,
          followupStatus: 'new',
        },
        overrideAccess: true,
        depth: 0,
      });
    }

    const scores = session.scores as Scores;
    const cls = serviceClass({ areas: scores.areas, phase: scores.phase, employees: lead.employees! });
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
