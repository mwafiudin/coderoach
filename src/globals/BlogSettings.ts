import type { GlobalConfig } from 'payload';
import { revalidateBlog } from '../lib/revalidate';

export const BlogSettings: GlobalConfig = {
  slug: 'blog-settings',
  admin: { group: 'Site Content' },
  access: { read: () => true },
  hooks: { afterChange: [revalidateBlog] },
  fields: [
    {
      name: 'archiveHero',
      type: 'group',
      fields: [
        { name: 'sectionMarker', type: 'text', defaultValue: '[ FIELD NOTES / 01 ]' },
        { name: 'heading', type: 'text', defaultValue: 'Notes from the studio.' },
        { name: 'lede', type: 'textarea', defaultValue: 'Engineering, operating, and the bits in between.' },
      ],
    },
    { name: 'postsPerPage', type: 'number', defaultValue: 12 },
    { name: 'defaultOgImage', type: 'upload', relationTo: 'media' },
  ],
};
