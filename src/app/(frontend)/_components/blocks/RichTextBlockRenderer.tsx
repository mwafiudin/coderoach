import { ProseRenderer } from '../detail/ProseRenderer';

export function RichTextBlockRenderer({ block }: { block: any }) {
  if (!block?.content) return null;
  const wide = block.maxWidth === 'wide';
  return (
    <section className="py-[80px]">
      <div className={`${wide ? 'max-w-[1180px]' : 'max-w-[760px]'} mx-auto px-8`}>
        <ProseRenderer data={block.content} />
      </div>
    </section>
  );
}
