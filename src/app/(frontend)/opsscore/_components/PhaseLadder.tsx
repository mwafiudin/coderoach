import { PHASE_COPY } from '@/lib/opsscore/copy';
import { phaseRange, type Phase } from '@/lib/opsscore/scoring';

const PHASES: Phase[] = [1, 2, 3, 4];

export function PhaseLadder({ phase, className = '' }: { phase?: Phase; className?: string }) {
  return (
    <ol className={`list-none p-0 m-0 grid grid-cols-4 gap-2 ${className}`}>
      {PHASES.map((p) => {
        const { from, to } = phaseRange(p);
        const current = p === phase;
        return (
          <li
            key={p}
            aria-current={current ? 'step' : undefined}
            className={`pt-2.5 border-t-2 min-w-0 ${
              current ? 'border-electric' : phase && p < phase ? 'border-ink' : 'border-paper-200'
            }`}
          >
            <span className="block font-mono text-[10px] tabular text-mist-600">
              {from}–{to}
            </span>
            <span
              className={`block mt-1 text-[11px] sm:text-[13px] leading-tight break-words ${
                current ? 'font-semibold text-ink' : 'text-mist-600'
              }`}
            >
              {PHASE_COPY[p].name}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
