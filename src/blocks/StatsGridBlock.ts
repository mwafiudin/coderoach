import type { Block } from 'payload';

export const StatsGridBlock: Block = {
  slug: 'statsGrid',
  labels: { singular: 'Stats grid', plural: 'Stats grids' },
  fields: [
    { name: 'eyebrow', type: 'text', admin: { description: 'Optional small label above the grid.' } },
    { name: 'heading', type: 'text' },
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      admin: { description: 'Each stat: big number + accent + label.' },
      fields: [
        { name: 'num', type: 'text', required: true, admin: { description: 'e.g. "10", "100"' } },
        { name: 'accent', type: 'text', admin: { description: 'e.g. "+", "%", "yr"' } },
        { name: 'label', type: 'text', required: true, admin: { description: 'Caption beneath the number.' } },
      ],
    },
  ],
};
