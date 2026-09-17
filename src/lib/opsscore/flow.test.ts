import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { PRODUCT_SLUG } from './config';
import { buildSteps, closesSection, progressSections, stepKey } from './flow';
import { normalizePhone } from './phone';
import { formatPhoneInput, isProfileAnswered, sanitizeProfile } from './profile';
import { QUESTION_BY_ID, promptFor } from './questions';

describe('quiz flow', () => {
  const keys = (answers: Record<string, string>) => buildSteps(answers).map(stepKey);

  test('opens with name and business name, then weaves profile questions into their sections', () => {
    const steps = keys({ D0: 'ya' });
    assert.deepEqual(steps.slice(0, 4), ['p:name', 'p:brand', 'p:industry', 'q:A1']);
    assert.equal(steps.indexOf('p:revenue') + 1, steps.indexOf('q:C1'));
    assert.equal(steps.indexOf('p:employees') + 1, steps.indexOf('q:E1'));
    assert.equal(steps.length, 27 + 5 + 8);
    assert.equal(steps[steps.length - 1], 'f:ai');
    assert.ok(!steps.includes('p:phone'));
  });

  test('D0 = Tidak drops D1, D2, the stock feedback, and stock from progress', () => {
    const steps = keys({ D0: 'tidak' });
    assert.ok(steps.includes('q:D0'));
    assert.ok(!steps.includes('q:D1') && !steps.includes('q:D2') && !steps.includes('f:stock'));
    assert.equal(progressSections({ D0: 'tidak' }).length, 8);
    assert.deepEqual(progressSections({}).map((s) => s.id).slice(0, 2), ['kenalan', 'sales']);
  });

  test('saves silently whenever a section closes', () => {
    const steps = buildSteps({ D0: 'ya' });
    const closing = steps.flatMap((step, i) => (closesSection(steps, i) ? [stepKey(step)] : []));
    assert.deepEqual(closing.slice(0, 3), ['p:brand', 'q:A4', 'q:B4']);
    assert.equal(closing.length, 1 + 8);
    assert.equal(closing[closing.length - 1], 'q:H3');
  });
});

describe('profile', () => {
  test('keeps valid fields only, so partial saves never wipe data', () => {
    assert.deepEqual(
      sanitizeProfile({ name: '  Wati  ', brand: 'x', industry: 'jasa', revenue: 'lots', employees: '21-50', evil: 1 }),
      { name: 'Wati', industry: 'jasa', employees: '21-50' },
    );
    assert.equal(isProfileAnswered('brand', { brand: 'Kopi Senja' }), true);
    assert.equal(isProfileAnswered('brand', { brand: ' ' }), false);
  });

  test('formats WhatsApp numbers while typing', () => {
    assert.equal(formatPhoneInput('081234567890'), '0812-3456-7890');
    assert.equal(formatPhoneInput('+62 812 345'), '0812-345');
    assert.equal(formatPhoneInput('0812'), '0812');
    assert.equal(formatPhoneInput('08123456789012345'), '0812-3456-78901');
  });

  test('service businesses get Jasa wording for A4 and H2', () => {
    const a4 = QUESTION_BY_ID.A4;
    assert.notEqual(promptFor(a4, 'jasa'), a4.prompt);
    assert.equal(promptFor(a4, 'kuliner'), a4.prompt);
    assert.equal(promptFor(QUESTION_BY_ID.A1, 'jasa'), QUESTION_BY_ID.A1.prompt);
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
