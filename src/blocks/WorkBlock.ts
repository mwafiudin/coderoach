import type { Block } from 'payload';

export const WorkBlock: Block = {
  slug: 'work',
  labels: { singular: 'Work / case studies', plural: 'Work blocks' },
  fields: [
    { name: 'sectionMarker', type: 'text', defaultValue: '[ 02 / 07 ]' },
    { name: 'category', type: 'text', defaultValue: 'Work' },
    { name: 'description', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'lede', type: 'textarea' },
    {
      name: 'featuredProject',
      type: 'relationship',
      relationTo: 'projects',
      admin: { description: 'Featured case shown as the big hero card. If empty, falls back to project with featured=true.' },
    },
    {
      name: 'listProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: { description: 'Projects shown in the "more engagements" list. If empty, shows recent client projects.' },
    },
    {
      name: 'showViewAllLink',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show "Lihat semua →" link to /work archive.' },
    },
  ],
};
