import type { Block } from 'payload';

export const ProcessBlock: Block = {
  slug: 'process',
  labels: { singular: 'Process timeline', plural: 'Process blocks' },
  fields: [
    { name: 'sectionMarker', type: 'text', defaultValue: '[ 04 / 07 ]' },
    { name: 'category', type: 'text', defaultValue: 'Process' },
    { name: 'description', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'lede', type: 'textarea' },
    {
      name: 'phases',
      type: 'relationship',
      relationTo: 'process-phases',
      hasMany: true,
      admin: { description: 'Phases to display. If empty, shows all phases sorted by order.' },
    },
  ],
};
