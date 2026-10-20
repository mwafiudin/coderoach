import type { CollectionConfig } from 'payload';

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
  fields: [
    { name: 'name', type: 'text' },
  ],
};
