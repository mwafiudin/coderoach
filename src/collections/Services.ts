import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['order', 'title', 'tag', 'icon'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first.' },
    },
    {
      name: 'tag',
      type: 'text',
      required: true,
      admin: { description: 'Mono label, e.g. BUILD, AUTOMATE' },
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'Build (code brackets)', value: 'build' },
        { label: 'Automate (refresh)', value: 'automate' },
        { label: 'Intelligence (bar chart)', value: 'intelligence' },
        { label: 'Augment (zap)', value: 'augment' },
      ],
    },
    { name: 'title', type: 'text', required: true },
    { name: 'tagline', type: 'text', required: true },
    { name: 'blurb', type: 'textarea', required: true },
    {
      name: 'list',
      type: 'array',
      required: true,
      admin: { description: 'Capability bullets' },
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'stack',
      type: 'array',
      required: true,
      admin: { description: 'Tech stack pills (e.g. Next.js, Postgres)' },
      fields: [{ name: 'tech', type: 'text', required: true }],
    },
  ],
};
