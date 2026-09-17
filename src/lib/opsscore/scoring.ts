/**
 * OpsScore scoring — deterministic and pure, so the server (final result) and the quiz
 * (mini-feedback per area) share it. All weights and thresholds live in this file.
 * Rules: docs/opsscore-brief.md §5. Changing a constant here means bumping INSTRUMENT_VERSION.
 */
import { INSTRUMENT_VERSION } from './config';
import { AREAS, QUESTIONS, QUESTION_BY_ID, type AreaId, type Question } from './questions';

export type Answers = Record<string, string | string[]>;
export type AreaScores = Partial<Record<AreaId, number>>;
export type Phase = 1 | 2 | 3 | 4;
export type Band = 'low' | 'mid' | 'high';
export type ServiceClass = 'SYS-TOOL' | 'SYS-DIV' | 'SYS-OS' | 'WEB' | 'READY';

export type Priority = {
  area: AreaId;
  score: number;
  priority: number;
  /** Lowest-scoring question in the area; picks the concrete action sentence in copy.ts. */
  focusQuestion: string;
};

export type Scores = {
  instrumentVersion: number;
  /** 0–100 per area. `stock` is absent when D0 = Tidak. */
  areas: AreaScores;
  total: number;
  phase: Phase;
  priorities: Priority[];
  serviceClass: ServiceClass;
  /** G1 = no website and G2 = no internet leads: the report adds a WEB note. */
  webNote: boolean;
  cta: 'brief' | 'automation';
};

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

/** Step 3 — weight of each area in the phase total. */
export const PHASE_WEIGHTS: Record<AreaId, number> = {
  sales: 1.0,
  ops: 1.5,
  finance: 1.5,
  stock: 1.0,
  people: 1.0,
  owner: 1.5,
  ai: 0.5,
  web: 0,
};

/** Step 3 — lowest total for each phase, highest phase first. */
export const PHASE_THRESHOLDS: Array<{ phase: Phase; from: number }> = [
  { phase: 4, from: 75 },
  { phase: 3, from: 50 },
  { phase: 2, from: 25 },
  { phase: 1, from: 0 },
];

/** Step 4 — only these areas can become a priority (never ai, owner, or web). */
export const PRIORITY_AREAS: AreaId[] = ['sales', 'ops', 'finance', 'stock', 'people'];
export const PRIORITY_COUNT = 3;

/** An area at or above this is already tidy: never a priority, and "not weak" for web. */
export const TIDY_FROM = 75;

/** Step 5 — below this an area counts as weak when picking the service class. */
export const WEAK_BELOW = 50;

/** Step 4 — impact weight for areas named in F2. `semua` hits every area, `tidak-ada` none. */
export const IMPACT_WEIGHT = 1.5;
export const F2_IMPACT: Record<string, AreaId[]> = {
  approval: ['ops'],
  pembayaran: ['finance'],
  laporan: ['ops'],
  harga: ['sales'],
};

/**
 * Step 4 — volume weight from A3. It multiplies every area equally, so it scales the priority
 * number but never changes which areas come first.
 */
export const VOLUME_WEIGHTS: Record<string, number> = {
  lt30: 0.8,
  '30-100': 1.0,
  '100-500': 1.2,
  gt500: 1.4,
};

/** Copy bands (brief §6): low < 40, mid 40–74, high ≥ 75. */
export const BAND_MID_FROM = 40;
export const BAND_HIGH_FROM = 75;

// TODO(decision): step 5 says "dalam satu fungsi" / "lintas fungsi" but never defines a function.
// Ops, stock, and people are grouped as one operational division; sales and finance stand alone.
export const AREA_FUNCTION: Partial<Record<AreaId, string>> = {
  sales: 'penjualan',
  ops: 'operasional',
  stock: 'operasional',
  people: 'operasional',
  finance: 'keuangan',
};

/** Employee bands that count as "karyawan > 20" (known only after the gate). */
export const LARGE_TEAM_BANDS = ['21-50', '51-100', '100+'];

/* ------------------------------------------------------------------ */
/* Answers                                                             */
/* ------------------------------------------------------------------ */

const own = (record: object, key: unknown): key is string =>
  typeof key === 'string' && Object.prototype.hasOwnProperty.call(record, key);

/** Rounds half up after trimming float noise, so 0.375 × 100 gives 38 rather than 37. */
const roundScore = (value: number) => Math.round(Number(value.toFixed(9)));

const optionIndex = (q: Question, answer: unknown) =>
  typeof answer === 'string' ? q.options.findIndex((o) => o.id === answer) : -1;

/** Keeps known questions with valid options only. Multi answers are deduped and exclusivity is enforced. */
export function sanitizeAnswers(input: unknown): Answers {
  const answers: Answers = {};
  if (!input || typeof input !== 'object' || Array.isArray(input)) return answers;
  for (const [id, value] of Object.entries(input)) {
    if (!own(QUESTION_BY_ID, id)) continue;
    const q = QUESTION_BY_ID[id];
    if (q.type === 'multi') {
      if (!Array.isArray(value)) continue;
      const picked = q.options.map((o) => o.id).filter((o) => value.includes(o));
      if (!picked.length) continue;
      const exclusive = picked.find((o) => q.exclusive?.includes(o));
      answers[id] = exclusive ? [exclusive] : picked;
    } else if (optionIndex(q, value) >= 0) {
      answers[id] = value as string;
    }
  }
  return answers;
}

/** True when a branch answer skips this question (D0 = Tidak skips D1–D2). */
export const isSkipped = (q: Question, answers: Answers) =>
  QUESTIONS.some((b) => b.branch && answers[b.id] === b.branch.when && b.branch.skips.includes(q.id));

/** True when a branch answer removes the whole area from scoring and progress. */
export const isAreaSkipped = (area: AreaId, answers: Answers) =>
  QUESTIONS.some((b) => b.area === area && b.branch && answers[b.id] === b.branch.when);

export const activeQuestions = (answers: Answers) => QUESTIONS.filter((q) => !isSkipped(q, answers));

export const isAnswered = (q: Question, answer: unknown) =>
  q.type === 'multi'
    ? Array.isArray(answer) && answer.length > 0 && answer.every((id) => optionIndex(q, id) >= 0)
    : optionIndex(q, answer) >= 0;

/** Ids of active questions without a valid answer, in quiz order. */
export const missingAnswers = (answers: Answers) =>
  activeQuestions(answers)
    .filter((q) => !isAnswered(q, answers[q.id]))
    .map((q) => q.id);

/* ------------------------------------------------------------------ */
/* Scores                                                              */
/* ------------------------------------------------------------------ */

/** Step 1 — normalised 0–1 score, or null for unscored or unanswered questions. */
export function questionScore(q: Question, answer: unknown): number | null {
  if (!q.scored || (q.type !== 'scale' && q.type !== 'single')) return null;
  const index = optionIndex(q, answer);
  return index < 0 ? null : index / (q.options.length - 1);
}

/** Step 2 — mean of scored answers × 100, rounded. Null when skipped or nothing scored yet. */
export function areaScore(area: AreaId, answers: Answers): number | null {
  if (isAreaSkipped(area, answers)) return null;
  const values = QUESTIONS.filter((q) => q.area === area && !isSkipped(q, answers))
    .map((q) => questionScore(q, answers[q.id]))
    .filter((v): v is number => v !== null);
  if (!values.length) return null;
  return roundScore((values.reduce((sum, v) => sum + v, 0) / values.length) * 100);
}

export function areaScores(answers: Answers): AreaScores {
  const areas: AreaScores = {};
  for (const { id } of AREAS) {
    const score = areaScore(id, answers);
    if (score !== null) areas[id] = score;
  }
  return areas;
}

/** Step 3 — weighted mean of area scores. */
export function totalScore(areas: AreaScores): number {
  let sum = 0;
  let weight = 0;
  for (const { id } of AREAS) {
    const score = areas[id];
    if (score === undefined) continue;
    sum += score * PHASE_WEIGHTS[id];
    weight += PHASE_WEIGHTS[id];
  }
  return weight ? roundScore(sum / weight) : 0;
}

export const phaseFor = (total: number): Phase =>
  (PHASE_THRESHOLDS.find((t) => total >= t.from) ?? PHASE_THRESHOLDS[PHASE_THRESHOLDS.length - 1]).phase;

/** Inclusive total range for a phase, e.g. phase 2 → 25–49. */
export function phaseRange(phase: Phase) {
  const index = PHASE_THRESHOLDS.findIndex((t) => t.phase === phase);
  return { from: PHASE_THRESHOLDS[index].from, to: index === 0 ? 100 : PHASE_THRESHOLDS[index - 1].from - 1 };
}

export const bandFor = (score: number): Band =>
  score >= BAND_HIGH_FROM ? 'high' : score >= BAND_MID_FROM ? 'mid' : 'low';

function impactWeight(area: AreaId, answers: Answers) {
  const picked = Array.isArray(answers.F2) ? answers.F2 : [];
  if (picked.includes('semua')) return IMPACT_WEIGHT;
  return picked.some((id) => own(F2_IMPACT, id) && F2_IMPACT[id].includes(area)) ? IMPACT_WEIGHT : 1;
}

const volumeWeight = (answers: Answers) => (own(VOLUME_WEIGHTS, answers.A3) ? VOLUME_WEIGHTS[answers.A3] : 1);

function focusQuestion(area: AreaId, answers: Answers): string {
  let lowest: { id: string; score: number } | null = null;
  for (const q of QUESTIONS) {
    if (q.area !== area || isSkipped(q, answers)) continue;
    const score = questionScore(q, answers[q.id]);
    if (score !== null && (!lowest || score < lowest.score)) lowest = { id: q.id, score };
  }
  return lowest?.id ?? '';
}

/** Step 4 — up to three areas below TIDY_FROM, ranked by (100 − score) × impact × volume. */
export function priorities(areas: AreaScores, answers: Answers): Priority[] {
  const volume = volumeWeight(answers);
  return PRIORITY_AREAS.flatMap((area): Priority[] => {
    const score = areas[area];
    if (score === undefined || score >= TIDY_FROM) return [];
    const priority = Math.round((100 - score) * impactWeight(area, answers) * volume * 100) / 100;
    return [{ area, score, priority, focusQuestion: focusQuestion(area, answers) }];
  })
    .sort(
      (a, b) =>
        b.priority - a.priority ||
        a.score - b.score ||
        PRIORITY_AREAS.indexOf(a.area) - PRIORITY_AREAS.indexOf(b.area),
    )
    .slice(0, PRIORITY_COUNT);
}

/**
 * Step 5 — service class, checked from the largest engagement down.
 * The brief leaves gaps; each rule marked (gap) fills one of them.
 *
 *   SYS-OS    ≥ 3 weak areas across functions, or phase 1 with more than 20 employees
 *   SYS-DIV   ≥ 2 weak areas: one division; (gap) 2 weak areas across functions land here too
 *   SYS-TOOL  exactly 1 weak area; (gap) or no weak area but something still below TIDY_FROM
 *   WEB       every priority area tidy, web below TIDY_FROM
 *   READY     every priority area tidy, web tidy, phase 4; (gap) otherwise SYS-TOOL
 */
// TODO(decision): the (gap) rules above are not in the brief. The phase-1 rule also means
// small phase-1 businesses usually land in SYS-OS via the weak-area count; see the PR notes.
export function serviceClass({
  areas,
  phase,
  employees,
}: {
  areas: AreaScores;
  phase: Phase;
  employees?: string;
}): ServiceClass {
  const scored = PRIORITY_AREAS.filter((area) => areas[area] !== undefined);
  const weak = scored.filter((area) => areas[area]! < WEAK_BELOW);
  const functions = new Set(weak.map((area) => AREA_FUNCTION[area]));
  const largeTeam = employees !== undefined && LARGE_TEAM_BANDS.includes(employees);

  if ((weak.length >= 3 && functions.size > 1) || (phase === 1 && largeTeam)) return 'SYS-OS';
  if (weak.length >= 2) return 'SYS-DIV';
  if (weak.length === 1) return 'SYS-TOOL';
  if (scored.some((area) => areas[area]! < TIDY_FROM)) return 'SYS-TOOL';
  if ((areas.web ?? 0) < TIDY_FROM) return 'WEB';
  return phase === 4 ? 'READY' : 'SYS-TOOL';
}

/**
 * Full result for a completed session. `employees` comes from the gate, so the service class is
 * computed again once the gate is submitted.
 */
export function scoreAnswers(input: Answers, context: { employees?: string } = {}): Scores {
  const answers = sanitizeAnswers(input);
  const areas = areaScores(answers);
  const total = totalScore(areas);
  const phase = phaseFor(total);
  const cls = serviceClass({ areas, phase, employees: context.employees });
  return {
    instrumentVersion: INSTRUMENT_VERSION,
    areas,
    total,
    phase,
    priorities: priorities(areas, answers),
    serviceClass: cls,
    webNote: answers.G1 === 'tidak-ada' && answers.G2 === 'tidak-ada',
    cta: cls === 'READY' ? 'automation' : 'brief',
  };
}
