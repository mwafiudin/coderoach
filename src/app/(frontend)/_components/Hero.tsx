type HeroData = {
  pillText?: string | null;
  headline?: { lead?: string | null; accent?: string | null } | null;
  lede?: string | null;
  ctaPrimary?: { label?: string | null; href?: string | null } | null;
  ctaSecondary?: { label?: string | null; href?: string | null } | null;
  metaItems?: Array<{ value?: string | null; label?: string | null }> | null;
  trustedBy?: { label?: string | null; tagline?: string | null } | null;
};

type Client = { name: string };

export function Hero({ data, clients }: { data: HeroData | null; clients: Client[] }) {
  return (
    <section id="top" className="relative pt-24 overflow-hidden">
      <div
        className="absolute inset-0 opacity-55 pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/bg-grid-clean.png)' }}
        data-hero-bg
      />
      <div className="relative z-[2] text-center max-w-[1180px] mx-auto px-8">
        {data?.pillText && (
          <span className="inline-flex items-center gap-2.5 px-4 py-2 bg-paper-50 border border-paper-200 rounded-full font-mono text-xs font-medium tracking-wide text-ink shadow-sm animate-hero-in opacity-0" style={{ animationDelay: '60ms' }}>
            <span className="w-[22px] h-[22px] rounded-full bg-ink" />
            {data.pillText}
          </span>
        )}
        {data?.headline && (
          <h1 className="text-[clamp(48px,6.4vw,84px)] leading-[1.02] tracking-[-0.03em] font-bold mt-7 max-w-[14ch] mx-auto text-balance animate-hero-in opacity-0" style={{ animationDelay: '160ms' }}>
            {data.headline.lead}{' '}
            <span className="text-electric block">{data.headline.accent}</span>
          </h1>
        )}
        {data?.lede && (
          <p className="mt-6 max-w-[580px] mx-auto text-[19px] leading-[1.5] text-mist-600 animate-hero-in opacity-0" style={{ animationDelay: '280ms' }}>
            {data.lede}
          </p>
        )}
        <div className="flex gap-3 justify-center mt-9 flex-wrap animate-hero-in opacity-0" style={{ animationDelay: '380ms' }}>
          {data?.ctaPrimary?.href && (
            <a href={data.ctaPrimary.href} className="h-[52px] px-[22px] rounded-md bg-electric text-paper text-[15px] font-semibold inline-flex items-center gap-2 hover:bg-[#2562E0] transition-colors" data-cta-magnetic>
              {data.ctaPrimary.label}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          )}
          {data?.ctaSecondary?.href && (
            <a href={data.ctaSecondary.href} className="h-[52px] px-[22px] rounded-md bg-transparent text-ink border border-mist-400 text-[15px] font-semibold inline-flex items-center hover:bg-ink/[0.04] transition-colors">
              {data.ctaSecondary.label}
            </a>
          )}
        </div>
        {data?.metaItems && data.metaItems.length > 0 && (
          <div className="flex gap-3.5 justify-center items-center mt-10 flex-wrap font-mono text-xs tracking-wide text-mist-600 uppercase tabular animate-hero-in opacity-0" style={{ animationDelay: '480ms' }}>
            {data.metaItems.map((item, i) => (
              <span key={i} className="contents">
                {i > 0 && <span className="text-mist-400">·</span>}
                <span><b className="text-ink font-bold">{item.value}</b> {item.label}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Trusted-by marquee */}
      {clients.length > 0 && (
        <div className="mt-20 pt-12 pb-14 border-t border-paper-200 bg-paper-50">
          <div className="max-w-[1180px] mx-auto px-8">
            <div className="flex items-baseline gap-3.5 flex-wrap mb-7 text-sm text-mist-600 leading-snug">
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink">
                {data?.trustedBy?.label || '// TRUSTED BY 40+ OPERATORS'}
              </span>
              <p className="m-0">{data?.trustedBy?.tagline}</p>
            </div>
            <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)]">
              {[0, 1].map((track) => (
                <div key={track} className="flex items-center gap-[72px] flex-shrink-0 pr-[72px] animate-marquee" aria-hidden={track === 1}>
                  {clients.map((c, i) => (
                    <div key={`${track}-${i}`} className="flex-shrink-0 font-sans font-bold text-[32px] tracking-[-0.02em] text-mist-500 hover:text-ink transition-colors whitespace-nowrap">
                      {c.name}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
