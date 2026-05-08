import type { CollectionConfig } from 'payload';

export const ProcessPhases: CollectionConfig = {
  slug: 'process-phases',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['order', 'tag', 'name', 'week'],
    group: 'Content',
  },
  access: { read: () => true },
  fields: [
    { name: 'order', type: 'number', required: true, defaultValue: 0 },
    { name: 'tag', type: 'text', required: true, admin: { description: 'e.g. "PHASE 01"' } },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'Discover (magnifying glass)', value: 'discover' },
        { label: 'Design (pen)', value: 'design' },
        { label: 'Build (layers)', value: 'layers' },
        { label: 'Handoff (package)', value: 'handoff' },
      ],
    },
    { name: 'name', type: 'text', required: true },
    { name: 'week', type: 'text', required: true, admin: { description: 'e.g. "WK 0–1", "FINAL WK"' } },
    { name: 'what', type: 'textarea', required: true },
    {
      name: 'deliv',
      type: 'text',
      required: true,
      
      admin: { description: 'Deliverables line, e.g. "Source · docs · 30-day support"' },
    },
  ],
};
