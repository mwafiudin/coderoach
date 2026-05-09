import type { CollectionConfig } from 'payload';

export const Tenets: CollectionConfig = {
  slug: 'tenets',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['order', 'title', 'icon'],
    group: 'Content',
  },
  access: { read: () => true },
  fields: [
    { name: 'order', type: 'number', required: true, defaultValue: 0, index: true },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'Users (team)', value: 'users' },
        { label: 'Voice (message)', value: 'voice' },
        { label: 'Shield (durability)', value: 'shield' },
      ],
    },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
  ],
};
