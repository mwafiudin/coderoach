import assert from 'node:assert/strict';
import { test } from 'node:test';
import { defaultUsername } from './username';

test('takes the part of the email before the @, lower-cased', () => {
  assert.equal(defaultUsername('Farrez.Alhakim@gmail.com'), 'farrez.alhakim');
  assert.equal(defaultUsername('wafi+admin@coderoach.id'), 'wafiadmin');
});

test('gives nothing rather than an empty username', () => {
  assert.equal(defaultUsername(undefined), undefined);
  assert.equal(defaultUsername(''), undefined);
  assert.equal(defaultUsername('+@x.com'), undefined);
});
