import type { GlobalConfig } from 'payload';

export const TopBar: GlobalConfig = {
  slug: 'top-bar',
  admin: { group: 'Site Content' },
  access: { read: () => true },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true },
    { name: 'tag', type: 'text', defaultValue: '[ // NOW BOOKING ]' },
    { name: 'message', type: 'text', required: true },
    {
      name: 'link',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Start a 48-hour discovery →' },
        { name: 'href', type: 'text', defaultValue: '#contact' },
      ],
    },
  ],
};
