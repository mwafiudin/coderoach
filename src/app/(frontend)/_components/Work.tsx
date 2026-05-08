import { SectionHead } from './SectionHead';

type Project = {
  id: string | number;
  slug: string;
  order?: number;
  client: string;
  tagline: string;
  meta?: string | null;
  publishedYear?: string | null;
  pills?: Array<{ pill: string }> | null;
  featured?: boolean | null;
  featuredDetails?: {
    badgeLabel?: string | null;
    shippedLabel?: string | null;
    metaLine?: string | null;
    headline?: string | null;
    description?: string | null;
    metrics?: Array<{ num: string; accent?: string | null; label: string }> | null;
    codePanel?: { tag?: string | null; path?: string | null; lines?: Array<{ line?: string | null }> | null } | null;
    stack?: Array<{ tech: string }> | null;
  } | null;
};

export function Work({ cases }: { cases: Project[] }) {
  const featured = cases.find((c) => c.featured);
  const list = cases.filter((c) => !c.featured);

  return (
    <section id="work" className="py-[120px] relative">
      <div className="max-w-[1180px] mx-auto px-8">
        <SectionHead
          marker="[ 02 / 07 ]"
          category="Work"
          description="Selected case studies"
          heading="What we've shipped."
          lede="Representative engagements from the last 18 months. Full case studies on request."
        />

        {featured?.featuredDetails && (
          <div
            className="relative mt-12 bg-ink text-paper rounded-2xl p-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 items-center overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_24px_48px_-24px_rgba(8,9,10,0.5)] isolate"
            data-spotlight
          >
            {/* Layered background — replaces heavy halftone with subtle grid + corner glow */}
            <div
              aria-hidden
              className="absolute inset-0 -z-[1] pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(244,247,245,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,247,245,0.5) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div
              aria-hidden
              className="absolute -top-32 -right-32 w-[480px] h-[480px] -z-[1] pointer-events-none rounded-full bg-[radial-gradient(circle_at_center,rgba(44,112,254,0.35)_0%,transparent_60%)] blur-[40px]"
            />
            <div
              aria-hidden
              className="absolute -bottom-40 -left-20 w-[380px] h-[380px] -z-[1] pointer-events-none rounded-full bg-[radial-gradient(circle_at_center,rgba(93,215,154,0.18)_0%,transparent_60%)] blur-[60px]"
            />
            {/* Top inner highlight — gives that premium "lit-from-above" feel */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px -z-[1] pointer-events-none bg-gradient-to-r from-transparent via-paper/20 to-transparent"
            />
            <div className="relative z-[1]">
              <div className="flex gap-2 flex-wrap mb-4">
                {featured.featuredDetails.badgeLabel && (
                  <span className="h-6 px-2.5 rounded-full inline-flex items-center font-mono text-[11px] font-medium uppercase tracking-wider bg-paper/[0.08] border border-paper/[0.08] text-paper">
                    {featured.featuredDetails.badgeLabel}
                  </span>
                )}
                {featured.featuredDetails.shippedLabel && (
                  <span className="h-6 px-2.5 rounded-full inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-wider bg-success/[0.14] border border-[#5DD79A]/30 text-[#5DD79A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-success" aria-hidden />
                    Shipped
                  </span>
                )}
              </div>
              {featured.featuredDetails.metaLine && (
                <span className="block font-mono text-[11px] uppercase tracking-wider text-mist-500 mb-1.5 tabular">
                  {featured.featuredDetails.metaLine}
                </span>
              )}
              {featured.featuredDetails.headline && (
                <h3 className="text-[48px] font-bold tracking-[-0.02em] leading-[1.05] my-4">
                  {featured.featuredDetails.headline}
                </h3>
              )}
              {featured.featuredDetails.description && (
                <p className="text-[17px] leading-[1.5] text-mist-500 max-w-[460px] mb-7">
                  {featured.featuredDetails.description}
                </p>
              )}
              {featured.featuredDetails.metrics && featured.featuredDetails.metrics.length > 0 && (
                <div className="flex gap-10 mb-7 tabular">
                  {featured.featuredDetails.metrics.map((m, i) => (
                    <div key={i}>
                      <div className="text-[44px] font-bold tracking-[-0.02em] leading-none">
                        {m.num}
                        {m.accent && <span className="text-electric">{m.accent}</span>}
                      </div>
                      <div className="font-mono text-[11px] text-mist-500 tracking-wider mt-1.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}
              <a
                href={`/work/${featured.slug}`}
                className="h-11 px-[18px] rounded-md bg-paper text-ink text-sm font-semibold inline-flex items-center gap-2 hover:bg-mist-400 transition-colors"
              >
                Read the case study →
              </a>
            </div>
            <div className="relative z-[1]">
              {featured.featuredDetails.codePanel && (
                <div className="bg-shadow-900 text-paper border border-shadow-700 rounded-lg px-[22px] py-5 font-mono text-[13px] leading-[1.7] overflow-hidden tabular">
                  <div className="text-mist-600 mb-2 flex justify-between">
                    <span>{featured.featuredDetails.codePanel.tag}</span>
                    <span>{featured.featuredDetails.codePanel.path}</span>
                  </div>
                  {featured.featuredDetails.codePanel.lines?.map((l, i) => (
                    <div key={i} className="flex">
                      <span className="text-mist-600 inline-block w-[22px]">{i + 1}</span>
                      <span dangerouslySetInnerHTML={{ __html: l.line || '' }} />
                    </div>
                  ))}
                </div>
              )}
              {featured.featuredDetails.stack && featured.featuredDetails.stack.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-6">
                  {featured.featuredDetails.stack.map((s) => (
                    <span key={s.tech} className="h-6 px-2.5 rounded-full inline-flex items-center font-mono text-[11px] font-medium uppercase tracking-wider bg-mist-400/[0.18] text-paper">
                      {s.tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {list.length > 0 && (
          <>
            <div className="mt-14 mb-[18px] pb-3.5 border-b border-paper-200 flex items-baseline justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600">
                More engagements
              </span>
              <a href="/work" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-electric hover:underline">
                View all →
              </a>
            </div>
            <div className="flex flex-col">
              {list.map((c, i) => (
                <a
                  key={c.id}
                  href={`/work/${c.slug}`}
                  className="relative isolate grid items-center cursor-pointer transition-colors group"
                  style={{
                    gridTemplateColumns: '64px 56px 1.4fr 2fr 1fr 1fr 28px',
                    gap: '20px',
                    padding: '26px 0',
                    borderTop: i === 0 ? '0' : '1px solid var(--color-paper-200)',
                    borderBottom: i === list.length - 1 ? '1px solid var(--color-paper-200)' : '0',
                  }}
                  data-work-row
                >
                  {/* Electric edge marker — draws in on hover */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-[2px] bg-electric origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-[var(--ease-out-quint)]"
                  />
                  <span className="font-mono text-xs text-mist-500 tracking-wider tabular pl-3">
                    [ {String(c.order ?? i + 2).padStart(2, '0')} ]
                  </span>
                  <span className="font-mono text-xs text-mist-500 tracking-wider tabular">
                    {c.publishedYear || '—'}
                  </span>
                  <span className="text-[22px] font-bold tracking-[-0.01em] group-hover:text-electric transition-colors">
                    {c.client}
                  </span>
                  <span className="text-[15px] text-mist-600 leading-[1.4]">{c.tagline}</span>
                  <span className="font-mono text-[11px] tracking-wider text-mist-600 uppercase">{c.meta}</span>
                  <span className="flex gap-1.5 flex-wrap">
                    {c.pills?.map((p) => (
                      <span key={p.pill} className="h-6 px-2.5 rounded-full inline-flex items-center font-mono text-[11px] font-medium uppercase tracking-wider bg-mist-400/30 text-ink">
                        {p.pill}
                      </span>
                    ))}
                  </span>
                  <span className="text-mist-500 group-hover:text-electric group-hover:translate-x-1 transition-[color,transform] text-right">→</span>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
