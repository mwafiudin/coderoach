/**
 * Quiz sequence. Pure, so the quiz component and tests share it.
 * The quiz groups the eight scoring areas into six sections; scoring and the report stay per area.
 */
import type { ProfileField } from './profile';
import { QUESTIONS, type AreaId } from './questions';
import { isAreaSkipped, isSkipped, type Answers } from './scoring';

export type SectionId = 'intro' | 'sales' | 'operations' | 'finance' | 'team' | 'digital';

type Section = {
  id: SectionId;
  label: string;
  /** Scoring areas asked in this section, in order. */
  areas: AreaId[];
  /** Profile questions that open the section, before its scored questions. */
  openers: ProfileField[];
};

export const SECTIONS: Section[] = [
  { id: 'intro', label: 'Intro', areas: [], openers: ['name', 'brand'] },
  { id: 'sales', label: 'Penjualan & prospek', areas: ['sales'], openers: ['industry'] },
  { id: 'operations', label: 'Operasional & stok', areas: ['ops', 'stock'], openers: [] },
  { id: 'finance', label: 'Keuangan & kas', areas: ['finance'], openers: ['revenue'] },
  { id: 'team', label: 'Tim & peran owner', areas: ['people', 'owner'], openers: ['employees'] },
  { id: 'digital', label: 'Digitalisasi & AI', areas: ['web', 'ai'], openers: [] },
];

export const SECTION_LABELS = Object.fromEntries(SECTIONS.map((s) => [s.id, s.label])) as Record<SectionId, string>;

export type Step =
  | { kind: 'profile'; field: ProfileField; section: SectionId }
  | { kind: 'question'; id: string; section: SectionId }
  | { kind: 'feedback'; section: SectionId; areas: AreaId[] };

export const stepKey = (step: Step) =>
  step.kind === 'profile' ? `p:${step.field}` : step.kind === 'question' ? `q:${step.id}` : `f:${step.section}`;

/**
 * Each section: its profile openers, its questions area by area, then one feedback screen with the
 * scores of its areas. Branch answers remove steps (D0 = Tidak drops D1, D2, and the stock score).
 */
export function buildSteps(answers: Answers): Step[] {
  const steps: Step[] = [];
  for (const section of SECTIONS) {
    for (const field of section.openers) steps.push({ kind: 'profile', field, section: section.id });
    for (const area of section.areas) {
      for (const q of QUESTIONS) {
        if (q.area === area && !isSkipped(q, answers)) steps.push({ kind: 'question', id: q.id, section: section.id });
      }
    }
    const scored = section.areas.filter((area) => !isAreaSkipped(area, answers));
    if (scored.length) steps.push({ kind: 'feedback', section: section.id, areas: scored });
  }
  return steps;
}

/** The section of the furthest saved answer, in quiz order (stock is asked before finance). */
export function lastAnsweredSection(answers: Answers): SectionId | null {
  const last = buildSteps(answers).findLast((step) => step.kind === 'question' && answers[step.id] !== undefined);
  return last?.section ?? null;
}

/** Sections in the progress bar. */
export const progressSections = (): Array<{ id: SectionId; label: string }> =>
  SECTIONS.map(({ id, label }) => ({ id, label }));

/**
 * True when moving from step `i` to the next closes a section — the moment to save silently.
 * Sections with scores close as their feedback screen opens; Intro has none, so it closes on leaving it.
 * The last step is not included: completing the quiz sends everything anyway.
 */
export function closesSection(steps: Step[], i: number) {
  const here = steps[i];
  const next = steps[i + 1];
  if (!here || !next) return false;
  return next.kind === 'feedback' || (here.kind !== 'feedback' && next.section !== here.section);
}
