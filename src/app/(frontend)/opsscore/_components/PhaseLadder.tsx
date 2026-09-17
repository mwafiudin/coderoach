import { PHASE_COPY } from '@/lib/opsscore/copy';
import { phaseRange, type Phase } from '@/lib/opsscore/scoring';

const PHASES: Phase[] = [1, 2, 3, 4];

/** Four phases with a marker on the current one; `animate` slides the marker there from phase 1. */
export function PhaseLadder({
  phase,
  className = '',
  animate = false,
}: {
  phase?: Phase;
  className?: string;
  animate?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      <ol className="list-none p-0 m-0 grid grid-cols-4 gap-2">
        {PHASES.map((p) => {
          const { from, to } = phaseRange(p);
          const current = p === phase;
          return (
            <li
              key={p}
              aria-current={current ? 'step' : undefined}
              className={`pt-2.5 border-t-2 min-w-0 ${phase && p < phase ? 'border-ink' : 'border-paper-200'}`}
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
      {phase && (
        <span
          aria-hidden
          className={`absolute left-0 top-0 h-0.5 bg-electric ${animate ? 'ops-ladder-marker' : ''}`}
          style={{
            width: 'calc((100% - 1.5rem) / 4)',
            transform: `translateX(calc(${phase - 1} * (100% + 0.5rem)))`,
          }}
        />
      )}
    </div>
  );
}
