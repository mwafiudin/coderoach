import type { CollectionConfig } from 'payload';

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['order', 'question'],
    group: 'Content',
  },
  access: { read: () => true },
  fields: [
    { name: 'order', type: 'number', required: true, defaultValue: 0, index: true },
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
  ],
};
