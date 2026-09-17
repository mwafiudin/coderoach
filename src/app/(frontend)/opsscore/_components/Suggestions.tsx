import { ACTIONS, AREA_NOUNS, PHASE_COPY, PLAN_COPY, QUICK_WINS, ROADMAP } from '@/lib/opsscore/copy';
import { nextPhasePlan, quickWinAreas, roadmapAreas } from '@/lib/opsscore/plan';
import { AREA_LABELS } from '@/lib/opsscore/questions';
import type { Answers, Scores } from '@/lib/opsscore/scoring';

const MARKER = 'font-mono text-xs font-medium tracking-wider text-mist-600 uppercase tabular';
const HEADING = 'text-[clamp(26px,3vw,36px)] leading-[1.1] tracking-[-0.02em] font-bold mt-3 mb-0';

/** What to do next, after the priorities: steps to the next phase, this week's quick wins, a 90-day plan. */
export function Suggestions({ answers, scores }: { answers: Answers; scores: Scores }) {
  const plan = nextPhasePlan(answers);
  const quickWins = quickWinAreas(scores.areas);
  const [first = PLAN_COPY.fallbackNoun, second = first] = roadmapAreas(scores.areas, scores.priorities).map(
    (area) => AREA_NOUNS[area],
  );

  return (
    <>
      {plan && plan.steps.length > 0 && (
        <div className="mt-16">
          <span className={MARKER}>[ {PLAN_COPY.nextMarker} ]</span>
          <h3 className={HEADING}>{PLAN_COPY.nextTitle(PHASE_COPY[plan.target].title)}</h3>
          <p className="mt-3 mb-0 text-[17px] leading-[1.55] text-mist-600 max-w-[680px] text-pretty">
            {PLAN_COPY.nextSummary(plan.steps.length, plan.from, plan.to, PHASE_COPY[plan.target].title, plan.reached)}
          </p>
          <ol className="reveal-stagger list-none p-0 m-0 mt-6 grid grid-cols-1 gap-3 max-w-[860px]">
            {plan.steps.map((step, i) => (
              <li key={step.question} className="rounded-xl border border-paper-200 bg-paper-50 p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="m-0 min-w-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600">
                    <span className="font-mono tracking-normal tabular">[ {String(i + 1).padStart(2, '0')} ]</span> {AREA_LABELS[step.area]}
                  </p>
                  <span className="shrink-0 font-mono text-[13px] font-semibold text-electric tabular">{PLAN_COPY.points(step.gain)}</span>
                </div>
                <p className="m-0 mt-2 text-[15px] leading-[1.55] text-ink text-pretty">{ACTIONS[step.question]}</p>
              </li>
            ))}
          </ol>
          <p className="mt-3 mb-0 text-[12px] leading-[1.5] text-mist-600">{PLAN_COPY.nextNote}</p>
        </div>
      )}

      {quickWins.length > 0 && (
        <div className="mt-16">
          <span className={MARKER}>[ {PLAN_COPY.quickMarker} ]</span>
          <h3 className={HEADING}>{PLAN_COPY.quickTitle}</h3>
          <ul className="reveal-stagger list-none p-0 m-0 mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickWins.map((area) => {
              const win = QUICK_WINS[area];
              return (
                <li key={area} className="rounded-xl border border-paper-200 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600">{AREA_LABELS[area]}</span>
                    <span className="flex gap-1.5">
                      <Tag>{PLAN_COPY.effort[win.effort]}</Tag>
                      <Tag>{PLAN_COPY.cost[win.cost]}</Tag>
                    </span>
                  </div>
                  <p className="m-0 mt-2 text-[15px] leading-[1.55] text-ink text-pretty">{win.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="mt-16">
        <span className={MARKER}>[ {PLAN_COPY.roadmapMarker} ]</span>
        <h3 className={HEADING}>{PLAN_COPY.roadmapTitle}</h3>
        <ol className="reveal-stagger list-none p-0 m-0 mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          {ROADMAP[scores.phase].map((step) => (
            <li key={step.days} className="rounded-xl bg-ink text-paper p-5 sm:p-6">
              <span className="font-mono text-[12px] tracking-wider text-electric tabular">{PLAN_COPY.days(step.days)}</span>
              <h4 className="m-0 mt-2 text-[18px] font-bold tracking-[-0.01em]">{step.title}</h4>
              <p className="m-0 mt-2 text-[14px] leading-[1.55] text-paper/80 text-pretty">{step.body(first, second)}</p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-6 items-center rounded-full border border-paper-200 bg-paper-100 px-2 text-[11px] font-medium text-mist-600">
      {children}
    </span>
  );
}
