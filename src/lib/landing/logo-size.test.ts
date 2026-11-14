import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { LOGO_AREA, LOGO_MAX_HEIGHT, LOGO_MIN_HEIGHT, logoHeight } from './logo-size';

describe('logoHeight', () => {
  test('gives logos of different shapes about the same area', () => {
    const area = (w: number, h: number) => {
      const height = logoHeight(w, h);
      return height * height * (w / h);
    };
    // Marquee logos as cut: Uruzin 3.7:1, Chicken Wow 4.6:1, Geprek Wow 4.2:1, and a 2:1 mark.
    for (const [w, h] of [[352, 94], [729, 160], [679, 160], [200, 100]]) {
      assert.ok(Math.abs(area(w, h) - LOGO_AREA) / LOGO_AREA < 0.05, `${w}x${h}`);
    }
  });

  test('a wide wordmark is shorter than a square mark', () => {
    assert.ok(logoHeight(729, 160) < logoHeight(217, 160));
  });

  test('clamps tall and very wide logos', () => {
    assert.equal(logoHeight(93, 160), LOGO_MAX_HEIGHT);
    assert.equal(logoHeight(2000, 100), LOGO_MIN_HEIGHT);
  });

  test('falls back to the old fixed height without dimensions', () => {
    assert.equal(logoHeight(null, 160), 36);
    assert.equal(logoHeight(100, 0), 36);
    assert.equal(logoHeight(undefined, undefined), 36);
  });
});
