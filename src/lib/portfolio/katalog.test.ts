import assert from 'node:assert/strict';
import { existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, test } from 'node:test';
import sharp from 'sharp';
import { BESPOKE_SLUGS } from './bespoke';
import { type Catalog, KATALOG, KATALOG_DIR, katalogFiles, SETELAH_TAYANG } from './katalog';

const dir = path.join(process.cwd(), 'public', KATALOG_DIR);
const entries = Object.entries(KATALOG).filter((e): e is [string, Catalog] => Boolean(e[1]));

/** Every string a reader sees. Alt text is left out: it may say "data contoh" (claude-global, Teks UI). */
function visible(c: Catalog): string[] {
  return [
    c.heading,
    c.cta.eyebrow,
    c.cta.heading,
    ...c.groups.flatMap((g) => [g.role, g.title, g.body, ...g.more.flatMap((m) => [m.name, m.body])]),
    ...c.fitsFor.flatMap((f) => [f.field, f.example]),
  ];
}

describe('feature catalogue', () => {
  test('every bespoke page has a catalogue', () => {
    for (const slug of BESPOKE_SLUGS) assert.ok(KATALOG[slug], `${slug} has no catalogue`);
  });

  test('every screen exists, is versioned, within budget, and sized as recorded', async () => {
    for (const [slug, c] of entries) {
      for (const g of c.groups) {
        const file = path.join(dir, g.shot.file);
        assert.ok(existsSync(file), `${slug}: ${g.shot.file} is missing`);
        assert.match(g.shot.file, /^[a-z0-9-]+\.v\d+\.webp$/, `${slug}: ${g.shot.file} is not a versioned webp`);
        assert.ok(statSync(file).size <= 300 * 1024, `${slug}: ${g.shot.file} is over 300 KB`);
        const meta = await sharp(file).metadata();
        assert.deepEqual([meta.width, meta.height], [g.shot.width, g.shot.height], `${slug}: ${g.shot.file} size differs from the data`);
        assert.ok(g.shot.alt.length >= 10, `${slug}: alt for ${g.shot.file} is too short`);
        const ratio = g.shot.height / g.shot.width;
        const want = g.shot.frame === 'phone' ? 844 / 390 : 10 / 16;
        assert.ok(Math.abs(ratio - want) < 0.02, `${slug}: ${g.shot.file} does not fit its ${g.shot.frame} frame`);
      }
    }
  });

  test('no file in the folder is left unused', () => {
    const named = new Set(katalogFiles());
    const unused = existsSync(dir) ? readdirSync(dir).filter((f) => !named.has(f)) : [];
    assert.deepEqual(unused, []);
  });

  test('each catalogue has 3 to 5 groups, 2 to 4 more features each, and 3 to 4 fits', () => {
    for (const [slug, c] of entries) {
      assert.ok(c.groups.length >= 3 && c.groups.length <= 5, `${slug}: ${c.groups.length} groups`);
      for (const g of c.groups) assert.ok(g.more.length >= 2 && g.more.length <= 4, `${slug}/${g.role}: ${g.more.length} more`);
      assert.ok(c.fitsFor.length >= 3 && c.fitsFor.length <= 4, `${slug}: ${c.fitsFor.length} fits`);
      assert.equal(new Set(c.groups.map((g) => g.role)).size, c.groups.length, `${slug}: two groups share a role`);
    }
  });

  test('copy is plain, spoken Indonesian without the marks the site rules out', () => {
    const banned: Array<[RegExp, string]> = [
      [/ · | — | \| |→/, 'joins phrases with a symbol (Teks UI)'],
      [/\b(merupakan|tersebut|guna|terdapat|apabila)\b/i, 'formal written marker (bahasa-lisan cek 4)'],
      [/\b(contoh|fiktif|ilustrasi|demo)\b/i, 'the page explaining itself (cek 7)'],
      [/\b(paling|terbaik|nomor satu|tercanggih)\b/i, 'superlative without proof (EPI 1.2.2)'],
    ];
    for (const [slug, c] of entries) {
      for (const text of [...visible(c), ...SETELAH_TAYANG.flatMap((j) => [j.name, j.body])]) {
        for (const [re, why] of banned) assert.doesNotMatch(text, re, `${slug}: "${text}" ${why}`);
      }
    }
  });

  test('no name that must stay off the public pages', () => {
    // Client and partner names, banks and wallets, the exchange, and the word the Chicken Wow site
    // itself rejects (its partnership is "bukan franchise").
    const banned = /\b(franchise|waralaba|Geprek Wow|Masaya|Binance|BCA|BRI|BNI|Mandiri|GoPay|OVO|ShopeePay|Livin|ESB|Accurate|Sumopod)\b/i;
    // The wallet is written in capitals; "dana" in lower case is the ordinary word for funds.
    const wallet = /\bDANA\b/;
    for (const [slug, c] of entries) {
      for (const text of [...visible(c), ...c.groups.map((g) => g.shot.alt)]) {
        assert.doesNotMatch(text, banned, `${slug}: "${text}"`);
        assert.doesNotMatch(text, wallet, `${slug}: "${text}"`);
      }
    }
  });
});
