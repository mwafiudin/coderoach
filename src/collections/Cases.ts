import type { CollectionConfig } from 'payload';

export const Cases: CollectionConfig = {
  slug: 'cases',
  admin: {
    useAsTitle: 'client',
    defaultColumns: ['idx', 'client', 'meta', 'featured', 'published'],
    group: 'Content',
  },
  access: {
    read: ({ req }) => {
      // Public can only read published cases
      if (req.user) return true;
      return { published: { equals: true } };
    },
  },
  fields: [
    {
      name: 'idx',
      type: 'text',
      required: true,
      admin: { description: 'Display index, e.g. "02" — drives [ 02 ] mono label.' },
    },
    { name: 'client', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'meta',
      type: 'text',
      required: true,
      admin: { description: 'Industry · service tag, e.g. "F&B · INTELLIGENCE"' },
    },
    {
      name: 'pills',
      type: 'array',
      admin: { description: 'Stack pills shown on row, e.g. BIGQUERY, METABASE' },
      fields: [{ name: 'pill', type: 'text', required: true }],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Render as the dark hero case-feature instead of work-row.' },
    },
    { name: 'published', type: 'checkbox', defaultValue: true },
    {
      name: 'featuredDetails',
      type: 'group',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.featured),
        description: 'Only used when featured = true.',
      },
      fields: [
        { name: 'badgeLabel', type: 'text', defaultValue: '[ FEATURED · 2026 ]' },
        { name: 'shippedLabel', type: 'text', defaultValue: '[ ✓ SHIPPED ]' },
        { name: 'metaLine', type: 'text', admin: { description: 'e.g. "LOGISTICS · BUILD · 11 WEEKS · 2 ENGINEERS"' } },
        { name: 'headline', type: 'textarea' },
        { name: 'description', type: 'textarea' },
        {
          name: 'metrics',
          type: 'array',
          maxRows: 3,
          fields: [
            { name: 'num', type: 'text', required: true },
            { name: 'accent', type: 'text', admin: { description: 'Accent suffix, e.g. "%", "w", "×"' } },
            { name: 'label', type: 'text', required: true },
          ],
        },
        {
          name: 'codePanel',
          type: 'group',
          fields: [
            { name: 'tag', type: 'text', defaultValue: '[ .TS ]' },
            { name: 'path', type: 'text' },
            { name: 'lines', type: 'array', fields: [{ name: 'line', type: 'text' }] },
          ],
        },
        {
          name: 'stack',
          type: 'array',
          fields: [{ name: 'tech', type: 'text', required: true }],
        },
        { name: 'caseStudyHref', type: 'text' },
      ],
    },
  ],
};
