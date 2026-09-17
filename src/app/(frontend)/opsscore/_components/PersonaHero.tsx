import { PHASE_COPY, RESULT_COPY } from '@/lib/opsscore/copy';
import type { Phase } from '@/lib/opsscore/scoring';
import { PhaseScene } from './PhaseScene';
import { SCENE_PANEL_GRID } from './scene-engine';

/** The phase as a persona: name and nickname, its illustration, then what it does well and what holds it back. */
export function PersonaHero({ phase, className = '' }: { phase: Phase; className?: string }) {
  const persona = PHASE_COPY[phase];
  return (
    <div className={className}>
      <p className="m-0 font-mono text-xs uppercase tracking-wider text-electric tabular">
        {RESULT_COPY.phaseOf(phase)} · {persona.data}
      </p>
      <h1 className="text-[clamp(36px,5vw,56px)] leading-[1.02] tracking-[-0.025em] font-bold mt-2 mb-0">{persona.title}</h1>
      <p className="mt-1 mb-0 text-[20px] sm:text-[24px] font-semibold tracking-[-0.01em] text-mist-600">{persona.nickname}</p>
      <div
        className="mt-6 max-w-[520px] overflow-hidden rounded-2xl bg-ink px-4 py-4 sm:px-6 sm:py-5 shadow-[0_30px_60px_-30px_rgba(8,9,10,0.65)]"
        style={SCENE_PANEL_GRID}
      >
        <PhaseScene phase={phase} className="block w-full h-auto" />
      </div>
      <p className="mt-6 mb-0 text-[18px] leading-[1.55] text-mist-600 max-w-[520px] text-pretty">{persona.key}</p>
      <dl className="mt-5 mb-0 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[520px]">
        <div className="rounded-lg border border-paper-200 bg-paper-50 px-4 py-3">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-success">{RESULT_COPY.strengthLabel}</dt>
          <dd className="m-0 mt-1 text-[15px] leading-[1.5] text-ink text-pretty">{persona.strength}</dd>
        </div>
        <div className="rounded-lg border border-paper-200 bg-paper-50 px-4 py-3">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-error">{RESULT_COPY.blockerLabel}</dt>
          <dd className="m-0 mt-1 text-[15px] leading-[1.5] text-ink text-pretty">{persona.blocker}</dd>
        </div>
      </dl>
    </div>
  );
}
