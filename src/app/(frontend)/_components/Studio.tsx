import { Icon, type IconName } from '@/lib/icons';

type StudioData = {
  sectionMarker?: string | null;
  heading?: string | null;
  lede?: string | null;
  stats?: Array<{ num: string; accent?: string | null; label: string }> | null;
};

type Tenet = {
  id: string | number;
  order: number;
  icon: IconName;
  title: string;
  description: string;
};

export function Studio({ data, tenets }: { data: StudioData | null; tenets: Tenet[] }) {
  return (
    <section
      id="studio"
      data-theme="dark"
      className="py-[120px] bg-ink text-paper border-y border-shadow-700 relative"
    >
      <div className="max-w-[1180px] mx-auto px-8">
        <div className="reveal-stagger">
          <span className="font-mono text-xs font-medium tracking-wider uppercase inline-flex items-center gap-2 flex-wrap text-mist-500 tabular">
            [ 05 / 06 ] <span className="text-mist-400">·</span> Studio <span className="text-mist-400">//</span>{' '}
            <span className="text-electric">{data?.sectionMarker}</span>
          </span>
          <h2 className="text-[clamp(40px,5vw,64px)] leading-none tracking-[-0.02em] font-bold mt-[18px] max-w-[880px] text-paper">
            {data?.heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-20 mt-14 items-start">
          <div className="flex flex-col gap-10">
            <p className="text-[20px] leading-[1.55] text-mist-500 m-0 max-w-[56ch] text-pretty">
              {data?.lede}
            </p>
            {data?.stats && data.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-x-12 gap-y-9 pt-8 border-t border-shadow-700">
                {data.stats.map((s, i) => (
                  <div key={i} className="flex flex-col gap-2.5">
                    <div className="text-[56px] font-bold leading-none tracking-[-0.025em] text-paper tabular">
                      {s.num}
                      {s.accent && <span className="text-electric font-bold">{s.accent}</span>}
                    </div>
                    <div className="font-mono text-[11px] font-medium uppercase tracking-wider text-mist-500 leading-[1.5] whitespace-pre-line">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-9 max-lg:border-t max-lg:border-shadow-700 max-lg:pt-9 lg:border-l lg:border-shadow-700 lg:pl-12">
            {tenets.map((t, i) => (
              <div key={t.id} className="flex flex-col gap-2.5">
                <div className="flex items-center gap-3">
                  <span className="text-mist-400 group-hover:text-electric transition-colors">
                    <Icon name={t.icon} size={20} />
                  </span>
                  <span className="font-mono text-[11px] font-medium tracking-wider text-electric tabular">
                    [ {String(i + 1).padStart(2, '0')} ]
                  </span>
                </div>
                <h4 className="text-[22px] font-bold tracking-[-0.015em] m-0 text-paper leading-tight">
                  {t.title}
                </h4>
                <p className="text-[15px] leading-[1.55] text-mist-500 m-0 max-w-[48ch]">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
