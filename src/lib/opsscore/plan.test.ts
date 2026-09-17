import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { ACTIONS, AREA_NOUNS, PHASE_COPY, QUICK_WINS, ROADMAP } from './copy';
import { nextPhasePlan, quickWinAreas, roadmapAreas } from './plan';
import { PROFILES } from './profiles';
import { AREAS } from './questions';
import { PHASE_THRESHOLDS, TIDY_FROM, areaScores, phaseFor, scoreAnswers, totalScore, type Answers } from './scoring';

describe('report suggestions', () => {
  test('next phase plan: at most three steps, each raising the total, adding up to the new total', () => {
    for (const [key, { answers }] of Object.entries(PROFILES)) {
      const scores = scoreAnswers(answers);
      const plan = nextPhasePlan(answers);
      if (scores.phase === 4) {
        assert.equal(plan, null, key);
        continue;
      }
      assert.ok(plan, key);
      assert.equal(plan.from, scores.total, key);
      assert.equal(plan.target, scores.phase + 1, key);
      assert.ok(plan.steps.length >= 1 && plan.steps.length <= 3, key);
      assert.equal(new Set(plan.steps.map((step) => step.question)).size, plan.steps.length, key);
      for (const step of plan.steps) {
        assert.ok(step.gain > 0, `${key} ${step.question}`);
        assert.ok(ACTIONS[step.question], `${key} ${step.question} has an action`);
      }
      assert.equal(plan.from + plan.steps.reduce((sum, step) => sum + step.gain, 0), plan.to, key);
      const threshold = PHASE_THRESHOLDS.find((t) => t.phase === plan.target)!.from;
      assert.equal(plan.reached, plan.to >= threshold, key);
      if (plan.reached) assert.equal(phaseFor(plan.to), plan.target, key);
    }
  });

  test('next phase plan never touches questions the branch skipped', () => {
    const answers: Answers = { ...PROFILES.warung.answers, D0: 'tidak' };
    delete answers.D1;
    delete answers.D2;
    const plan = nextPhasePlan(answers);
    assert.ok(plan);
    assert.ok(plan.steps.every((step) => step.area !== 'stock'));
    assert.equal(plan.from, totalScore(areaScores(answers)));
  });

  test('quick wins: areas below tidy, weakest first, at most four', () => {
    const areas = { sales: 20, ops: 80, finance: 10, stock: 60, people: 74, owner: 75, web: 5, ai: 30 };
    assert.deepEqual(quickWinAreas(areas), ['web', 'finance', 'sales', 'ai']);
    assert.ok(quickWinAreas(areas, 8).every((area) => areas[area] < TIDY_FROM));
    assert.deepEqual(quickWinAreas({ sales: 90, ops: 80 }), []);
  });

  test('roadmap names the priorities first, then the weakest areas', () => {
    const scores = scoreAnswers(PROFILES.distributor.answers);
    const areas = roadmapAreas(scores.areas, scores.priorities);
    assert.equal(areas.length, 2);
    assert.equal(areas[0], scores.priorities[0].area);
    assert.deepEqual(roadmapAreas({ sales: 90 }, []), []);
  });

  test('every area and phase has suggestion copy', () => {
    for (const { id } of AREAS) {
      assert.ok(QUICK_WINS[id].text, id);
      assert.ok(AREA_NOUNS[id], id);
    }
    for (const phase of [1, 2, 3, 4] as const) {
      assert.deepEqual(ROADMAP[phase].map((step) => step.days), [30, 60, 90]);
      assert.ok(PHASE_COPY[phase].nickname && PHASE_COPY[phase].strength && PHASE_COPY[phase].blocker);
      for (const step of ROADMAP[phase]) assert.ok(step.body('A', 'B').length > 10);
    }
  });
});
