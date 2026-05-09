import type { GlobalConfig } from 'payload';
import { revalidateHome } from '../lib/revalidate';

export const Studio: GlobalConfig = {
  slug: 'studio',
  admin: { group: 'Site Content' },
  access: { read: () => true },
  hooks: { afterChange: [revalidateHome] },
  fields: [
    { name: 'sectionMarker', type: 'text', defaultValue: "Who you'll work with" },
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
    {
      name: 'about',
      type: 'group',
      admin: { description: '/studio page-specific fields.' },
      fields: [
        { name: 'pageHeading', type: 'text', defaultValue: 'A studio that ships.' },
        { name: 'pageLede', type: 'textarea', admin: { description: 'Hero lede on /studio page.' } },
        { name: 'mission', type: 'textarea', admin: { description: 'Short mission statement (1-2 sentences).' } },
        { name: 'story', type: 'richText', admin: { description: 'Full studio narrative. Lexical.' } },
        {
          name: 'workspace',
          type: 'group',
          fields: [
            { name: 'address', type: 'text', defaultValue: 'Kemang, Jakarta Selatan, Indonesia' },
            { name: 'hours', type: 'text', defaultValue: 'Mon–Fri · 09:00–18:00 WIB · async otherwise' },
            { name: 'tagline', type: 'text', defaultValue: 'Walk-ins by appointment.' },
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          name: 'timeline',
          type: 'array',
          admin: { description: 'Studio milestones.' },
          fields: [
            { name: 'year', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'text' },
          ],
        },
      ],
    },
  ],
};
