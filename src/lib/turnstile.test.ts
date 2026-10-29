import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, test, type TestContext } from 'node:test';
import { verifyTurnstile } from './turnstile';

const SECRET = 'test-secret-not-real';

function stubFetch(t: TestContext, reply: () => Promise<Response>) {
  return t.mock.method(globalThis, 'fetch', reply);
}

const json = (body: unknown) => async () => new Response(JSON.stringify(body));

describe('verifyTurnstile', () => {
  let saved: string | undefined;
  beforeEach(() => {
    saved = process.env.TURNSTILE_SECRET_KEY;
    process.env.TURNSTILE_SECRET_KEY = SECRET;
  });
  afterEach(() => {
    if (saved === undefined) delete process.env.TURNSTILE_SECRET_KEY;
    else process.env.TURNSTILE_SECRET_KEY = saved;
  });

  test('not configured: passes without calling Cloudflare', async (t) => {
    delete process.env.TURNSTILE_SECRET_KEY;
    const fetch = stubFetch(t, json({ success: false }));
    assert.equal(await verifyTurnstile(undefined), 'passed');
    assert.equal(fetch.mock.callCount(), 0);
  });

  test('configured but no token: missing, never sent to Cloudflare', async (t) => {
    const fetch = stubFetch(t, json({ success: true }));
    for (const token of [undefined, null, '', 42, ['tok'], { token: 'tok' }]) {
      assert.equal(await verifyTurnstile(token), 'missing', `token ${JSON.stringify(token)}`);
    }
    assert.equal(fetch.mock.callCount(), 0);
  });

  test('Cloudflare accepts: passed, with secret, token, and the client IP', async (t) => {
    const fetch = stubFetch(t, json({ success: true }));
    assert.equal(await verifyTurnstile('tok', '203.0.113.7'), 'passed');
    const [url, init] = fetch.mock.calls[0]?.arguments as [string, RequestInit];
    assert.equal(url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
    assert.equal(init.method, 'POST');
    const body = init.body as URLSearchParams;
    assert.equal(body.get('secret'), SECRET);
    assert.equal(body.get('response'), 'tok');
    assert.equal(body.get('remoteip'), '203.0.113.7');
  });

  test('"unknown" IP is not sent as remoteip', async (t) => {
    const fetch = stubFetch(t, json({ success: true }));
    await verifyTurnstile('tok', 'unknown');
    await verifyTurnstile('tok');
    for (const call of fetch.mock.calls) {
      assert.equal((call.arguments[1] as RequestInit & { body: URLSearchParams }).body.has('remoteip'), false);
    }
  });

  test('Cloudflare rejects: failed', async (t) => {
    t.mock.method(console, 'warn', () => {});
    stubFetch(t, json({ success: false, 'error-codes': ['invalid-input-response'] }));
    assert.equal(await verifyTurnstile('forged'), 'failed');
  });

  // Fail-open is the documented choice in turnstile.ts: an outage at Cloudflare should not take
  // the two lead forms down with it. These pin that choice so changing it is deliberate.
  test('Cloudflare unreachable: passed (fail-open by design)', async (t) => {
    t.mock.method(console, 'error', () => {});
    stubFetch(t, async () => {
      throw new TypeError('fetch failed');
    });
    assert.equal(await verifyTurnstile('tok'), 'passed');
  });

  test('a reply that is not JSON: passed, same as unreachable', async (t) => {
    t.mock.method(console, 'error', () => {});
    stubFetch(t, async () => new Response('<html>502</html>', { status: 502 }));
    assert.equal(await verifyTurnstile('tok'), 'passed');
  });
});
