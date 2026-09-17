/**
 * Quiz sequence. Pure, so the quiz component and tests share it.
 */
import type { ProfileField } from './profile';
import { AREAS, AREA_LABELS, QUESTIONS, type AreaId } from './questions';
import { isAreaSkipped, isSkipped, type Answers } from './scoring';

export type SectionId = 'kenalan' | AreaId;

export type Step =
  | { kind: 'profile'; field: ProfileField; section: SectionId }
  | { kind: 'question'; id: string; section: AreaId }
  | { kind: 'feedback'; section: AreaId };

export const stepKey = (step: Step) =>
  step.kind === 'profile' ? `p:${step.field}` : step.kind === 'question' ? `q:${step.id}` : `f:${step.section}`;

/** Profile questions that open a section, before its scored questions. */
const SECTION_OPENERS: Partial<Record<SectionId, ProfileField[]>> = {
  kenalan: ['name', 'brand'],
  sales: ['industry'],
  finance: ['revenue'],
  people: ['employees'],
};

export const SECTION_LABELS: Record<SectionId, string> = { kenalan: 'Kenalan', ...AREA_LABELS };

/**
 * Kenalan (name, business name), then each area: its profile opener, its questions, its feedback.
 * Branch answers remove steps (D0 = Tidak drops D1, D2, and the stock feedback).
 */
export function buildSteps(answers: Answers): Step[] {
  const steps: Step[] = (SECTION_OPENERS.kenalan ?? []).map((field) => ({
    kind: 'profile' as const,
    field,
    section: 'kenalan' as const,
  }));
  for (const { id: area } of AREAS) {
    for (const field of SECTION_OPENERS[area] ?? []) steps.push({ kind: 'profile', field, section: area });
    for (const q of QUESTIONS) {
      if (q.area === area && !isSkipped(q, answers)) steps.push({ kind: 'question', id: q.id, section: area });
    }
    if (!isAreaSkipped(area, answers)) steps.push({ kind: 'feedback', section: area });
  }
  return steps;
}

/** Sections in the progress bar; stock drops out when D0 = Tidak. */
export const progressSections = (answers: Answers): Array<{ id: SectionId; label: string }> => [
  { id: 'kenalan', label: SECTION_LABELS.kenalan },
  ...AREAS.filter((a) => !isAreaSkipped(a.id, answers)),
];

/**
 * True when moving from step `i` to the next closes a section — the moment to save silently.
 * Areas close as their feedback screen opens; Kenalan has no feedback, so it closes on leaving it.
 * The last step is not included: completing the quiz sends everything anyway.
 */
export function closesSection(steps: Step[], i: number) {
  const here = steps[i];
  const next = steps[i + 1];
  if (!here || !next) return false;
  return next.kind === 'feedback' || (here.kind !== 'feedback' && next.section !== here.section);
}
