import { PHASE_COPY, RESULT_COPY } from '@/lib/opsscore/copy';
import type { Phase } from '@/lib/opsscore/scoring';
import { PhaseScene } from './PhaseScene';
import { SCENE_PANEL_GRID } from './scene-engine';

/**
 * The phase as a persona, in pieces the results and share pages lay out on a two-column grid: the title,
 * its illustration, the key sentence, and what the stage does well and what holds it back.
 */

type Props = { phase: Phase; className?: string };

export function PersonaTitle({ phase, className = '' }: Props) {
  const persona = PHASE_COPY[phase];
  return (
    <div className={className}>
      <p className="m-0 font-mono text-xs uppercase tracking-wider text-electric tabular">
        {RESULT_COPY.phaseOf(phase)} · {persona.data}
      </p>
      <h1 className="text-[clamp(36px,5vw,56px)] leading-[1.02] tracking-[-0.025em] font-bold mt-2 mb-0">{persona.title}</h1>
      <p className="mt-1 mb-0 text-[20px] sm:text-[24px] font-semibold tracking-[-0.01em] text-mist-600">{persona.nickname}</p>
    </div>
  );
}

export function PersonaScenePanel({ phase, className = '' }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-ink px-4 py-4 sm:px-6 sm:py-5 shadow-[0_30px_60px_-30px_rgba(8,9,10,0.65)] ${className}`}
      style={SCENE_PANEL_GRID}
    >
      <PhaseScene phase={phase} className="block w-full h-auto" />
    </div>
  );
}

export function PersonaKey({ phase, className = '' }: Props) {
  return (
    <p className={`m-0 text-[18px] leading-[1.55] text-mist-600 max-w-[520px] text-pretty ${className}`}>
      {PHASE_COPY[phase].key}
    </p>
  );
}

export function PersonaTraits({ phase, className = '' }: Props) {
  const persona = PHASE_COPY[phase];
  return (
    <dl className={`m-0 grid grid-cols-1 sm:grid-cols-2 gap-3 ${className}`}>
      <div className="rounded-lg border border-paper-200 bg-paper-50 px-4 py-3">
        <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-success">{RESULT_COPY.strengthLabel}</dt>
        <dd className="m-0 mt-1 text-[15px] leading-[1.5] text-ink text-pretty">{persona.strength}</dd>
      </div>
      <div className="rounded-lg border border-paper-200 bg-paper-50 px-4 py-3">
        <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-error">{RESULT_COPY.blockerLabel}</dt>
        <dd className="m-0 mt-1 text-[15px] leading-[1.5] text-ink text-pretty">{persona.blocker}</dd>
      </div>
    </dl>
  );
}
