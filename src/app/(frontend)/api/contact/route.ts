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

function checkRate(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const rec = rateMap.get(ip);
  if (!rec || now > rec.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSec: 0 };
  }
  if (rec.count >= MAX_PER_WINDOW) {
    return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((rec.resetAt - now) / 1000)) };
  }
  rec.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';

  const rate = checkRate(ip);
  if (!rate.allowed) {
    const minutes = Math.ceil(rate.retryAfterSec / 60);
    return NextResponse.json(
      {
        ok: false,
        code: 'rate_limited',
        error: `Anda sudah mencapai batas ${MAX_PER_WINDOW} pengiriman dalam 10 menit terakhir. Coba lagi dalam ${minutes} menit, atau email langsung agar kami segera proses.`,
        retryAfterSec: rate.retryAfterSec,
      },
      { status: 429, headers: { 'Retry-After': String(rate.retryAfterSec) } },
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
    return NextResponse.json({ ok: false, code: 'invalid_email', error: 'Format email tidak valid. Pastikan menggunakan format email standar (mis. nama@perusahaan.com).' }, { status: 400 });
  }
  if (brief.length < 10) {
    return NextResponse.json({ ok: false, code: 'brief_too_short', error: 'Brief terlalu pendek. Minimal 10 karakter agar kami punya konteks awal yang cukup untuk merespons.' }, { status: 400 });
  }
  if (brief.length > 5000) {
    return NextResponse.json({ ok: false, code: 'brief_too_long', error: 'Brief terlalu panjang. Maksimal 5000 karakter.' }, { status: 400 });
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
      { ok: false, code: 'server_error', error: 'Gagal menyimpan brief. Server sedang bermasalah — coba lagi sebentar lagi atau email langsung agar kami segera proses.' },
      { status: 500 },
    );
  }
}
