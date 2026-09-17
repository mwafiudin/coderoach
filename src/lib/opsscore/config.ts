/**
 * OpsScore — product-level constants.
 * Source of truth for rules and copy: docs/opsscore-brief.md.
 */

// TODO(decision): final product name + slug (OpsScore / Ops X-Ray / Operating Index / Sistemasi Score).
// Next.js routes are folders, so src/app/(frontend)/opsscore must be renamed together with this.
export const PRODUCT_SLUG = 'opsscore';
export const PRODUCT_NAME = 'OpsScore';

/**
 * Bump when questions, option order, weights, or thresholds change.
 * Every session stores the version it was scored with, so old results stay as they were.
 */
export const INSTRUMENT_VERSION = 1;

export const productPath = (path = '') => `/${PRODUCT_SLUG}${path}`;

/** Query string on the share page CTA, so visits from shared results are attributable. */
export const SHARE_CTA_QUERY = '?utm_source=opsscore_share&utm_medium=referral';

/** Static share images per phase, rendered by scripts/opsscore-og.ts. */
export const ogImagePath = (phase: number) => `/assets/opsscore/og-fase-${phase}.png`;
