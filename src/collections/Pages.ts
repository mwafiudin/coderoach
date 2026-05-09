import type { CollectionConfig } from 'payload';
import { autoSlug } from '../lib/slugify';
import { revalidatePath } from 'next/cache';
import {
  HeroBlock,
  RichTextBlock,
  CTABannerBlock,
  StatsGridBlock,
  ContactBlock,
  FAQBlock,
  ServiceListBlock,
  WorkBlock,
  ProductsBlock,
  ProcessBlock,
  StudioBlock,
  NotesBlock,
} from '../blocks';
import { imageField } from '../fields/imageField';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    group: 'Content',
    description: 'Marketing pages built from blocks. The page with slug "home" renders at /. Other slugs render at /<slug>.',
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
  hooks: {
    afterChange: [
      ({ doc }) => {
        try {
          const slug = (doc as any)?.slug;
          if (!slug) return doc;
          // Always revalidate root and the page's own URL
          revalidatePath('/');
          if (slug !== 'home') revalidatePath(`/${slug}`);
        } catch {
          // outside Next.js request context (seed)
        }
        return doc;
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: { beforeValidate: [autoSlug('title')] },
      admin: {
        position: 'sidebar',
        description: 'URL-safe identifier. "home" renders at /. Other values render at /<slug>.',
      },
    },
    {
      name: 'seo',
      type: 'group',
      admin: { description: 'Meta tags for this page. Falls back to title + site description.' },
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        imageField({ name: 'ogImage', description: 'Override OG image for this page.' }),
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      minRows: 1,
      admin: { description: 'Drag blocks to compose the page. Add as many as you need.' },
      blocks: [
        HeroBlock,
        ServiceListBlock,
        WorkBlock,
        ProductsBlock,
        ProcessBlock,
        StudioBlock,
        NotesBlock,
        FAQBlock,
        ContactBlock,
        RichTextBlock,
        CTABannerBlock,
        StatsGridBlock,
      ],
    },
  ],
};
