import { AnimatedCount } from '../ui/AnimatedCount';

export function StatsGridBlockRenderer({ block }: { block: any }) {
  const stats = block?.stats || [];
  if (stats.length === 0) return null;
  return (
    <section className="py-[80px]">
      <div className="max-w-[1180px] mx-auto px-8">
        {(block?.eyebrow || block?.heading) && (
          <div className="mb-12">
            {block?.eyebrow && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600 block">
                {block.eyebrow}
              </span>
            )}
            {block?.heading && (
              <h2 className="text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.02em] leading-tight mt-3 max-w-[24ch]">
                {block.heading}
              </h2>
            )}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-9">
          {stats.map((s: any, i: number) => (
            <div key={i} className="flex flex-col gap-2.5">
              <div className="text-[clamp(36px,5vw,56px)] font-bold leading-none tracking-[-0.025em] tabular text-ink">
                <AnimatedCount value={s.num} />
                {s.accent && <span className="text-electric">{s.accent}</span>}
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600 leading-[1.5] whitespace-pre-line">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
