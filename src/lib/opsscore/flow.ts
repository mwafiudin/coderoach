/**
 * Quiz sequence. Pure, so the quiz component and tests share it.
 */
import { AREAS, QUESTIONS, type AreaId } from './questions';
import { isAreaSkipped, isSkipped, type Answers } from './scoring';

export type Step = { kind: 'question'; id: string; area: AreaId } | { kind: 'feedback'; area: AreaId };

export const stepKey = (step: Step) => (step.kind === 'question' ? `q:${step.id}` : `f:${step.area}`);

/** Each area's questions, then that area's mini-feedback. Branch answers remove steps. */
export function buildSteps(answers: Answers): Step[] {
  const steps: Step[] = [];
  for (const { id: area } of AREAS) {
    for (const q of QUESTIONS) {
      if (q.area === area && !isSkipped(q, answers)) steps.push({ kind: 'question', id: q.id, area });
    }
    if (!isAreaSkipped(area, answers)) steps.push({ kind: 'feedback', area });
  }
  return steps;
}

/** Areas in the progress bar; stock drops out when D0 = Tidak. */
export const progressAreas = (answers: Answers) => AREAS.filter((a) => !isAreaSkipped(a.id, answers));
