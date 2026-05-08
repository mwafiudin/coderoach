import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: { group: 'Site Content' },
  access: { read: () => true },
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'Coderoach Studio' },
    { name: 'siteDescription', type: 'textarea' },
    {
      name: 'navStatus',
      type: 'group',
      admin: { description: 'Live status indicator in nav (e.g. "JKT · OPEN Q3").' },
      fields: [
        { name: 'label', type: 'text', defaultValue: 'JKT · OPEN Q3' },
      ],
    },
    {
      name: 'navCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Start a discovery →' },
        { name: 'href', type: 'text', defaultValue: '#contact' },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        { name: 'tagline', type: 'textarea' },
        { name: 'badge', type: 'text', defaultValue: 'JKT-1 · OPEN FOR Q3' },
        {
          name: 'columns',
          type: 'array',
          maxRows: 3,
          fields: [
            { name: 'heading', type: 'text', required: true },
            {
              name: 'links',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          name: 'metaLine',
          type: 'group',
          fields: [
            { name: 'left', type: 'text' },
            { name: 'right', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'social',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
  ],
};
