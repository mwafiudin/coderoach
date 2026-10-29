import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { healthResponse } from './health';

type Load = Parameters<typeof healthResponse>[0];

// What a real failure looks like from postgres: SQL, a column name, a host. None of it may leave.
const LEAK = 'column "hero_kicker" does not exist at 10.0.0.5:5432 select * from "pages"';

function fakePayload(opts: { failFind?: string; failGlobal?: string } = {}) {
  const finds: { collection: string; draft: boolean }[] = [];
  const globals: string[] = [];
  const payload = {
    config: {
      collections: [
        { slug: 'pages', versions: { drafts: true } },
        { slug: 'media', versions: false },
        { slug: 'payload-migrations' },
      ],
      globals: [{ slug: 'site' }, { slug: 'footer' }],
    },
    async find(args: { collection: string; draft: boolean }) {
      if (args.collection === opts.failFind) throw new Error(LEAK);
      finds.push({ collection: args.collection, draft: args.draft });
      return { docs: [] };
    },
    async findGlobal(args: { slug: string }) {
      if (args.slug === opts.failGlobal) throw new Error(LEAK);
      globals.push(args.slug);
      return {};
    },
  };
  return { load: (async () => payload) as unknown as Load, finds, globals };
}

async function failsClosed(res: Response) {
  assert.equal(res.status, 503);
  assert.equal(res.headers.get('cache-control'), 'no-store');
  const text = await res.text();
  assert.deepEqual(JSON.parse(text), { ok: false });
  assert.ok(!text.includes('hero_kicker') && !text.includes('10.0.0.5'), 'raw error reached the body');
}

describe('healthResponse', () => {
  test('payload failing to start: 503 with no error detail in the body', async (t) => {
    const log = t.mock.method(console, 'error', () => {});
    const res = await healthResponse(async () => {
      throw new Error(LEAK);
    });
    await failsClosed(res);
    // The detail still goes somewhere a person can read it.
    assert.equal(log.mock.callCount(), 1);
    assert.match(String(log.mock.calls[0]?.arguments[1]), /hero_kicker/);
  });

  test('a collection the database cannot serve: 503, same body', async (t) => {
    t.mock.method(console, 'error', () => {});
    await failsClosed(await healthResponse(fakePayload({ failFind: 'media' }).load));
  });

  test('a global the database cannot serve: 503, same body', async (t) => {
    t.mock.method(console, 'error', () => {});
    await failsClosed(await healthResponse(fakePayload({ failGlobal: 'footer' }).load));
  });

  test('healthy: reads every collection and global once, skips payload-migrations', async () => {
    const fake = fakePayload();
    const res = await healthResponse(fake.load);
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('cache-control'), 'no-store');
    assert.deepEqual(await res.json(), { ok: true });
    assert.deepEqual(fake.finds, [
      { collection: 'pages', draft: true },
      { collection: 'media', draft: false },
    ]);
    assert.deepEqual(fake.globals, ['site', 'footer']);
  });
});
