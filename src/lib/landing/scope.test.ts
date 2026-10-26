import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { BLOCK_COPY } from './copy';
import { chipForScope, scopeValue } from './scope';

describe('scopeValue', () => {
  test('every chip on the contact form is stored as itself, never as Other', () => {
    // Before this, three of the four chips were silently saved as "Other".
    const scopes = (BLOCK_COPY.contact.scopes as Array<{ scope: string }>).map((s) => s.scope);
    assert.ok(scopes.length > 0);
    for (const label of scopes) assert.notEqual(scopeValue(label), 'Other', label);
  });

  test('maps labels regardless of case and spacing', () => {
    assert.equal(scopeValue('ERP & Sistem Operasional'), 'Build');
    assert.equal(scopeValue(' Otomasi & AI '), 'Automate');
    assert.equal(scopeValue('Dashboard & BI'), 'Intelligence');
  });

  test('stored values pass through; anything else is Other', () => {
    assert.equal(scopeValue('Augment'), 'Augment');
    assert.equal(scopeValue('Belum yakin'), 'Belum yakin');
    for (const bad of ['', 'DROP TABLE', null, 42, undefined]) assert.equal(scopeValue(bad), 'Other');
  });
});

describe('chipForScope', () => {
  const chips = (BLOCK_COPY.contact.scopes as Array<{ scope: string }>).map((s) => s.scope);

  test('a service slug picks its chip', () => {
    assert.equal(chipForScope(chips, 'build'), 'ERP & sistem operasional');
    assert.equal(chipForScope(chips, 'automate'), 'Otomasi & AI');
    assert.equal(chipForScope(chips, 'intelligence'), 'Dashboard & BI');
  });

  test('picks nothing for a scope without a chip or a junk value', () => {
    assert.equal(chipForScope(chips, 'augment'), undefined);
    assert.equal(chipForScope(chips, null), undefined);
    assert.equal(chipForScope(chips, '<script>'), undefined);
  });
});
