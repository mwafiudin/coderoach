import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'System',
    description: 'Image library. Variants auto-generated on upload (thumbnail / card / hero / og).',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'alt', type: 'text', required: true, admin: { description: 'Alt text for accessibility / SEO. Required.' } },
  ],
  upload: {
    mimeTypes: ['image/*'],
    formatOptions: { format: 'webp', options: { quality: 82 } },
    imageSizes: [
      { name: 'thumbnail', width: 240, height: 240, position: 'centre' },
      { name: 'card', width: 720 },
      { name: 'hero', width: 1600 },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
  },
};
