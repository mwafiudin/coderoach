import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { PRODUCT_SLUG } from './config';
import { buildSteps, progressAreas, stepKey } from './flow';
import { normalizePhone } from './phone';

describe('quiz flow', () => {
  test('27 questions and 8 feedback screens when the business holds stock', () => {
    const steps = buildSteps({ D0: 'ya' });
    assert.equal(steps.filter((s) => s.kind === 'question').length, 27);
    assert.equal(steps.filter((s) => s.kind === 'feedback').length, 8);
    assert.equal(stepKey(steps[0]), 'q:A1');
    assert.equal(stepKey(steps[4]), 'f:sales');
    assert.equal(stepKey(steps[steps.length - 1]), 'f:ai');
  });

  test('D0 = Tidak drops D1, D2, the stock feedback, and stock from progress', () => {
    const steps = buildSteps({ D0: 'tidak' }).map(stepKey);
    assert.ok(steps.includes('q:D0'));
    assert.ok(!steps.includes('q:D1') && !steps.includes('q:D2') && !steps.includes('f:stock'));
    assert.equal(progressAreas({ D0: 'tidak' }).length, 7);
    assert.equal(progressAreas({}).length, 8);
  });
});

describe('phone', () => {
  test('normalises common Indonesian formats to 62…', () => {
    assert.equal(normalizePhone('0812-3456-7890'), '6281234567890');
    assert.equal(normalizePhone('+62 812 3456 789'), '628123456789');
    assert.equal(normalizePhone('81234567890'), '6281234567890');
    assert.equal(normalizePhone('0812345678'), '62812345678');
  });

  test('rejects landlines and wrong lengths', () => {
    assert.equal(normalizePhone('021-5551234'), null);
    assert.equal(normalizePhone('081234567'), null);
    assert.equal(normalizePhone('08123456789012'), null);
    assert.equal(normalizePhone(''), null);
  });
});

describe('routes', () => {
  test('PRODUCT_SLUG matches the route folder', () => {
    const here = dirname(fileURLToPath(import.meta.url));
    assert.ok(existsSync(join(here, '../../app/(frontend)', PRODUCT_SLUG)), `missing app/(frontend)/${PRODUCT_SLUG}`);
  });
});
