import type { Block } from 'payload';

export const ProductsBlock: Block = {
  slug: 'products',
  labels: { singular: 'Products', plural: 'Products blocks' },
  fields: [
    { name: 'sectionMarker', type: 'text', defaultValue: '[ 03 / 07 ]' },
    { name: 'category', type: 'text', defaultValue: 'Products' },
    { name: 'description', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'lede', type: 'textarea' },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: { description: 'Studio products to feature. Filtered to kind=studio at render time. If empty, all studio products are shown.' },
    },
  ],
};
