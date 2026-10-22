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

export function scopeValue(input: unknown): ScopeValue {
  if (typeof input !== 'string') return 'Other';
  const s = input.trim();
  if ((SCOPE_VALUES as readonly string[]).includes(s)) return s as ScopeValue;
  return BY_LABEL[s.toLowerCase()] ?? 'Other';
}
