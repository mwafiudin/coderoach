import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { describe, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { PRODUCT_SLUG } from './config';
import { SECTIONS, buildSteps, closesSection, lastAnsweredSection, progressSections, stepKey } from './flow';
import { normalizePhone } from './phone';
import { formatPhoneInput, isProfileAnswered, sanitizeProfile } from './profile';
import { QUESTION_BY_ID, promptFor } from './questions';

describe('quiz flow', () => {
  const keys = (answers: Record<string, string>) => buildSteps(answers).map(stepKey);

  test('six sections: Intro, then the eight scoring areas grouped, one score screen per section', () => {
    assert.deepEqual(
      SECTIONS.map((s) => s.label),
      ['Intro', 'Penjualan & prospek', 'Operasional & stok', 'Keuangan & kas', 'Tim & peran owner', 'Digitalisasi & AI'],
    );
    const steps = keys({ D0: 'ya' });
    assert.deepEqual(steps.slice(0, 4), ['p:name', 'p:brand', 'p:industry', 'q:A1']);
    assert.equal(steps.indexOf('q:B4') + 1, steps.indexOf('q:D0'));
    assert.equal(steps.indexOf('p:revenue') + 1, steps.indexOf('q:C1'));
    assert.equal(steps.indexOf('p:employees') + 1, steps.indexOf('q:E1'));
    assert.equal(steps.indexOf('q:E3') + 1, steps.indexOf('q:F1'));
    assert.equal(steps.length, 27 + 5 + 5);
    assert.equal(steps.filter((key) => key.startsWith('f:')).length, 5);
    assert.equal(steps[steps.length - 1], 'f:digital');
    const feedback = buildSteps({ D0: 'ya' }).filter((s) => s.kind === 'feedback');
    assert.deepEqual(feedback.map((s) => (s.kind === 'feedback' ? s.areas : [])), [
      ['sales'],
      ['ops', 'stock'],
      ['finance'],
      ['people', 'owner'],
      ['web', 'ai'],
    ]);
  });

  test('D0 = Tidak drops D1, D2, and the stock score, but keeps the section', () => {
    const steps = buildSteps({ D0: 'tidak' });
    const stepKeys = steps.map(stepKey);
    assert.ok(stepKeys.includes('q:D0') && !stepKeys.includes('q:D1') && !stepKeys.includes('q:D2'));
    const operations = steps.find((s) => s.kind === 'feedback' && s.section === 'operations');
    assert.deepEqual(operations?.kind === 'feedback' ? operations.areas : null, ['ops']);
    assert.equal(progressSections().length, 6);
  });

  test('saves silently whenever a section closes', () => {
    const steps = buildSteps({ D0: 'ya' });
    const closing = steps.flatMap((step, i) => (closesSection(steps, i) ? [stepKey(step)] : []));
    assert.deepEqual(closing, ['p:brand', 'q:A4', 'q:D2', 'q:C4', 'q:F3', 'q:H3']);
  });

  test('stopped-at follows quiz order, where stock comes before finance', () => {
    assert.equal(lastAnsweredSection({}), null);
    assert.equal(lastAnsweredSection({ A1: 'chat', D0: 'ya', D2: 'nol' }), 'operations');
    assert.equal(lastAnsweredSection({ A1: 'chat', D0: 'ya', D2: 'nol', C1: 'chat' }), 'finance');
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
