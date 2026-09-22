/**
 * Writes the portfolio in src/lib/portfolio/projects.ts to the database: covers from
 * scripts/portfolio-assets into Media, entries into Projects (matched by slug), and the
 * retired entries back to draft.
 *
 * Dry run by default. Nothing is written without --apply:
 *   npx tsx --env-file=.env.local scripts/portfolio-sync.ts
 *   npx tsx --env-file=.env.local scripts/portfolio-sync.ts --apply
 *
 * Production keeps uploads on the Railway volume at /app/media, so run it inside the web
 * service, where both the volume and the private database are reachable:
 *   railway ssh --service web -- "npx tsx scripts/portfolio-sync.ts --apply"
 */
import path from 'node:path';
import { getPayload } from 'payload';
import config from '../src/payload.config';
import { syncPortfolio } from '../src/lib/portfolio/sync';

const apply = process.argv.includes('--apply');

const connection = process.env.DATABASE_URI || process.env.DATABASE_URL || '';
let host = 'unknown';
try {
  host = new URL(connection).host;
} catch {
  // Leave "unknown"; getPayload below reports the real problem.
}
console.log(`Database: ${host}`);
console.log(`Media storage: ${path.resolve(process.cwd(), 'media')}`);
console.log(apply ? 'Applying.\n' : 'Dry run. Re-run with --apply to write.\n');

const payload = await getPayload({ config });
await syncPortfolio(payload, {
  apply,
  assetsDir: path.resolve(process.cwd(), 'scripts/portfolio-assets'),
});

console.log(apply ? '\nDone.' : '\nNothing written.');
process.exit(0);
