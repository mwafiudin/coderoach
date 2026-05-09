import { revalidatePath } from 'next/cache';
import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload';

/**
 * Safely call revalidatePath. Throws "Invariant: static generation store missing"
 * when invoked outside a Next.js request context (e.g. seed scripts), so we
 * swallow that specific error and continue.
 */
function safeRevalidate(path: string) {
  try {
    revalidatePath(path);
  } catch (e) {
    // Outside Next.js request context (seed, payload migrate). Skip silently.
  }
}

/**
 * Revalidate the homepage on any content change.
 * Untyped on purpose — works for both Collection and Global afterChange hooks.
 */
export const revalidateHome = ({ doc }: any) => {
  safeRevalidate('/');
  return doc;
};

/** Revalidate /work archive + a specific project detail. */
export const revalidateProject: CollectionAfterChangeHook = ({ doc }: any) => {
  safeRevalidate('/');
  safeRevalidate('/work');
  if (doc?.slug) safeRevalidate(`/work/${doc.slug}`);
  return doc;
};

/** Revalidate /services/[slug] + homepage. */
export const revalidateService: CollectionAfterChangeHook = ({ doc }: any) => {
  safeRevalidate('/');
  if (doc?.slug) safeRevalidate(`/services/${doc.slug}`);
  return doc;
};

/** Revalidate /notes archive + post detail. */
export const revalidatePost: CollectionAfterChangeHook = ({ doc }: any) => {
  safeRevalidate('/notes');
  if (doc?.slug) safeRevalidate(`/notes/${doc.slug}`);
  return doc;
};

/** Revalidate /notes archive (used by BlogSettings global). */
export const revalidateBlog: GlobalAfterChangeHook = ({ doc }: any) => {
  safeRevalidate('/');
  safeRevalidate('/notes');
  return doc;
};
