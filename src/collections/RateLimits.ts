import type { CollectionConfig } from 'payload';

/**
 * Counter rows behind the API rate limits. Written with one atomic upsert per request and never
 * read through the admin, so the collection stays hidden and closed to every API.
 */
export const RateLimits: CollectionConfig = {
  slug: 'rate-limits',
  admin: { hidden: true },
  access: { read: () => false, create: () => false, update: () => false, delete: () => false },
  fields: [
    { name: 'key', type: 'text', required: true, unique: true, index: true },
    { name: 'count', type: 'number', required: true, defaultValue: 0 },
    { name: 'resetAt', type: 'date', required: true, index: true },
  ],
};
