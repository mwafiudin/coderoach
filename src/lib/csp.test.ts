import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, test } from 'node:test';

// next.config.mjs is read as text: importing it pulls in Payload and Next. The script-src line is
// the one place where a loosened policy would ship to every page.
const config = readFileSync(path.join(process.cwd(), 'next.config.mjs'), 'utf8');
const scriptSrc = config.split('\n').find((line) => line.trimStart().startsWith('`script-src')) ?? '';

describe('production CSP', () => {
  test('allows WebAssembly for the RideDeck model decoder (ADR 0014)', () => {
    assert.match(scriptSrc, /'self' 'unsafe-inline' 'wasm-unsafe-eval'/);
  });

  test('keeps eval() out of production: unsafe-eval is dev only', () => {
    assert.match(scriptSrc, /\$\{isProd \? '' : " 'unsafe-eval'"\}/);
    assert.equal(scriptSrc.replace(/\$\{isProd[^}]*\}/, '').includes("'unsafe-eval'"), false);
  });
});
