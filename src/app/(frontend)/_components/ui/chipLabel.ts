export const CHIP_LABEL_TEMPLATE = {
  useBrackets: false,
  withInnerSpacing: true,
} as const;

export function formatChipLabel(label: string | null | undefined): string {
  const normalized = String(label ?? '')
    .trim()
    .replace(/^\[\s*|\s*\]$/g, '');

  if (!normalized) return '';
  if (!CHIP_LABEL_TEMPLATE.useBrackets) return normalized;

  return CHIP_LABEL_TEMPLATE.withInnerSpacing ? `[ ${normalized} ]` : `[${normalized}]`;
}
