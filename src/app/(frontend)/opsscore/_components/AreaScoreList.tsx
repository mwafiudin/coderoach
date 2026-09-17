import { BENCHMARK_COPY } from '@/lib/opsscore/copy';
import { AREAS } from '@/lib/opsscore/questions';
import type { AreaScores } from '@/lib/opsscore/scoring';
import { ScoreBar } from './ScoreBar';

/**
 * One row per scored area; stock is absent when the business holds no stock. With `benchmark`, each bar
 * gets a thin mark at the average of similar businesses, explained by `benchmarkLegend`.
 */
export function AreaScoreList({
  areas,
  benchmark,
  benchmarkLegend,
  className = '',
  animate = false,
}: {
  areas: AreaScores;
  benchmark?: AreaScores;
  benchmarkLegend?: string;
  className?: string;
  animate?: boolean;
}) {
  const scored = AREAS.filter(({ id }) => areas[id] !== undefined);
  const list = (
    // reveal-stagger holds the rows and their bar fills until the list scrolls into view.
    <ul className={`list-none p-0 m-0 flex flex-col gap-4 ${animate ? 'reveal-stagger' : ''} ${className}`}>
      {scored.map(({ id, label }, i) => (
        <li key={id}>
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[15px] font-medium">{label}</span>
            <span className="font-mono text-[13px] tabular">
              {areas[id]}
              {benchmark?.[id] !== undefined && (
                <span className="sr-only">
                  , {BENCHMARK_COPY.areaAverage} {benchmark[id]}
                </span>
              )}
            </span>
          </div>
          <div className="relative mt-2">
            <ScoreBar value={areas[id]!} animate={animate} index={i} />
            {benchmark?.[id] !== undefined && (
              <span
                aria-hidden
                className="absolute -top-1 -bottom-1 w-0.5 rounded-full bg-ink/70"
                style={{ left: `calc(${benchmark[id]}% - 1px)` }}
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
  if (!benchmarkLegend) return list;
  return (
    <>
      {list}
      <p className="mt-4 mb-0 flex items-center gap-2 text-[12px] text-mist-600">
        <span aria-hidden className="inline-block w-0.5 h-3 rounded-full bg-ink/70" />
        {benchmarkLegend}
      </p>
    </>
  );
}
