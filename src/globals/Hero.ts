import type { GlobalConfig } from 'payload';
import { revalidateHome } from '../lib/revalidate';

export const Hero: GlobalConfig = {
  slug: 'hero',
  admin: { group: 'Site Content' },
  access: { read: () => true },
  hooks: { afterChange: [revalidateHome] },
  fields: [
    { name: 'pillText', type: 'text', required: true },
    {
      name: 'headline',
      type: 'group',
      fields: [
        { name: 'lead', type: 'text', required: true, admin: { description: 'Plain part, e.g. "Engineering that thinks"' } },
        { name: 'accent', type: 'text', required: true, admin: { description: 'Accent (electric blue) part, e.g. "like an operator."' } },
      ],
    },
    { name: 'lede', type: 'textarea', required: true },
    {
      name: 'ctaPrimary',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', required: true, defaultValue: 'Start a 48-hour discovery' },
        { name: 'href', type: 'text', required: true, defaultValue: '#contact' },
      ],
    },
    {
      name: 'ctaSecondary',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: "See what we've shipped" },
        { name: 'href', type: 'text', defaultValue: '#work' },
      ],
    },
    {
      name: 'metaItems',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'Bold portion, e.g. "40+", "4yr"' } },
        { name: 'label', type: 'text', required: true, admin: { description: 'After-text, e.g. "operators shipped"' } },
      ],
    },
    {
      name: 'trustedBy',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: '// TRUSTED BY 40+ OPERATORS' },
        { name: 'tagline', type: 'text', defaultValue: 'Across Indonesia & SEA — F&B, logistics, finance, agencies.' },
      ],
    },
  ],
};
