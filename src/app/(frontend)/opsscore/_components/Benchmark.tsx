import { gapTo, type Benchmark } from '@/lib/opsscore/benchmark';
import { BENCHMARK_COPY, BENCHMARK_SOURCES, INDUSTRY_FACTS } from '@/lib/opsscore/copy';
import { INDUSTRY_OPTIONS } from '@/lib/opsscore/questions';

/** "usaha Fashion", or a wider group for businesses that picked Lainnya. */
export function benchmarkGroup(benchmark: Benchmark) {
  if (benchmark.industry !== 'lainnya') {
    return `usaha ${INDUSTRY_OPTIONS.find((option) => option.id === benchmark.industry)?.label ?? ''}`.trim();
  }
  return benchmark.source === 'estimate' ? BENCHMARK_COPY.nationalGroup : BENCHMARK_COPY.otherGroup;
}

/** The visitor's total next to the average of similar businesses, on one 0–100 scale. */
export function BenchmarkCompare({
  total,
  benchmark,
  className = '',
}: {
  total: number;
  benchmark: Benchmark;
  className?: string;
}) {
  const group = benchmarkGroup(benchmark);
  return (
    <div className={`rounded-xl border border-paper-200 bg-paper-50 p-5 sm:p-6 ${className}`}>
      <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600">{BENCHMARK_COPY.marker}</p>
      {/* Bottom-aligned, so both numbers sit on one line when the average label wraps. */}
      <dl className="mt-4 mb-0 grid grid-cols-2 items-end gap-4">
        <div className="min-w-0">
          <dt className="text-[12px] leading-snug text-mist-600">{BENCHMARK_COPY.you}</dt>
          <dd className="m-0 mt-1 text-[32px] font-bold leading-none tracking-[-0.03em] tabular text-electric">{total}</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-[12px] leading-snug text-mist-600">
            {BENCHMARK_COPY.average(group, benchmark.source, benchmark.count)}
          </dt>
          <dd className="m-0 mt-1 text-[32px] font-bold leading-none tracking-[-0.03em] tabular">{benchmark.total}</dd>
        </div>
      </dl>
      <div className="relative mt-5 h-2 rounded-full bg-paper-200" aria-hidden>
        <span
          className="absolute -top-1 -bottom-1 w-0.5 rounded-full bg-ink/70"
          style={{ left: `calc(${benchmark.total}% - 1px)` }}
        />
        <span
          className="absolute top-1/2 w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric ring-2 ring-paper-50"
          style={{ left: `${total}%` }}
        />
      </div>
      <p className="mt-4 mb-0 text-[15px] font-semibold text-ink">{BENCHMARK_COPY.gap(gapTo(total, benchmark))}</p>
      <p className="mt-2 mb-0 text-[14px] leading-[1.5] text-mist-600 text-pretty">{INDUSTRY_FACTS[benchmark.industry]}</p>
      <p className="mt-3 mb-0 text-[12px] leading-[1.5] text-mist-600">
        {benchmark.source === 'estimate' ? BENCHMARK_COPY.estimateNote : BENCHMARK_COPY.sessionsNote(benchmark.count)}{' '}
        <a href="#sumber" className="text-ink underline underline-offset-2 hover:text-electric">
          {BENCHMARK_COPY.sourcesLink}
        </a>
      </p>
    </div>
  );
}

/** How the benchmark is built and where its numbers come from; the target of "Lihat sumber". */
export function BenchmarkSources() {
  return (
    <section id="sumber" className="pb-16 lg:pb-24 scroll-mt-24">
      <div className="max-w-[1180px] mx-auto px-8">
        <div className="border-t border-paper-200 pt-8 max-w-[760px]">
          <h2 className="m-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600">
            {BENCHMARK_COPY.sourcesTitle}
          </h2>
          <p className="mt-3 mb-0 text-[14px] leading-[1.55] text-mist-600 text-pretty">{BENCHMARK_COPY.method}</p>
          <ul className="list-none p-0 m-0 mt-4 flex flex-col gap-2">
            {BENCHMARK_SOURCES.map((source) => (
              <li key={source.url} className="text-[14px] leading-[1.5]">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline underline-offset-2 hover:text-electric"
                >
                  {source.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
