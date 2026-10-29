import config from '@payload-config';
import { getPayload } from 'payload';
import { healthResponse } from '@/lib/health';

export const dynamic = 'force-dynamic';

/**
 * Railway's healthcheck; the schema check itself is in `@/lib/health`. /opsscore, the old
 * healthcheck, never touched Payload and passed a build the database couldn't serve.
 * `cron: true` also starts Payload's job crons in the process that serves traffic.
 */
export function GET() {
  return healthResponse(() => getPayload({ config, cron: true }));
}
