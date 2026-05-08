import { SectionHead } from './SectionHead';

type Case = {
  id: string | number;
  idx: string;
  client: string;
  description: string;
  meta: string;
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
    caseStudyHref?: string | null;
  } | null;
};

export function Work({ cases }: { cases: Case[] }) {
  const featured = cases.find((c) => c.featured);
  const list = cases.filter((c) => !c.featured);

  return (
    <section id="work" className="py-[120px] relative">
      <div className="max-w-[1180px] mx-auto px-8">
        <SectionHead
          marker="[ 02 / 06 ]"
          category="Work"
          description="Selected case studies"
          heading="What we've shipped."
          lede="Representative engagements from the last 18 months. Full case studies on request."
        />

        {featured?.featuredDetails && (
          <div className="relative mt-12 bg-ink text-paper rounded-2xl p-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 items-center overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_24px_-12px_rgba(8,9,10,0.4)]" data-spotlight>
            <div
              aria-hidden
              className="absolute inset-0 bg-cover opacity-[0.18] pointer-events-none"
              style={{ backgroundImage: 'url(/assets/texture-halftone-corner.png)', backgroundPosition: 'right center' }}
            />
            <div className="relative z-[1]">
              <div className="flex gap-2 flex-wrap mb-4">
                {featured.featuredDetails.badgeLabel && (
                  <span className="h-6 px-2.5 rounded-full inline-flex items-center font-mono text-[11px] font-medium uppercase tracking-wider bg-paper/[0.08] text-paper">
                    {featured.featuredDetails.badgeLabel}
                  </span>
                )}
                {featured.featuredDetails.shippedLabel && (
                  <span className="h-6 px-2.5 rounded-full inline-flex items-center font-mono text-[11px] font-medium uppercase tracking-wider bg-success/[0.18] text-[#5DD79A]">
                    {featured.featuredDetails.shippedLabel}
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
              {featured.featuredDetails.caseStudyHref && (
                <a
                  href={featured.featuredDetails.caseStudyHref}
                  className="h-11 px-[18px] rounded-md bg-paper text-ink text-sm font-semibold inline-flex items-center gap-2 hover:bg-mist-400 transition-colors"
                >
                  Read the case study →
                </a>
              )}
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
            <div className="mt-14 mb-[18px] pb-3.5 border-b border-paper-200">
              <span className="font-mono text-xs uppercase tracking-wider text-mist-600 tabular">
                // MORE ENGAGEMENTS
              </span>
            </div>
            <div className="flex flex-col">
              {list.map((c, i) => (
                <a
                  key={c.id}
                  href="#"
                  className="relative isolate grid items-center cursor-pointer transition-colors group"
                  style={{
                    gridTemplateColumns: '64px 1.4fr 2fr 1fr 1fr 28px',
                    gap: '24px',
                    padding: '26px 0',
                    borderTop: i === 0 ? '0' : '1px solid var(--color-paper-200)',
                    borderBottom: i === list.length - 1 ? '1px solid var(--color-paper-200)' : '0',
                  }}
                  data-work-row
                >
                  <span className="font-mono text-xs text-mist-500 tracking-wider tabular">[ {c.idx} ]</span>
                  <span className="text-[22px] font-bold tracking-[-0.01em]">{c.client}</span>
                  <span className="text-[15px] text-mist-600 leading-[1.4]">{c.description}</span>
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
