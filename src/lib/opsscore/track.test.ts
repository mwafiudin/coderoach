import assert from 'node:assert/strict';
import { beforeEach, describe, test } from 'node:test';
import { parseAttributionCookie, sanitizeAttribution } from './attribution';
import { track, trackOnce } from './track';

type Call = unknown[];
let gtagCalls: Call[];
let fbqCalls: Call[];
let store: Map<string, string>;

beforeEach(() => {
  gtagCalls = [];
  fbqCalls = [];
  store = new Map();
  Object.assign(globalThis, {
    window: { gtag: (...args: Call) => gtagCalls.push(args), fbq: (...args: Call) => fbqCalls.push(args) },
    localStorage: { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => store.set(k, v) },
  });
});

describe('track', () => {
  test('sends the same event name to GA4 and Meta, without empty params', () => {
    track('assessment_area_done', { area: 'sales', index: 1, empty: '', missing: undefined });
    assert.deepEqual(gtagCalls, [['event', 'assessment_area_done', { area: 'sales', index: 1 }]]);
    assert.deepEqual(fbqCalls, [['trackCustom', 'assessment_area_done', { area: 'sales', index: 1 }]]);
  });

  test('gate submit is the standard Lead event on Meta', () => {
    track('assessment_gate_submit', { fase: 2, revenue_band: '100-200' });
    assert.deepEqual(gtagCalls[0], ['event', 'assessment_gate_submit', { fase: 2, revenue_band: '100-200' }]);
    assert.deepEqual(fbqCalls[0], ['track', 'Lead', { fase: 2, revenue_band: '100-200' }]);
  });

  test('trackOnce fires once per key', () => {
    trackOnce('k', 'assessment_complete', { fase: 1 });
    trackOnce('k', 'assessment_complete', { fase: 1 });
    assert.equal(gtagCalls.length, 1);
  });

  test('no analytics configured is a no-op', () => {
    Object.assign(globalThis, { window: {} });
    assert.doesNotThrow(() => track('assessment_view'));
  });
});

describe('attribution', () => {
  test('keeps known keys only, trimmed', () => {
    assert.deepEqual(sanitizeAttribution({ utm_source: ' meta ', gclid: 'g', evil: 'x', utm_term: 5 }), {
      utm_source: 'meta',
      gclid: 'g',
    });
  });

  test('parses the cookie value and survives garbage', () => {
    const value = encodeURIComponent(JSON.stringify({ utm_campaign: 'uji', referrer: 'https://google.com/' }));
    assert.deepEqual(parseAttributionCookie(value), { utm_campaign: 'uji', referrer: 'https://google.com/' });
    assert.deepEqual(parseAttributionCookie('%E0%A4%A'), {});
    assert.deepEqual(parseAttributionCookie(undefined), {});
  });
});
