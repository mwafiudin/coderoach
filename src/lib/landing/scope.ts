/**
 * The contact form sends the chip's label; Submissions stores one of a fixed set of values
 * (a Postgres enum). Labels are copy and change, so they're translated here rather than
 * stored. Anything unknown is kept as 'Other' instead of failing the brief.
 */
export const SCOPE_VALUES = ['Build', 'Automate', 'Intelligence', 'Augment', 'Belum yakin', 'Other'] as const;
export type ScopeValue = (typeof SCOPE_VALUES)[number];

const BY_LABEL: Record<string, ScopeValue> = {
  'erp & sistem operasional': 'Build',
  'otomasi & ai': 'Automate',
  'dashboard & bi': 'Intelligence',
  'belum yakin': 'Belum yakin',
};

for (const v of SCOPE_VALUES) BY_LABEL[v.toLowerCase()] = v;

export function scopeValue(input: unknown): ScopeValue {
  if (typeof input !== 'string') return 'Other';
  return BY_LABEL[input.trim().toLowerCase()] ?? 'Other';
}

/**
 * Picks the chip a link asked for (`/?scope=build#contact` from a service page). Service slugs
 * match the stored values, so both sides go through scopeValue. No chip for it: nothing is picked.
 */
export function chipForScope(chips: string[], wanted: string | null): string | undefined {
  const target = scopeValue(wanted);
  if (target === 'Other') return undefined;
  return chips.find((c) => scopeValue(c) === target);
}
