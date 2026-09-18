import Image from 'next/image';
import { GATE_COPY, RESULT_COPY } from '@/lib/opsscore/copy';
import { Icon } from '@/lib/icons';
import { AREAS } from '@/lib/opsscore/questions';
import type { AreaScores, Phase } from '@/lib/opsscore/scoring';
import { PhaseLadder } from './PhaseLadder';

const PHASES: Phase[] = [1, 2, 3, 4];
// Fixed stand-in widths, so the blurred rows don't hint at the real scores.
const PLACEHOLDER_WIDTHS = [62, 38, 71, 45, 56, 30, 67, 49];

/**
 * Blurred score and an unmarked phase ladder, shown above the gate. A card on desktop; full width on
 * phones, where a padded card leaves the ladder too narrow for its labels.
 */
export function LockedScore({ brand, className = '' }: { brand?: string | null; className?: string }) {
  return (
    <div className={`lg:rounded-xl lg:border lg:border-paper-200 lg:bg-paper-50 lg:p-6 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600 min-w-0 truncate">
          {RESULT_COPY.scoreLabelFor(brand)}
        </p>
        <span className="shrink-0 inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-paper-100 border border-paper-200 font-mono text-[11px] uppercase tracking-wider text-mist-600">
          <Icon name="lock" size={13} />
          {GATE_COPY.locked}
        </span>
      </div>
      <p className="sr-only">{GATE_COPY.lockedScore}</p>
      <div className="mt-3 flex items-baseline gap-2 select-none" aria-hidden>
        <span className="text-[72px] sm:text-[88px] font-bold leading-[0.9] tracking-[-0.045em] tabular text-ink/70 blur-[10px]">
          00
        </span>
        <span className="text-[16px] text-mist-600 tabular">{RESULT_COPY.outOf}</span>
      </div>
      <p className="mt-5 mb-0 font-mono text-xs uppercase tracking-wider text-electric tabular">{GATE_COPY.phaseUnknown}</p>
      <PhaseLadder className="mt-3" />
      {/* The four characters, dimmed: one of them is the answer being held back. */}
      <ul className="list-none p-0 m-0 mt-4 grid grid-cols-4 gap-2 select-none" aria-hidden>
        {PHASES.map((phase) => (
          <li key={phase}>
            <Image
              src={`/assets/opsscore/phase-${phase}.webp`}
              alt=""
              width={1024}
              height={1024}
              sizes="140px"
              className="block w-full h-auto rounded-md bg-ink opacity-55 grayscale-[0.65]"
            />
          </li>
        ))}
      </ul>
      <p className="mt-3 mb-0 text-[13px] leading-[1.45] text-mist-600">{GATE_COPY.phaseTeaser}</p>
    </div>
  );
}

/** What the gate unlocks, then the area rows with their scores blurred. */
export function LockedDetails({ areas, className = '' }: { areas: AreaScores; className?: string }) {
  const scored = AREAS.filter(({ id }) => areas[id] !== undefined);
  return (
    <div className={className}>
      <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600">{GATE_COPY.unlockTitle}</p>
      <ul className="list-none p-0 m-0 mt-4 flex flex-col gap-2.5">
        {GATE_COPY.unlocks(scored.length).map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[15px] leading-[1.45] text-ink">
            <Icon name="lock" size={16} className="mt-0.5 shrink-0 text-mist-600" />
            {item}
          </li>
        ))}
      </ul>
      <ul className="list-none p-0 m-0 mt-8 flex flex-col gap-3.5 select-none" aria-hidden>
        {scored.map(({ id, label }, i) => (
          <li key={id}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[14px] font-medium text-mist-600">{label}</span>
              <span className="font-mono text-[13px] tabular text-ink blur-[4px]">00</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-paper-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-mist-500 blur-[3px]"
                style={{ width: `${PLACEHOLDER_WIDTHS[i % PLACEHOLDER_WIDTHS.length]}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
