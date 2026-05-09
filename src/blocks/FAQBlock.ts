import type { Block } from 'payload';

export const FAQBlock: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQ blocks' },
  fields: [
    {
      name: 'sectionMarker',
      type: 'text',
      defaultValue: 'FAQ',
      admin: { description: 'Small mono label above heading.' },
    },
    { name: 'heading', type: 'text', required: true, defaultValue: "Things you're probably wondering." },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'collection',
      options: [
        { label: 'Pull from FAQs collection', value: 'collection' },
        { label: 'Custom list (defined here)', value: 'custom' },
      ],
    },
    {
      name: 'customItems',
      type: 'array',
      admin: { condition: (_, sib) => sib?.source === 'custom' },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
};
