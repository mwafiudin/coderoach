import { randomUUID } from 'node:crypto';
import type { NextRequest } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import {
  SESSIONS,
  crossSite,
  json,
  newShareSlug,
  rateLimited,
  readJson,
  truncate,
} from '@/lib/opsscore/api';
import {
  ATTRIBUTION_COOKIE,
  parseAttributionCookie,
  sanitizeAttribution,
} from '@/lib/opsscore/attribution';
import { INSTRUMENT_VERSION } from '@/lib/opsscore/config';

/** Starts a session. The client keeps only the returned id. */
export async function POST(req: NextRequest) {
  const blocked = crossSite(req) ?? rateLimited(req, 'opsscore:create', 10);
  if (blocked) return blocked;

  // The landing-page cookie wins; the body is the fallback when cookies are blocked.
  const body = (await readJson(req)) ?? {};
  const cookie = parseAttributionCookie(req.cookies.get(ATTRIBUTION_COOKIE)?.value);
  const { referrer, ...utm } = Object.keys(cookie).length ? cookie : sanitizeAttribution(body.attribution);

  try {
    const payload = await getPayload({ config });
    const session = await payload.create({
      collection: SESSIONS,
      data: {
        id: randomUUID(),
        shareSlug: newShareSlug(),
        instrumentVersion: INSTRUMENT_VERSION,
        status: 'started',
        answers: {},
        utm,
        referrer: truncate(referrer),
        userAgent: truncate(req.headers.get('user-agent')),
        startedAt: new Date().toISOString(),
      },
      overrideAccess: true,
      depth: 0,
    });
    return json({ ok: true, id: session.id }, 201);
  } catch (err) {
    console.error('[opsscore] create session failed', err);
    return json({ ok: false, code: 'server_error' }, 500);
  }
}
