import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { test } from 'node:test';
import { CONTACT_EMAIL } from './contact-email';
import { GATE_COPY } from './opsscore/copy';

// The old .studio domain was never registered. Anyone could buy it and receive mail meant for the
// studio, so no file may point there again. Old migrations are frozen and keep the old default.
const DEAD_DOMAIN = ['coderoach', 'studio'].join('.');

test('the contact address sits on the domain the studio owns', () => {
  assert.match(CONTACT_EMAIL, /^[a-z]+@coderoach\.id$/);
});

test('the OpsScore fallback message points visitors at the same inbox', () => {
  assert.ok(GATE_COPY.errors.turnstileMissing.includes(CONTACT_EMAIL));
});

test('no tracked file outside the frozen migrations mentions the unregistered domain', () => {
  let hits = '';
  try {
    hits = execFileSync('git', ['grep', '-l', '-I', '-F', DEAD_DOMAIN, '--', '.', ':!src/migrations'], {
      encoding: 'utf8',
    });
  } catch (err) {
    // git grep exits 1 when nothing matches; anything else is a real failure.
    if ((err as { status?: number }).status !== 1) throw err;
  }
  assert.equal(hits.trim(), '', `still pointing at ${DEAD_DOMAIN}:\n${hits}`);
});
