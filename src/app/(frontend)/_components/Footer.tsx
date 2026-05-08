type FooterData = {
  footer?: {
    tagline?: string | null;
    badge?: string | null;
    columns?: Array<{
      heading: string;
      links: Array<{ label: string; href: string }>;
    }> | null;
    metaLine?: { left?: string | null; right?: string | null } | null;
  } | null;
};

export function Footer({ data }: { data: FooterData | null }) {
  return (
    <footer className="bg-ink text-paper py-14 pb-7">
      <div className="max-w-[1180px] mx-auto px-8">
        <div className="font-mono text-[11px] text-mist-600 tracking-[0.4em] whitespace-nowrap overflow-hidden mb-10">
          · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · ·
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          <div>
            <div className="flex items-center gap-3 mb-[18px]">
              <img src="/assets/coderoach_logo.svg" alt="" className="h-9 w-auto invert-[0.96]" />
              <span className="flex flex-col leading-none tracking-[-0.02em] gap-[3px] text-paper">
                <span className="font-sans text-base font-bold">coderoach</span>
                <span className="font-sans text-base font-bold">studio</span>
              </span>
            </div>
            {data?.footer?.tagline && (
              <p className="text-[13px] text-mist-500 leading-[1.5] max-w-[280px] m-0 mb-4">
                {data.footer.tagline}
              </p>
            )}
            {data?.footer?.badge && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-shadow-700 rounded-full font-mono text-[11px] text-mist-500 tracking-wide tabular">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" />
                {data.footer.badge}
              </span>
            )}
          </div>
          {data?.footer?.columns?.map((col, i) => (
            <div key={i}>
              <h5 className="font-mono text-[11px] tracking-wider uppercase text-mist-500 font-medium m-0 mb-3.5">
                // {col.heading}
              </h5>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {col.links.map((l, j) => (
                  <li key={j}>
                    <a href={l.href} className="text-sm text-paper hover:text-electric transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {data?.footer?.metaLine && (data.footer.metaLine.left || data.footer.metaLine.right) && (
          <div className="mt-14 pt-6 border-t border-shadow-700 flex justify-between flex-wrap gap-4 font-mono text-[11px] text-mist-500 tracking-wide tabular">
            <span>{data.footer.metaLine.left}</span>
            <span>{data.footer.metaLine.right}</span>
          </div>
        )}
      </div>
    </footer>
  );
}
