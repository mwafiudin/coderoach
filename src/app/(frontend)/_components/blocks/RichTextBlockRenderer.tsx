import { ProseRenderer } from '../detail/ProseRenderer';
import { FitSection, LedgerSection, SymptomsSection } from '../narrative/sections';

/** Narrative blocks are drawn by their own composition; every other rich text block stays prose. */
const LAYOUTS: Record<string, (props: { content: unknown }) => React.ReactElement> = {
  'kapan-butuh-sistem': SymptomsSection,
  'langganan-atau-bangun': LedgerSection,
  'cocok-untuk-siapa': FitSection,
};

export function RichTextBlockRenderer({ block }: { block: any }) {
  if (!block?.content) return null;

  const Layout = block.blockName ? LAYOUTS[block.blockName] : undefined;
  if (Layout) return <Layout content={block.content} />;

  const wide = block.maxWidth === 'wide';
  return (
    <section className="py-[80px]">
      <div className={`${wide ? 'max-w-[1180px]' : 'max-w-[760px]'} mx-auto px-8`}>
        <ProseRenderer data={block.content} />
      </div>
    </section>
  );
}
