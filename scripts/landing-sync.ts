/**
 * Writes the landing copy in src/lib/landing/copy.ts to the database: the top bar, the home page's
 * blocks, and the collections those blocks read (services, process phases, tenets, FAQs, clients).
 *
 * Dry run by default. Nothing is written without --apply:
 *   npx tsx --env-file=.env.local scripts/landing-sync.ts
 *   npx tsx --env-file=.env.local scripts/landing-sync.ts --apply
 *
 * In production, run it inside the web service, where the private database is reachable:
 *   railway ssh --service web -- "cd /app && npx --yes tsx scripts/landing-sync.ts --apply"
 */
import { getPayload } from 'payload';
import config from '../src/payload.config';
import { syncLanding } from '../src/lib/landing/sync';

const apply = process.argv.includes('--apply');

const connection = process.env.DATABASE_URI || process.env.DATABASE_URL || '';
let host = 'unknown';
try {
  host = new URL(connection).host;
} catch {
  // Leave "unknown"; getPayload below reports the real problem.
}
console.log(`Database: ${host}`);
console.log(apply ? 'Applying.\n' : 'Dry run. Re-run with --apply to write.\n');

const payload = await getPayload({ config });
await syncLanding(payload, { apply });

console.log(apply ? '\nDone.' : '\nNothing written.');
process.exit(0);
