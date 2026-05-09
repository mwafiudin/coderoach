import type { Block } from 'payload';

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Rich text', plural: 'Rich text blocks' },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: { description: 'Long-form content. Headings, lists, links, images.' },
    },
    {
      name: 'maxWidth',
      type: 'select',
      defaultValue: 'narrow',
      options: [
        { label: 'Narrow (reading width)', value: 'narrow' },
        { label: 'Wide (page width)', value: 'wide' },
      ],
    },
  ],
};
