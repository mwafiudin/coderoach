import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type { Payload } from 'payload';
import { refsIn } from './gate';
import { assumedGrants } from './grants';
import { PORTFOLIO } from './projects';
import { assetsOf, syncPortfolio, toProjectData } from './sync';

/**
 * A database that already holds every project and file as the sync would write them, except one
 * cover file that was never uploaded. Only the calls syncPortfolio makes are faked.
 */
function databaseMissing(file: string) {
  const ids = new Map<string, number>();
  for (const e of PORTFOLIO) for (const a of assetsOf(e)) if (a.file !== file && !ids.has(a.file)) ids.set(a.file, ids.size + 1);
  const meta = new Map(PORTFOLIO.flatMap((e) => assetsOf(e).map((a) => [a.file, a] as const)).reverse());
  const writes: string[] = [];
  const payload = {
    find: async ({ collection, where }: { collection: string; where?: any }) => {
      if (collection === 'services') return { docs: [] };
      if (collection === 'media') {
        const name: string = where.filename.equals;
        const a = meta.get(name);
        return { docs: ids.has(name) && a ? [{ id: ids.get(name), alt: a.alt, focalX: a.focalX ?? 50, focalY: a.focalY ?? 50 }] : [] };
      }
      const entry = PORTFOLIO.find((e) => e.slug === where.slug.equals);
      if (!entry) return { docs: [] };
      // Whatever the stored project has, it is not the missing file (which has no id yet).
      return { docs: [{ id: 1, _status: 'published', ...toProjectData(entry, undefined, ids) }] };
    },
    create: async () => writes.push('create'),
    update: async () => writes.push('update'),
  } as unknown as Payload;
  return { payload, writes };
}

describe('portfolio sync dry run', () => {
  const grants = assumedGrants(
    refsIn(PORTFOLIO),
    PORTFOLIO.flatMap((e) => (e.metrics ?? []).map((m) => m.key)),
  );

  test('reports the project whose new cover is still to be uploaded, and writes nothing', async () => {
    const { payload, writes } = databaseMissing('locascore-kelayakan.v1.webp');
    const lines: string[] = [];
    await syncPortfolio(payload, { apply: false, assetsDir: 'scripts/portfolio-assets', grants, log: (l) => lines.push(l) });
    assert.ok(lines.includes('upload     media   locascore-kelayakan.v1.webp'), lines.join('\n'));
    assert.ok(lines.includes('update     project locascore (coverImage)'), lines.join('\n'));
    assert.deepEqual(writes, []);
  });

  test('leaves every other project as it is', async () => {
    const { payload } = databaseMissing('locascore-kelayakan.v1.webp');
    const lines: string[] = [];
    await syncPortfolio(payload, { apply: false, assetsDir: 'scripts/portfolio-assets', grants, log: (l) => lines.push(l) });
    const changed = lines.filter((l) => /^(update|create) +project/.test(l));
    assert.deepEqual(changed, ['update     project locascore (coverImage)']);
  });
});
