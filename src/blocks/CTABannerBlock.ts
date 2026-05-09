import type { Block } from 'payload';
import { linkField } from '../fields/link';

export const CTABannerBlock: Block = {
  slug: 'ctaBanner',
  labels: { singular: 'CTA banner', plural: 'CTA banners' },
  fields: [
    { name: 'eyebrow', type: 'text', admin: { description: 'Small label above heading. Optional.' } },
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    linkField({
      name: 'cta',
      defaultLabel: 'Get in touch',
      defaultHref: '#contact',
    }),
    {
      name: 'tone',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark (ink background)', value: 'dark' },
        { label: 'Light (paper background)', value: 'light' },
      ],
    },
  ],
};
