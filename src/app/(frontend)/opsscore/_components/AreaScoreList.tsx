import { AREAS } from '@/lib/opsscore/questions';
import type { AreaScores } from '@/lib/opsscore/scoring';
import { ScoreBar } from './ScoreBar';

/** One row per scored area; stock is absent when the business holds no stock. */
export function AreaScoreList({ areas, className = '' }: { areas: AreaScores; className?: string }) {
  return (
    <ul className={`list-none p-0 m-0 flex flex-col gap-4 ${className}`}>
      {AREAS.map(({ id, label }) => {
        const score = areas[id];
        if (score === undefined) return null;
        return (
          <li key={id}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[15px] font-medium">{label}</span>
              <span className="font-mono text-[13px] tabular">{score}</span>
            </div>
            <ScoreBar value={score} className="mt-2" />
          </li>
        );
      })}
    </ul>
  );
}
