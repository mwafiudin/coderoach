import type { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['order', 'name', 'tag', 'shippedYear'],
    group: 'Content',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    { name: 'name', type: 'text', required: true },
    {
      name: 'tag',
      type: 'text',
      required: true,
      admin: { description: 'Mono category label, e.g. "F&B OPS", "KOL OS"' },
    },
    { name: 'blurb', type: 'textarea', required: true },
    {
      name: 'bullets',
      type: 'array',
      required: true,
      fields: [{ name: 'bullet', type: 'text', required: true }],
    },
    { name: 'shippedYear', type: 'text', admin: { description: 'e.g. "2024"' } },
    { name: 'usage', type: 'text', admin: { description: 'e.g. "1.2K OUTLETS", "380 CAMPAIGNS"' } },
    {
      name: 'link',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', admin: { description: 'e.g. "laporta.id →"' } },
        { name: 'href', type: 'text' },
      ],
    },
    {
      name: 'vizType',
      type: 'select',
      required: true,
      options: [
        { label: 'Laporta (P&L dashboard)', value: 'laporta' },
        { label: 'Viralytics (KOL list)', value: 'viralytics' },
      ],
    },
  ],
};
