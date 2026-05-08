import type { CollectionConfig } from 'payload';

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['order', 'name'],
    group: 'Content',
    description: 'Trusted-by marquee entries.',
  },
  access: { read: () => true },
  fields: [
    { name: 'order', type: 'number', required: true, defaultValue: 0 },
    { name: 'name', type: 'text', required: true },
  ],
};
