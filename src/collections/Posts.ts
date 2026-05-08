import type { CollectionConfig, FieldHook } from 'payload';
import { revalidatePost } from '../lib/revalidate';

const slugify = (val?: string | null): string =>
  (val || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const autoSlug: FieldHook = ({ value, data }) => value || slugify(data?.title);

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
    defaultColumns: ['title', 'category', 'publishedAt', 'published', 'featured'],
    group: 'Content',
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return { published: { equals: true } };
    },
  },
  hooks: { afterChange: [revalidatePost] },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: { beforeValidate: [autoSlug] },
    },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'engineering',
      options: [
        { label: 'Engineering', value: 'engineering' },
        { label: 'Operating', value: 'operating' },
        { label: 'Studio', value: 'studio' },
        { label: 'Notes', value: 'notes' },
      ],
    },
    { name: 'author', type: 'relationship', relationTo: 'authors', required: true },
    { name: 'publishedAt', type: 'date', required: true, defaultValue: () => new Date().toISOString() },
    { name: 'published', type: 'checkbox', defaultValue: true },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { description: 'Highlights one post on /notes archive.' } },
    {
      name: 'readingTime',
      type: 'number',
      admin: { description: 'Auto-calculated from content (~220 words/min).', readOnly: true },
      hooks: { beforeChange: [computeReadingTime] },
    },
    { name: 'content', type: 'richText', required: true },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text', required: true }] },
    { name: 'ogImage', type: 'upload', relationTo: 'media', admin: { description: 'Optional OG override. Falls back to coverImage.' } },
  ],
};
