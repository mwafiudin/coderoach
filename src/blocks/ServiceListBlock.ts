import type { Block } from 'payload';

export const ServiceListBlock: Block = {
  slug: 'serviceList',
  labels: { singular: 'Service list', plural: 'Service list blocks' },
  fields: [
    { name: 'sectionMarker', type: 'text', defaultValue: '[ 01 / 07 ]' },
    { name: 'category', type: 'text', defaultValue: 'Services' },
    { name: 'description', type: 'text', admin: { description: 'Small subhead beside category, e.g. "Yang kami bangun".' } },
    { name: 'heading', type: 'text', required: true },
    { name: 'lede', type: 'textarea' },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'all',
      options: [
        { label: 'All services (sorted by order)', value: 'all' },
        { label: 'Pick specific services', value: 'manual' },
      ],
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: { condition: (_, sib) => sib?.source === 'manual' },
    },
  ],
};
