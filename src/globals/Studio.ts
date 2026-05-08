import type { GlobalConfig } from 'payload';

export const Studio: GlobalConfig = {
  slug: 'studio',
  admin: { group: 'Site Content' },
  access: { read: () => true },
  fields: [
    { name: 'sectionMarker', type: 'text', defaultValue: 'Who you\'ll work with' },
    { name: 'heading', type: 'text', required: true },
    { name: 'lede', type: 'textarea', required: true },
    {
      name: 'stats',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'num', type: 'text', required: true },
        { name: 'accent', type: 'text', admin: { description: 'Accent suffix, e.g. "yr", "+"' } },
        { name: 'label', type: 'text', required: true, admin: { description: 'Two-line label, separate with newline.' } },
      ],
    },
  ],
};
