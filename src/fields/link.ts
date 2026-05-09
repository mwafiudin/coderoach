import type { GroupField } from 'payload';

type LinkFieldArgs = {
  name: string;
  label?: string;
  description?: string;
  defaultLabel?: string;
  defaultHref?: string;
  /** Add an optional "open in new tab" checkbox. */
  includeNewTab?: boolean;
};

/**
 * Standard `{ label, href }` link group used for CTAs, nav items, footer links.
 * Optionally adds `newTab` checkbox for outbound links.
 */
export function linkField({
  name,
  label,
  description,
  defaultLabel,
  defaultHref,
  includeNewTab = false,
}: LinkFieldArgs): GroupField {
  return {
    name,
    type: 'group',
    ...(label ? { label } : {}),
    admin: description ? { description } : {},
    fields: [
      {
        name: 'label',
        type: 'text',
        ...(defaultLabel !== undefined ? { defaultValue: defaultLabel } : {}),
      },
      {
        name: 'href',
        type: 'text',
        ...(defaultHref !== undefined ? { defaultValue: defaultHref } : {}),
      },
      ...(includeNewTab
        ? [{ name: 'newTab', type: 'checkbox' as const, defaultValue: false, label: 'Open in new tab' }]
        : []),
    ],
  };
}
