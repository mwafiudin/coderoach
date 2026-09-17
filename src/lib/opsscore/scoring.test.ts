import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { INSTRUMENT_VERSION } from './config';
import { ACTIONS, AREA_FEEDBACK } from './copy';
import { PROFILES } from './profiles';
import { AREAS, QUESTION_BY_ID, QUESTIONS } from './questions';
import {
  areaScores,
  bandFor,
  missingAnswers,
  phaseFor,
  phaseRange,
  priorities,
  questionScore,
  sanitizeAnswers,
  scoreAnswers,
  serviceClass,
  totalScore,
  type Answers,
  type AreaScores,
} from './scoring';

const q = (id: string) => QUESTION_BY_ID[id];

describe('instrument', () => {
  test('has 27 questions with unique ids', () => {
    assert.equal(QUESTIONS.length, 27);
    assert.equal(new Set(QUESTIONS.map((x) => x.id)).size, 27);
  });

  test('every scored question has an action sentence, every area has feedback for each band', () => {
    for (const question of QUESTIONS.filter((x) => x.scored)) {
      assert.ok(ACTIONS[question.id], `missing action for ${question.id}`);
    }
    for (const { id } of AREAS) {
      assert.ok(AREA_FEEDBACK[id].low && AREA_FEEDBACK[id].mid && AREA_FEEDBACK[id].high, id);
    }
  });
});

describe('step 1 — question score', () => {
  test('normalises by the number of options', () => {
    assert.equal(questionScore(q('A1'), 'aplikasi'), 0.75);
    assert.equal(questionScore(q('A2'), 'saya'), 2 / 3);
    assert.equal(questionScore(q('B2'), 'besok'), 0.5);
    assert.equal(questionScore(q('F3'), 'dashboard'), 1);
  });

  test('unscored, unanswered, and invalid answers score null', () => {
    assert.equal(questionScore(q('H1'), 'tim'), null);
    assert.equal(questionScore(q('A3'), 'gt500'), null);
    assert.equal(questionScore(q('F2'), 'semua'), null);
    assert.equal(questionScore(q('A1'), undefined), null);
    assert.equal(questionScore(q('A1'), 'nope'), null);
  });
});

describe('answers', () => {
  test('sanitize drops unknown questions and options, and enforces exclusive multi options', () => {
    const clean = sanitizeAnswers(
      JSON.parse(`{
        "A1": "sistem",
        "A2": "bukan-opsi",
        "Z9": "x",
        "__proto__": "x",
        "constructor": "x",
        "F2": ["laporan", "semua", "approval", "laporan"],
        "H3": ["laporan", "laporan", "balas-chat"]
      }`),
    );
    assert.deepEqual(clean, { A1: 'sistem', F2: ['semua'], H3: ['balas-chat', 'laporan'] });
  });

  test('D0 = Tidak skips D1–D2 and removes stock from scoring', () => {
    const answers = { ...PROFILES.consultant.answers, D1: 'kepala' };
    assert.ok(!missingAnswers(answers).includes('D1'));
    assert.equal(areaScores(answers).stock, undefined);
    const withStock = { ...answers, D0: 'ya' };
    assert.deepEqual(missingAnswers(withStock), ['D2']);
  });

  test('missing answers are listed in quiz order', () => {
    const { A1, B2, ...rest } = PROFILES.fnb.answers;
    assert.deepEqual(missingAnswers(rest), ['A1', 'B2']);
  });
});

describe('step 2 & 3 — area scores, total, phase', () => {
  test('area score is the rounded mean of its scored questions', () => {
    // C1 0.5, C2 1/3, C3 1/3, C4 1/3 → 37.5 → 38
    const areas = areaScores(PROFILES.distributor.answers);
    assert.equal(areas.finance, 38);
  });

  test('ai uses H2 only', () => {
    const base = PROFILES.fnb.answers;
    const a = areaScores({ ...base, H1: 'belum', H3: ['tidak-kepikiran'] }).ai;
    const b = areaScores({ ...base, H1: 'tim', H3: ['laporan'] }).ai;
    assert.equal(a, b);
    assert.equal(a, 33);
  });

  test('web is scored but never moves the total', () => {
    const low = scoreAnswers({ ...PROFILES.fnb.answers, G1: 'tidak-ada', G2: 'tidak-ada', G3: 'tidak-tahu' });
    const high = scoreAnswers({ ...PROFILES.fnb.answers, G1: 'sumber-lead', G2: 'crm', G3: 'ada-data' });
    assert.equal(low.areas.web, 0);
    assert.equal(high.areas.web, 100);
    assert.equal(low.total, high.total);
  });

  test('total is weighted and skips missing areas', () => {
    const areas: AreaScores = { sales: 100, ops: 0, owner: 50 };
    // (100×1 + 0×1.5 + 50×1.5) / 4 = 43.75
    assert.equal(totalScore(areas), 44);
  });

  test('phase boundaries', () => {
    assert.deepEqual([0, 24, 25, 49, 50, 74, 75, 100].map(phaseFor), [1, 1, 2, 2, 3, 3, 4, 4]);
  });

  test('phase ranges', () => {
    assert.deepEqual(phaseRange(1), { from: 0, to: 24 });
    assert.deepEqual(phaseRange(4), { from: 75, to: 100 });
  });

  test('copy bands', () => {
    assert.deepEqual([0, 39, 40, 74, 75, 100].map(bandFor), ['low', 'low', 'mid', 'mid', 'high', 'high']);
  });
});

describe('step 4 — priorities', () => {
  const areas: AreaScores = { sales: 40, ops: 40, finance: 40, stock: 40, people: 40, owner: 0, web: 0, ai: 0 };
  const answersWith = (extra: Answers): Answers => ({ ...PROFILES.fnb.answers, ...extra });

  test('never includes owner, ai, or web, and returns at most three', () => {
    const top = priorities(areas, answersWith({ F2: ['tidak-ada'] }));
    assert.equal(top.length, 3);
    assert.ok(top.every((p) => ['sales', 'ops', 'finance', 'stock', 'people'].includes(p.area)));
  });

  test('areas at 75 or above are never a priority', () => {
    const top = priorities({ sales: 75, ops: 90, finance: 74, people: 80 }, answersWith({ F2: ['semua'] }));
    assert.deepEqual(top.map((p) => p.area), ['finance']);
  });

  test('F2 answers raise the areas they map to', () => {
    const top = priorities(
      { sales: 60, ops: 50, finance: 45, people: 40 },
      answersWith({ F2: ['harga'], A3: '30-100' }),
    );
    // sales (100−60) × 1.5 = 60 ties people (100−40) × 1 = 60; the lower score goes first.
    assert.deepEqual(
      top.map((p) => [p.area, p.priority]),
      [
        ['people', 60],
        ['sales', 60],
        ['finance', 55],
      ],
    );
  });

  test('semua raises every area, tidak-ada raises none', () => {
    const all = priorities(areas, answersWith({ F2: ['semua'], A3: '30-100' }));
    const none = priorities(areas, answersWith({ F2: ['tidak-ada'], A3: '30-100' }));
    assert.ok(all.every((p) => p.priority === 90));
    assert.ok(none.every((p) => p.priority === 60));
  });

  test('volume scales the priority number without reordering', () => {
    const areas: AreaScores = { sales: 30, ops: 50, people: 60 };
    const low = priorities(areas, answersWith({ F2: ['approval'], A3: 'lt30' }));
    const high = priorities(areas, answersWith({ F2: ['approval'], A3: 'gt500' }));
    // ops 50 × 1.5 = 75, sales 70, people 40 — before volume
    assert.deepEqual(low.map((p) => [p.area, p.priority]), [['ops', 60], ['sales', 56], ['people', 32]]);
    assert.deepEqual(high.map((p) => [p.area, p.priority]), [['ops', 105], ['sales', 98], ['people', 56]]);
  });

  test('focus question is the lowest-scoring question in the area', () => {
    const top = priorities(areaScores(PROFILES.consultant.answers), PROFILES.consultant.answers);
    assert.equal(top.find((p) => p.area === 'ops')?.focusQuestion, 'B4');
  });
});

describe('step 5 — service class', () => {
  const tidy: AreaScores = { sales: 80, ops: 80, finance: 80, stock: 80, people: 80, owner: 80, ai: 100, web: 80 };
  const cls = (areas: AreaScores, phase: 1 | 2 | 3 | 4 = 3, employees?: string) =>
    serviceClass({ areas: { ...tidy, ...areas }, phase, employees });

  test('one weak area → SYS-TOOL', () => {
    assert.equal(cls({ finance: 30 }), 'SYS-TOOL');
  });

  test('two or three weak areas in one division → SYS-DIV', () => {
    assert.equal(cls({ ops: 30, stock: 40 }), 'SYS-DIV');
    assert.equal(cls({ ops: 30, stock: 40, people: 20 }), 'SYS-DIV');
  });

  test('two weak areas across functions → SYS-DIV (gap rule)', () => {
    assert.equal(cls({ sales: 30, finance: 40 }), 'SYS-DIV');
  });

  test('three weak areas across functions → SYS-OS', () => {
    assert.equal(cls({ sales: 30, ops: 40, finance: 45 }), 'SYS-OS');
  });

  test('phase 1 with more than 20 employees → SYS-OS', () => {
    assert.equal(cls({ finance: 30 }, 1, '21-50'), 'SYS-OS');
    assert.equal(cls({ finance: 30 }, 1, '11-20'), 'SYS-TOOL');
    assert.equal(cls({ finance: 30 }, 1), 'SYS-TOOL');
  });

  test('no weak area but something below 75 → SYS-TOOL (gap rule)', () => {
    assert.equal(cls({ people: 60 }), 'SYS-TOOL');
  });

  test('everything tidy except web → WEB', () => {
    assert.equal(cls({ web: 60 }, 4), 'WEB');
  });

  test('everything tidy, web tidy, phase 4 → READY with the automation CTA', () => {
    assert.equal(cls({}, 4), 'READY');
    assert.equal(cls({}, 3), 'SYS-TOOL');
    const ready = scoreAnswers({
      ...PROFILES.erp.answers,
      A4: 'detik', B3: 'tidak-pernah', D1: 'sistem', D2: 'nol', E2: 'tidak-terasa', E3: 'sistem',
    });
    assert.equal(ready.serviceClass, 'READY');
    assert.equal(ready.cta, 'automation');
  });

  test('stock skipped does not count as weak', () => {
    const areas = { ...tidy, finance: 30 };
    delete areas.stock;
    assert.equal(serviceClass({ areas, phase: 3 }), 'SYS-TOOL');
  });
});

describe('result', () => {
  test('stores the instrument version and the web note', () => {
    const result = scoreAnswers(PROFILES.warung.answers);
    assert.equal(result.instrumentVersion, INSTRUMENT_VERSION);
    assert.equal(result.webNote, true);
    assert.equal(scoreAnswers(PROFILES.fnb.answers).webNote, false);
  });
});

describe('synthetic profiles (brief §5)', () => {
  const run = (key: keyof typeof PROFILES) => {
    const { answers, employees } = PROFILES[key];
    assert.deepEqual(missingAnswers(answers), [], `${key} is incomplete`);
    return scoreAnswers(answers, { employees });
  };

  test('warung, 3 orang → phase 1', () => {
    const r = run('warung');
    assert.equal(r.phase, 1);
    // TODO(decision): the brief's rules put a 3-person warung in SYS-OS (five weak areas across
    // functions). Recorded here so a rule change shows up as a failing test.
    assert.equal(r.serviceClass, 'SYS-OS');
  });

  test('outlet F&B, 4 cabang → phase 2', () => {
    const r = run('fnb');
    assert.equal(r.phase, 2);
    assert.deepEqual(r.priorities.map((p) => p.area), ['ops', 'people', 'sales']);
    assert.equal(r.serviceClass, 'SYS-OS');
  });

  test('konsultan jasa, 12 orang → no stock, phase 2, SYS-TOOL', () => {
    const r = run('consultant');
    assert.equal(r.areas.stock, undefined);
    assert.equal(r.phase, 2);
    assert.equal(r.serviceClass, 'SYS-TOOL');
  });

  test('distributor, 40 orang → SYS-DIV or SYS-OS', () => {
    const r = run('distributor');
    assert.ok(['SYS-DIV', 'SYS-OS'].includes(r.serviceClass), r.serviceClass);
    assert.equal(r.phase, 2);
  });

  test('company already on ERP → phase 4', () => {
    const r = run('erp');
    assert.equal(r.phase, 4);
    assert.ok(r.priorities.every((p) => p.score < 75));
  });
});
