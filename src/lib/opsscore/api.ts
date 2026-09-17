/**
 * Server-only helpers for the /api/opsscore route handlers.
 */
import { randomBytes } from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';
import type { Payload } from 'payload';

export const SESSIONS = 'assessment-sessions' as const;
export const LEADS = 'assessment-leads' as const;

export const json = (body: Record<string, unknown>, status = 200, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers });

export const clientIp = (req: NextRequest) =>
  req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';

// In-memory, per server instance — same trade-off as /api/contact. Keyed per route.
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimited(req: NextRequest, route: string, max: number, windowMs = 10 * 60 * 1000) {
  const key = `${route}:${clientIp(req)}`;
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }
  if (bucket.count >= max) {
    const retryAfterSec = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
    return json({ ok: false, code: 'rate_limited' }, 429, { 'Retry-After': String(retryAfterSec) });
  }
  bucket.count += 1;
  return null;
}

const MAX_BODY_BYTES = 32 * 1024;

/** Parses a small JSON object body. Returns null for empty, oversized, or malformed bodies. */
export async function readJson(req: NextRequest): Promise<Record<string, unknown> | null> {
  if (Number(req.headers.get('content-length') || 0) > MAX_BODY_BYTES) return null;
  try {
    const text = await req.text();
    if (!text || text.length > MAX_BODY_BYTES) return null;
    const body = JSON.parse(text);
    return body && typeof body === 'object' && !Array.isArray(body) ? body : null;
  } catch {
    return null;
  }
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const isSessionId = (id: string) => UUID.test(id);

// 32 characters without the 0/o and 1/l lookalikes, so a random byte masked to 5 bits stays uniform.
const SLUG_ALPHABET = 'abcdefghijkmnpqrstuvwxyz23456789';

export function newShareSlug(length = 8) {
  return Array.from(randomBytes(length), (b) => SLUG_ALPHABET[b & 31]).join('');
}

export async function findSession(payload: Payload, id: string) {
  if (!isSessionId(id)) return null;
  return payload.findByID({
    collection: SESSIONS,
    id,
    depth: 0,
    overrideAccess: true,
    disableErrors: true,
  });
}

export const truncate = (value: string | null | undefined, max = 500) => (value || '').slice(0, max);
