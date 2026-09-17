import { AREAS } from '@/lib/opsscore/questions';
import type { AreaScores } from '@/lib/opsscore/scoring';
import { ScoreBar } from './ScoreBar';

/** One row per scored area; stock is absent when the business holds no stock. */
export function AreaScoreList({
  areas,
  className = '',
  animate = false,
}: {
  areas: AreaScores;
  className?: string;
  animate?: boolean;
}) {
  const scored = AREAS.filter(({ id }) => areas[id] !== undefined);
  return (
    // reveal-stagger holds the rows and their bar fills until the list scrolls into view.
    <ul className={`list-none p-0 m-0 flex flex-col gap-4 ${animate ? 'reveal-stagger' : ''} ${className}`}>
      {scored.map(({ id, label }, i) => (
        <li key={id}>
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[15px] font-medium">{label}</span>
            <span className="font-mono text-[13px] tabular">{areas[id]}</span>
          </div>
          <ScoreBar value={areas[id]!} className="mt-2" animate={animate} index={i} />
        </li>
      ))}
    </ul>
  );
}
