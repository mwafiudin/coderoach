import type { Block } from 'payload';

export const NotesBlock: Block = {
  slug: 'notes',
  labels: { singular: 'Field notes / blog grid', plural: 'Notes blocks' },
  fields: [
    { name: 'sectionMarker', type: 'text', defaultValue: '[ 06 / 07 ]' },
    { name: 'category', type: 'text', defaultValue: 'Field Notes' },
    { name: 'heading', type: 'text', required: true },
    { name: 'lede', type: 'textarea' },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 12,
      admin: { description: 'How many recent posts to show.' },
    },
    {
      name: 'showViewAllLink',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show "Lihat semua →" link to /notes archive.' },
    },
  ],
};
