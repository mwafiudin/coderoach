import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

const ALLOWED_SCOPES = new Set([
  'Build',
  'Automate',
  'Intelligence',
  'Augment',
  'Belum yakin',
  'Other',
]);

// Simple in-memory rate limit: max 5 submissions per IP per 10 minutes.
// Single-tenant fork — no need for Redis.
type RateRecord = { count: number; resetAt: number };
const rateMap = new Map<string, RateRecord>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function checkRate(ip: string): boolean {
  const now = Date.now();
  const rec = rateMap.get(ip);
  if (!rec || now > rec.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (rec.count >= MAX_PER_WINDOW) return false;
  rec.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';

  if (!checkRate(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Terlalu banyak pengiriman. Coba lagi sebentar lagi.' },
      { status: 429 },
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  // Honeypot — if filled, treat as bot but return success silently.
  if (body?.company_url) {
    return NextResponse.json({ ok: true });
  }

  const email = String(body?.email || '').trim();
  const scope = String(body?.scope || '').trim();
  const brief = String(body?.brief || '').trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Email tidak valid.' }, { status: 400 });
  }
  if (brief.length < 10) {
    return NextResponse.json({ ok: false, error: 'Brief terlalu pendek (minimal 10 karakter).' }, { status: 400 });
  }
  if (brief.length > 5000) {
    return NextResponse.json({ ok: false, error: 'Brief terlalu panjang.' }, { status: 400 });
  }
  const finalScope = ALLOWED_SCOPES.has(scope) ? scope : 'Other';

  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: 'submissions',
      data: {
        email,
        scope: finalScope as 'Build' | 'Automate' | 'Intelligence' | 'Augment' | 'Belum yakin' | 'Other',
        brief,
        userAgent: req.headers.get('user-agent') || '',
        referrer: req.headers.get('referer') || '',
        submittedAt: new Date().toISOString(),
        status: 'new',
      },
      overrideAccess: true,
    });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: 'Gagal menyimpan brief. Coba lagi atau email langsung.' },
      { status: 500 },
    );
  }
}
