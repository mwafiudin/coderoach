/**
 * Preview route — enables Next.js draftMode for editors who are logged into Payload admin.
 *
 *   GET /api/preview?collection=posts&slug=my-post
 *
 * Validates that the requester has a valid Payload admin session, then enables
 * draftMode and redirects to the public URL. The public detail page should
 * detect `draftMode().isEnabled` and switch to `draft: true` queries.
 */
import { NextRequest, NextResponse } from 'next/server';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import config from '@payload-config';

const ALLOWED_COLLECTIONS = new Set(['posts', 'projects']);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const collection = searchParams.get('collection') || '';
  const slug = searchParams.get('slug') || '';

  if (!ALLOWED_COLLECTIONS.has(collection) || !slug) {
    return NextResponse.json({ ok: false, error: 'Invalid preview parameters' }, { status: 400 });
  }

  // Validate the request comes from an authenticated Payload admin user.
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: req.headers });
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  const target = collection === 'posts' ? `/notes/${slug}` : `/work/${slug}`;
  return NextResponse.redirect(new URL(target, req.url));
}

/**
 * Disable preview / draft mode.
 *   GET /api/preview/exit  → would route here too if desired; for now use this same path with ?exit=1
 */
export async function POST(req: NextRequest) {
  const draft = await draftMode();
  draft.disable();
  const back = req.nextUrl.searchParams.get('redirect') || '/';
  return NextResponse.redirect(new URL(back, req.url));
}
