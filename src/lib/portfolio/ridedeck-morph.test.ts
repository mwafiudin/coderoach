import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { morphPhases, PHONE, phonePoint, roundedRect, smoothstep } from './ridedeck-morph';

const near = (a: number, b: number, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);

describe('morph phases', () => {
  test('at rest the bike is whole and the screenshot hidden; at the end the reverse', () => {
    assert.deepEqual(morphPhases(0), { mesh: 1, dots: 0, travel: 0, shot: 0 });
    assert.deepEqual(morphPhases(1), { mesh: 0, dots: 0, travel: 1, shot: 1 });
  });
  test('the points are visible only while the mesh has gone and before the screenshot is full', () => {
    const mid = morphPhases(0.5);
    assert.equal(mid.mesh, 0);
    assert.equal(mid.dots, 1);
    assert.ok(mid.travel > 0.5 && mid.travel < 1);
    assert.equal(mid.shot, 0);
  });
  test('out-of-range and bad progress clamp instead of exploding', () => {
    assert.deepEqual(morphPhases(-3), morphPhases(0));
    assert.deepEqual(morphPhases(7), morphPhases(1));
    assert.deepEqual(morphPhases(Number.NaN), morphPhases(0));
  });
  test('smoothstep is monotonic and clamped', () => {
    assert.equal(smoothstep(-1), 0);
    assert.equal(smoothstep(2), 1);
    near(smoothstep(0.5), 0.5);
    assert.ok(smoothstep(0.3) < smoothstep(0.31));
  });
});

describe('phone silhouette', () => {
  test('the rounded rect perimeter stays inside its box and starts at the bottom edge', () => {
    for (let a = 0; a < 1; a += 0.01) {
      const p = roundedRect(a, 2, 4, 0.5);
      assert.ok(p.x >= -1 - 1e-9 && p.x <= 1 + 1e-9, `x ${p.x} at ${a}`);
      assert.ok(p.y >= -1e-9 && p.y <= 4 + 1e-9, `y ${p.y} at ${a}`);
      near(Math.hypot(p.nx, p.ny), 1);
    }
    near(roundedRect(0, 2, 4, 0.5).y, 0);
    near(roundedRect(0.999999, 2, 4, 0.5).x, -0.5, 1e-4);
  });
  test('every landing point lies within the phone, cards inside the edge', () => {
    for (let u = 0; u < 1; u += 0.005) {
      const p = phonePoint(u, 0.37, 0.5);
      assert.ok(Math.abs(p.x) <= PHONE.width / 2 + 1e-9, `x ${p.x} at ${u}`);
      assert.ok(p.y >= -1e-9 && p.y <= PHONE.height + 1e-9, `y ${p.y} at ${u}`);
      if (u >= 0.62) assert.ok(Math.abs(p.x) < PHONE.width / 2 - 0.05 && p.z > 0, `card point ${u}`);
    }
  });
  test('jitter across the stroke never exceeds half the edge width', () => {
    const a = phonePoint(0.2, 0.5, 0);
    const b = phonePoint(0.2, 0.5, 1);
    near(Math.hypot(a.x - b.x, a.y - b.y), PHONE.edge);
  });
});
