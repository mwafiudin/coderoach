import type { Field } from 'payload';

type ImageFieldArgs = {
  name: string;
  label?: string;
  required?: boolean;
  description?: string;
  /** Use 'sidebar' to place in the document sidebar. */
  position?: 'sidebar';
};

/**
 * Standard upload field pointing at the `media` collection.
 * Use everywhere instead of inlining `{ type: 'upload', relationTo: 'media' }`.
 */
export function imageField({
  name,
  label,
  required = false,
  description,
  position,
}: ImageFieldArgs): Field {
  return {
    name,
    type: 'upload',
    relationTo: 'media',
    required,
    ...(label ? { label } : {}),
    admin: {
      ...(position ? { position } : {}),
      ...(description ? { description } : {}),
    },
  };
}
