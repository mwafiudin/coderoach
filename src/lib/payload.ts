import { getPayload as _getPayload } from 'payload';
import config from '@payload-config';

/**
 * Memoized Payload instance for server-side data fetching.
 * Use in Server Components and Route Handlers.
 */
let cached: Awaited<ReturnType<typeof _getPayload>> | null = null;

export async function getPayload() {
  if (!cached) {
    cached = await _getPayload({ config });
  }
  return cached;
}
