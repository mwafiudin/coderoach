/**
 * POST /api/pages/duplicate?id=<pageId>
 * Clones a Page (including nested layout blocks) into a new draft Page with slug "<orig>-copy".
 * Requires an authenticated Payload admin session.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

export async function POST(req: NextRequest) {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: req.headers });
  if (!user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const id = req.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 });
  }
  let source: any;
  try {
    source = await payload.findByID({ collection: 'pages', id, depth: 0, overrideAccess: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Source page not found' }, { status: 404 });
  }
  if (!source) {
    return NextResponse.json({ ok: false, error: 'Source page not found' }, { status: 404 });
  }
  // Build a unique slug suffix.
  const baseSlug = String(source.slug || 'page');
  const baseTitle = String(source.title || 'Page');
  let suffix = 'copy';
  let candidateSlug = `${baseSlug}-${suffix}`;
  let n = 1;
  while (true) {
    const exists = await payload.find({
      collection: 'pages',
      where: { slug: { equals: candidateSlug } },
      limit: 1,
      overrideAccess: true,
      depth: 0,
    });
    if (exists.totalDocs === 0) break;
    n += 1;
    candidateSlug = `${baseSlug}-copy-${n}`;
    if (n > 50) {
      return NextResponse.json({ ok: false, error: 'Too many duplicates — clean up first.' }, { status: 409 });
    }
    suffix = `copy-${n}`;
  }
  // Strip out IDs so Payload assigns fresh ones for nested blocks.
  const stripIds = (val: any): any => {
    if (Array.isArray(val)) return val.map(stripIds);
    if (val && typeof val === 'object') {
      const { id: _id, ...rest } = val;
      const out: any = {};
      for (const [k, v] of Object.entries(rest)) out[k] = stripIds(v);
      return out;
    }
    return val;
  };
  const cloneLayout = stripIds(source.layout || []);
  try {
    const created = await payload.create({
      collection: 'pages',
      data: {
        title: `${baseTitle} (copy)`,
        slug: candidateSlug,
        seo: source.seo || {},
        layout: cloneLayout,
        _status: 'draft',
      },
      overrideAccess: true,
    });
    return NextResponse.json({ ok: true, id: created.id, slug: candidateSlug });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || 'Failed to duplicate' },
      { status: 500 },
    );
  }
}
