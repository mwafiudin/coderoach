import type { Block } from 'payload';
import { linkField } from '../fields/link';

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Hero blocks' },
  fields: [
    {
      name: 'pillText',
      type: 'text',
      admin: { description: 'Small badge above headline. Optional.' },
    },
    {
      name: 'headline',
      type: 'group',
      fields: [
        { name: 'lead', type: 'text', required: true, admin: { description: 'Plain part of the headline.' } },
        { name: 'accent', type: 'text', admin: { description: 'Accent (electric blue) part. Optional.' } },
      ],
    },
    {
      name: 'lede',
      type: 'textarea',
      admin: { description: 'One-paragraph subheadline below the headline.' },
    },
    linkField({
      name: 'ctaPrimary',
      description: 'Main call-to-action button (filled).',
      defaultLabel: 'Get started',
      defaultHref: '#contact',
    }),
    linkField({
      name: 'ctaSecondary',
      description: 'Secondary CTA (outline). Optional.',
    }),
    {
      name: 'metaItems',
      type: 'array',
      maxRows: 4,
      admin: { description: 'Small stat row below CTA buttons (e.g. "3+ years jalan").' },
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'showOpsConsole',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show the live ops console viz on the right.' },
    },
    {
      name: 'showTrustedBy',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show trusted-by client marquee below hero.' },
    },
    {
      name: 'trustedBy',
      type: 'group',
      admin: {
        condition: (_, sib) => Boolean(sib?.showTrustedBy),
      },
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Trusted by' },
        { name: 'tagline', type: 'text', admin: { description: 'Small caption next to the label.' } },
      ],
    },
  ],
};
