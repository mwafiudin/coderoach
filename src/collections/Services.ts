import type { CollectionConfig, FieldHook } from 'payload';
import { revalidateService } from '../lib/revalidate';

const slugify = (val?: string | null): string =>
  (val || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const autoSlug: FieldHook = ({ value, data }) => value || slugify(data?.title);

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['order', 'title', 'tag', 'icon'],
    group: 'Content',
  },
  access: { read: () => true },
  hooks: { afterChange: [revalidateService] },
  fields: [
    { name: 'order', type: 'number', required: true, defaultValue: 0 },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: { beforeValidate: [autoSlug] },
      admin: { description: 'URL-safe identifier — drives /services/[slug] route.' },
    },
    {
      name: 'tag',
      type: 'text',
      required: true,
      admin: { description: 'Mono label, e.g. BUILD, AUTOMATE (kept English — short tech label).' },
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'Build (code brackets)', value: 'build' },
        { label: 'Automate (refresh)', value: 'automate' },
        { label: 'Intelligence (bar chart)', value: 'intelligence' },
        { label: 'Augment (zap)', value: 'augment' },
      ],
    },
    { name: 'title', type: 'text', required: true },
    { name: 'tagline', type: 'text', required: true, admin: { description: 'Short hook (homepage card).' } },
    { name: 'blurb', type: 'textarea', required: true, admin: { description: 'Body copy on homepage card.' } },
    {
      name: 'list',
      type: 'array',
      required: true,
      admin: { description: 'Capability bullets (homepage card).' },
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'stack',
      type: 'array',
      required: true,
      admin: { description: 'Tech stack pills (kept English — tech terms).' },
      fields: [{ name: 'tech', type: 'text', required: true }],
    },
    {
      name: 'heroLede',
      type: 'textarea',
      
      admin: { description: 'Hero copy on /services/[slug] detail page (longer than tagline).' },
    },
    { name: 'richContent', type: 'richText', admin: { description: 'Full capability deep-dive (Lexical).' } },
    { name: 'pricingNote', type: 'text', admin: { description: 'e.g. "Engagement starts at Rp 50jt."' } },
    {
      name: 'caseStudies',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: { description: 'Manual pick. If empty, auto-pulled by service relationship.' },
    },
    {
      name: 'serviceFAQ',
      type: 'array',
      admin: { description: 'Service-scoped FAQ shown on /services/[slug].' },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
};
