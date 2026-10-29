import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, test } from 'node:test';
import { leanAt, MAX_LEAN, RIDEDECK_DIR, RIDEDECK_FILES, RIG_PARTS, RIG_TOTAL_BUDGET_KB, ridedeckBudget } from './ridedeck';

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 1e-9, `${a} vs ${b}`);
// 32 degrees, worked out by hand so the test does not borrow the constant it checks.
const LIMIT = 0.5585053606381855;

describe('RideDeck lean curve', () => {
  test('upright at both ends and in the middle of the scene', () => {
    near(leanAt(0), 0);
    near(leanAt(0.5), 0);
    near(leanAt(1), 0);
  });

  test('leans fully left at a quarter and fully right at three quarters', () => {
    near(MAX_LEAN, LIMIT);
    near(leanAt(0.25), LIMIT);
    near(leanAt(0.75), -LIMIT);
  });

  test('never passes the limit, even past the ends or on a bad value', () => {
    for (let p = -1; p <= 2; p += 0.01) assert.ok(Math.abs(leanAt(p)) <= LIMIT + 1e-9, String(p));
    near(leanAt(-0.3), 0);
    near(leanAt(1.4), 0);
    assert.equal(leanAt(Number.NaN), 0);
    assert.equal(leanAt(Number.POSITIVE_INFINITY), 0);
  });
});

describe('RideDeck page files', () => {
  const dir = path.join(process.cwd(), 'public', RIDEDECK_DIR);
  const named = Object.values(RIDEDECK_FILES) as string[];
  const kbOf = (file: string) => Math.round((statSync(path.join(dir, file), { throwIfNoEntry: false })?.size ?? Number.NaN) / 1024);

  test('every file the page names exists and fits its budget', () => {
    for (const file of named) {
      const kb = kbOf(file);
      assert.ok(Number.isFinite(kb), `${file} is missing`);
      assert.ok(kb <= ridedeckBudget(file), `${file} is ${kb} KB, budget ${ridedeckBudget(file)} KB`);
    }
  });

  test('the seven rig parts together stay under the rig budget', () => {
    const total = RIG_PARTS.reduce((n, f) => n + kbOf(f), 0);
    assert.ok(total <= RIG_TOTAL_BUDGET_KB, `rig is ${total} KB, budget ${RIG_TOTAL_BUDGET_KB} KB`);
  });

  test('names are versioned, so a changed file never hides behind a cached URL', () => {
    for (const file of named) assert.match(file, /\.v\d+\.(?:poster\.)?(?:webp|glb|svg|mp4)$/, file);
  });

  test('nothing in the folder goes unused (public, and every byte ships with the repo)', () => {
    for (const file of readdirSync(dir)) assert.ok(named.includes(file), `${file} is not named by the page`);
  });

  test('each model is meshopt-compressed, so the scenes need only the decoder three already ships', () => {
    for (const file of RIG_PARTS) {
      const glb = readFileSync(path.join(dir, file));
      assert.equal(glb.toString('ascii', 0, 4), 'glTF', file);
      const jsonLength = glb.readUInt32LE(12);
      const json = JSON.parse(glb.toString('utf8', 20, 20 + jsonLength)) as { extensionsRequired?: string[] };
      assert.ok(json.extensionsRequired?.includes('EXT_meshopt_compression'), `${file}: ${JSON.stringify(json.extensionsRequired)}`);
    }
  });

  test('the drawn icon carries no script and no outside reference', () => {
    const svg = readFileSync(path.join(dir, RIDEDECK_FILES.icon), 'utf8');
    assert.doesNotMatch(svg, /<script|on[a-z]+=|href=|<foreignObject/i);
  });
});
