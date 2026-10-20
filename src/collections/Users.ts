import type { CollectionConfig } from 'payload';
import { defaultUsername } from '../lib/username';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'System',
  },
  // Username is optional so adding the column never asks for a value on existing accounts;
  // email login stays, and forgot-password still needs the email.
  auth: {
    loginWithUsername: { allowEmailLogin: true, requireEmail: true, requireUsername: false },
  },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === 'create' && data && !data.username) data.username = defaultUsername(data.email);
        return data;
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text' },
  ],
};
