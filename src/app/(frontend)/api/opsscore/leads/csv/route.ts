import type { NextRequest } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import { findLeads, leadsToCsv, parseFilters } from '@/lib/opsscore/admin';

/** CSV export for the admin view. Requires a logged-in Payload user; honours the view's filters. */
export async function GET(req: NextRequest) {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: req.headers });
  if (!user) return new Response('Unauthorized', { status: 401 });

  const filters = parseFilters(Object.fromEntries(req.nextUrl.searchParams));
  const rows = await findLeads(payload, filters);
  const date = new Date().toISOString().slice(0, 10);
  return new Response(leadsToCsv(rows, process.env.NEXT_PUBLIC_SERVER_URL || req.nextUrl.origin), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="opsscore-leads-${date}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}
