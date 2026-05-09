import type { CollectionConfig, FieldHook } from 'payload';
import { revalidatePost } from '../lib/revalidate';
import { autoSlug } from '../lib/slugify';

// Rough reading-time calc from Lexical content
const computeReadingTime: FieldHook = ({ data }) => {
  const content = data?.content;
  if (!content) return 0;
  const text = JSON.stringify(content);
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status', 'featured'],
    group: 'Content',
  },
  versions: {
    drafts: { autosave: { interval: 800 } },
    maxPerDoc: 25,
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return { _status: { equals: 'published' } };
    },
  },
  hooks: { afterChange: [revalidatePost] },
  fields: [
    // ============ SIDEBAR ============
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: { beforeValidate: [autoSlug('title')] },
      admin: { position: 'sidebar', description: 'URL slug. Auto-generated from title.' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      index: true,
      defaultValue: 'engineering',
      options: [
        { label: 'Engineering', value: 'engineering' },
        { label: 'Operating', value: 'operating' },
        { label: 'Studio', value: 'studio' },
        { label: 'Notes', value: 'notes' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      index: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar', date: { displayFormat: 'yyyy-MM-dd' } },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: { position: 'sidebar', description: 'Pins this post to top of /notes archive.' },
    },
    {
      name: 'readingTime',
      type: 'number',
      hooks: { beforeChange: [computeReadingTime] },
      admin: { position: 'sidebar', readOnly: true, description: 'Auto-calculated from content (~220 words/min).' },
    },

    // ============ TABS (main canvas) ============
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'excerpt', type: 'textarea', required: true, admin: { description: 'Shown on archive cards & in post header.' } },
            { name: 'content', type: 'richText', required: true },
            {
              name: 'tags',
              type: 'array',
              admin: { description: 'Free-text tags. Used for filtering on /notes archive.' },
              fields: [{ name: 'tag', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'SEO & media',
          fields: [
            { name: 'coverImage', type: 'upload', relationTo: 'media', admin: { description: 'Hero image at top of the post.' } },
            { name: 'ogImage', type: 'upload', relationTo: 'media', admin: { description: 'Optional OG override. Falls back to coverImage if empty.' } },
          ],
        },
      ],
    },
  ],
};
