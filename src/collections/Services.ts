import type { CollectionConfig } from 'payload';
import { revalidateService } from '../lib/revalidate';
import { autoSlug } from '../lib/slugify';

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
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      index: true,
      admin: { position: 'sidebar', description: 'Sort order in lists. Lower = earlier.' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: { beforeValidate: [autoSlug('title')] },
      admin: {
        position: 'sidebar',
        description: 'URL-safe identifier — drives /services/[slug] route.',
      },
    },
    {
      name: 'tag',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Mono label, e.g. BUILD, AUTOMATE (kept English — short tech label).',
      },
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
      admin: { position: 'sidebar' },
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
