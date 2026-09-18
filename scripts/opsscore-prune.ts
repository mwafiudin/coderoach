/**
 * Retention for OpsScore data. Deletes sessions that were abandoned before the gate, along with the
 * partial leads attached to them, after they go stale. Sessions that reached the gate are kept:
 * those people asked to be contacted.
 *
 * Dry run by default. Nothing is deleted without --apply:
 *   npx tsx --env-file=.env.local scripts/opsscore-prune.ts
 *   npx tsx --env-file=.env.local scripts/opsscore-prune.ts --months 12 --apply
 */
import { getPayload } from 'payload';
import config from '../src/payload.config';

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const monthsArg = args.indexOf('--months');
const months = monthsArg >= 0 ? Number(args[monthsArg + 1]) : 12;

if (!Number.isFinite(months) || months < 1) {
  console.error('--months must be a positive number of months');
  process.exit(1);
}

const cutoff = new Date();
cutoff.setMonth(cutoff.getMonth() - months);

const payload = await getPayload({ config });

const { docs: stale } = await payload.find({
  collection: 'assessment-sessions',
  where: {
    and: [{ status: { not_equals: 'gated' } }, { createdAt: { less_than: cutoff.toISOString() } }],
  },
  limit: 5000,
  depth: 0,
  overrideAccess: true,
});

console.log(
  `${stale.length} sessions before ${cutoff.toISOString().slice(0, 10)} never reached the gate.`,
);

if (!apply) {
  console.log('Dry run. Re-run with --apply to delete them and their leads.');
  process.exit(0);
}

let removed = 0;
for (const session of stale) {
  const { docs: leads } = await payload.find({
    collection: 'assessment-leads',
    where: { session: { equals: session.id } },
    limit: 10,
    depth: 0,
    overrideAccess: true,
  });
  for (const lead of leads) {
    await payload.delete({ collection: 'assessment-leads', id: lead.id, overrideAccess: true });
  }
  await payload.delete({ collection: 'assessment-sessions', id: session.id, overrideAccess: true });
  removed += 1;
}

console.log(`Deleted ${removed} sessions and their leads.`);
process.exit(0);
