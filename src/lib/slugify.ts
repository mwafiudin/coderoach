import type { FieldHook } from 'payload';

/**
 * Lowercase, strip non-alphanumeric, collapse to single dashes, trim leading/trailing dashes.
 */
export function slugify(val?: string | null): string {
  return (val || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Field hook factory: auto-fills the slug from another field if value is empty.
 *
 *   const slugFromTitle = autoSlug('title')
 *   { name: 'slug', type: 'text', hooks: { beforeValidate: [slugFromTitle] } }
 */
export function autoSlug(sourceField: string): FieldHook {
  return ({ value, data }) => value || slugify((data as any)?.[sourceField]);
}
