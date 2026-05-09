/**
 * Maps Payload block JSON ({ blockType, ...fields }) to a React component per block type.
 * Each block adapter is a server component — collection-tied blocks fetch their own data.
 */
import { HeroBlockRenderer } from './HeroBlockRenderer';
import { ServiceListBlockRenderer } from './ServiceListBlockRenderer';
import { WorkBlockRenderer } from './WorkBlockRenderer';
import { ProductsBlockRenderer } from './ProductsBlockRenderer';
import { ProcessBlockRenderer } from './ProcessBlockRenderer';
import { StudioBlockRenderer } from './StudioBlockRenderer';
import { NotesBlockRenderer } from './NotesBlockRenderer';
import { FAQBlockRenderer } from './FAQBlockRenderer';
import { ContactBlockRenderer } from './ContactBlockRenderer';
import { RichTextBlockRenderer } from './RichTextBlockRenderer';
import { CTABannerBlockRenderer } from './CTABannerBlockRenderer';
import { StatsGridBlockRenderer } from './StatsGridBlockRenderer';

export async function BlockRenderer({ blocks }: { blocks: any[] }) {
  if (!blocks || blocks.length === 0) return null;
  const rendered = await Promise.all(
    blocks.map(async (block, i) => {
      const key = block.id || `${block.blockType}-${i}`;
      switch (block.blockType) {
        case 'hero':
          return <HeroBlockRenderer key={key} block={block} />;
        case 'serviceList':
          return <ServiceListBlockRenderer key={key} block={block} />;
        case 'work':
          return <WorkBlockRenderer key={key} block={block} />;
        case 'products':
          return <ProductsBlockRenderer key={key} block={block} />;
        case 'process':
          return <ProcessBlockRenderer key={key} block={block} />;
        case 'studio':
          return <StudioBlockRenderer key={key} block={block} />;
        case 'notes':
          return <NotesBlockRenderer key={key} block={block} />;
        case 'faq':
          return <FAQBlockRenderer key={key} block={block} />;
        case 'contact':
          return <ContactBlockRenderer key={key} block={block} />;
        case 'richText':
          return <RichTextBlockRenderer key={key} block={block} />;
        case 'ctaBanner':
          return <CTABannerBlockRenderer key={key} block={block} />;
        case 'statsGrid':
          return <StatsGridBlockRenderer key={key} block={block} />;
        default:
          if (process.env.NODE_ENV !== 'production') {
            console.warn(`BlockRenderer: unknown blockType "${block.blockType}"`);
          }
          return null;
      }
    }),
  );
  return <>{rendered}</>;
}
