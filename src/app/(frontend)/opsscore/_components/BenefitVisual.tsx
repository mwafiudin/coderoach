/**
 * Small diagrams for the landing benefit list. Static SVG, drawn at 320x36 so they can sit at
 * roughly 1:1 inside the card and stay legible. Each one previews a piece of the report: the phase
 * ladder, the area scores, the industry benchmark, and the priority steps.
 */
import type { LANDING_COPY } from '@/lib/opsscore/copy';

export type BenefitVisualKind = (typeof LANDING_COPY.get)[number]['visual'];

const PHASE_SEGMENTS = [0, 82, 164, 246];
const AREA_BARS = [20, 10, 28, 15, 24, 8, 18, 12];
const AREA_LOW = new Set([1, 5, 7]);
const STEP_WIDTHS = [292, 250, 210];

/** Four phases, with the octagon asking which one is yours. */
function PhaseLadder() {
  return (
    <>
      {PHASE_SEGMENTS.map((x) => (
        <rect key={x} x={x} y="14" width="74" height="10" rx="5" className="fill-ink/10" />
      ))}
      <g transform="translate(191 9)">
        <polygon
          points="5.8,0 14.2,0 20,5.8 20,14.2 14.2,20 5.8,20 0,14.2 0,5.8"
          className="fill-electric"
        />
        <text x="10" y="14.5" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-paper font-mono">
          ?
        </text>
      </g>
    </>
  );
}

/** Eight area scores, with the three weakest picked out. */
function AreaBars() {
  return (
    <>
      {AREA_BARS.map((height, i) => (
        <rect
          key={i}
          x={i * 42}
          y={32 - height}
          width="26"
          height={height}
          rx="2"
          className={AREA_LOW.has(i) ? 'fill-electric' : 'fill-ink/15'}
        />
      ))}
      <rect x="0" y="34" width="320" height="1" className="fill-ink/15" />
    </>
  );
}

/** Your score against the average of the same industry. */
function BenchmarkTrack() {
  return (
    <>
      <rect x="0" y="8" width="320" height="10" rx="5" className="fill-ink/10" />
      <rect x="0" y="8" width="214" height="10" rx="5" className="fill-electric" />
      <rect x="150" y="3" width="2" height="20" className="fill-ink" />
      <text x="150" y="33" textAnchor="middle" fontSize="10" className="fill-mist-600 font-mono">
        rata-rata
      </text>
      <text x="214" y="33" textAnchor="middle" fontSize="10" fontWeight="700" className="fill-ink font-mono">
        Anda
      </text>
    </>
  );
}

/** Three priorities, first one ready to start. */
function PriorityRows() {
  return (
    <>
      {STEP_WIDTHS.map((width, i) => (
        <g key={i} transform={`translate(0 ${i * 12 + 2})`}>
          <rect x="0" y="0" width="8" height="8" rx="2" className={i === 0 ? 'fill-electric' : 'fill-ink/15'} />
          <rect x="18" y="1" width={width} height="6" rx="3" className="fill-ink/10" />
        </g>
      ))}
    </>
  );
}

const VISUALS: Record<BenefitVisualKind, () => React.ReactElement> = {
  phase: PhaseLadder,
  areas: AreaBars,
  benchmark: BenchmarkTrack,
  steps: PriorityRows,
};

export function BenefitVisual({ kind, className = '' }: { kind: BenefitVisualKind; className?: string }) {
  const Shape = VISUALS[kind];
  return (
    <svg viewBox="0 0 320 36" className={`block w-full h-auto ${className}`} aria-hidden>
      <Shape />
    </svg>
  );
}
