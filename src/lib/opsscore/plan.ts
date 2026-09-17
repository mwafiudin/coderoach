/**
 * Report suggestions built on the scoring rules (brief §6): the fewest answer changes that reach the
 * next phase, the week's quick wins, and the areas a 30-60-90 day plan names.
 */
import { AREAS, QUESTIONS, type AreaId, type Question } from './questions';
import {
  PHASE_THRESHOLDS,
  TIDY_FROM,
  areaScores,
  isSkipped,
  phaseFor,
  sanitizeAnswers,
  totalScore,
  type Answers,
  type AreaScores,
  type Phase,
  type Priority,
} from './scoring';

export type PlanStep = { question: string; area: AreaId; gain: number };
export type PhasePlan = { from: number; to: number; target: Phase; reached: boolean; steps: PlanStep[] };

const MAX_STEPS = 3;

/**
 * One realistic step up from the current answer. On the standard scale, data kept in the head or in
 * chat moves straight to a spreadsheet, since moving it from the head into chat is no real progress.
 */
function stepUp(q: Question, answers: Answers): string | null {
  const index = q.options.findIndex((option) => option.id === answers[q.id]);
  if (index < 0) return null;
  const next = q.type === 'scale' ? Math.max(index + 1, 2) : index + 1;
  return next < q.options.length ? q.options[next].id : null;
}

/**
 * Greedy: repeatedly take the single step up that raises the total the most, until the next phase is
 * reached or MAX_STEPS are used. Null in the last phase.
 */
export function nextPhasePlan(input: Answers): PhasePlan | null {
  let answers = sanitizeAnswers(input);
  const from = totalScore(areaScores(answers));
  const phase = phaseFor(from);
  if (phase === 4) return null;
  const target = (phase + 1) as Phase;
  const threshold = PHASE_THRESHOLDS.find((t) => t.phase === target)!.from;

  const steps: PlanStep[] = [];
  let total = from;
  while (total < threshold && steps.length < MAX_STEPS) {
    let best: { question: Question; answer: string; total: number } | null = null;
    for (const q of QUESTIONS) {
      if (!q.scored || (q.type !== 'scale' && q.type !== 'single') || isSkipped(q, answers)) continue;
      if (steps.some((step) => step.question === q.id)) continue;
      const answer = stepUp(q, answers);
      if (!answer) continue;
      const next = totalScore(areaScores({ ...answers, [q.id]: answer }));
      if (!best || next > best.total) best = { question: q, answer, total: next };
    }
    if (!best || best.total <= total) break;
    steps.push({ question: best.question.id, area: best.question.area, gain: best.total - total });
    answers = { ...answers, [best.question.id]: best.answer };
    total = best.total;
  }
  return { from, to: total, target, reached: total >= threshold, steps };
}

/** Areas worth a quick win this week: not yet tidy, weakest first. */
export function quickWinAreas(areas: AreaScores, limit = 4): AreaId[] {
  return AREAS.map(({ id }) => id)
    .filter((id) => areas[id] !== undefined && areas[id]! < TIDY_FROM)
    .sort((a, b) => areas[a]! - areas[b]!)
    .slice(0, limit);
}

/** The two areas the 30-60-90 day plan names: the report's priorities first, then the weakest areas. */
export function roadmapAreas(areas: AreaScores, priorities: Priority[]): AreaId[] {
  const picked = priorities.map((priority) => priority.area);
  for (const id of quickWinAreas(areas, AREAS.length)) if (!picked.includes(id)) picked.push(id);
  return picked.slice(0, 2);
}
