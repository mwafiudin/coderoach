/**
 * One-time cleanup: drop deprecated tables from old `cases` and `products`
 * collections after migration to unified `projects` collection.
 *
 * Run via: npx tsx --env-file=.env.local src/lib/drop-old-tables.ts
 */
import pg from 'pg';

const { Client } = pg;

async function main() {
  const url = process.env.DATABASE_URI || process.env.DATABASE_URL;
  if (!url) {
    console.error('DATABASE_URI not set');
    process.exit(1);
  }

  const client = new Client({ connectionString: url });
  await client.connect();

  console.log('Connected. Looking for deprecated tables...');

  const { rows } = await client.query(
    `SELECT tablename FROM pg_tables
     WHERE schemaname = 'public'
       AND (tablename LIKE 'cases%' OR tablename LIKE 'products%')
     ORDER BY tablename;`
  );

  if (rows.length > 0) {
    console.log(`Found ${rows.length} deprecated tables:`);
    rows.forEach((r) => console.log('  -', r.tablename));
    for (const r of rows) {
      console.log(`Dropping ${r.tablename}...`);
      await client.query(`DROP TABLE IF EXISTS "${r.tablename}" CASCADE;`);
    }
  } else {
    console.log('No deprecated tables found.');
  }

  // Drop orphan rel columns in shared Payload tables
  const orphanCols = [
    'payload_locked_documents_rels.cases_id',
    'payload_locked_documents_rels.products_id',
    'payload_preferences_rels.cases_id',
    'payload_preferences_rels.products_id',
  ];
  for (const col of orphanCols) {
    const [table, column] = col.split('.');
    try {
      await client.query(`ALTER TABLE "${table}" DROP COLUMN IF EXISTS "${column}";`);
      console.log(`Dropped column ${col}`);
    } catch (e) {
      console.log(`Skipped ${col}:`, (e as Error).message);
    }
  }

  // Drop deprecated enums too
  const { rows: enums } = await client.query(
    `SELECT typname FROM pg_type
     WHERE typname LIKE 'enum_cases%' OR typname LIKE 'enum_products%';`
  );
  for (const e of enums) {
    console.log(`Dropping enum ${e.typname}...`);
    await client.query(`DROP TYPE IF EXISTS "${e.typname}" CASCADE;`);
  }

  // Truncate existing content tables so Drizzle push doesn't complain about
  // adding NOT NULL columns to populated tables. Seed recreates everything.
  const contentTables = [
    'services', 'services_list', 'services_stack', 'services_case_studies', 'services_service_faq',
    'projects',
    'process_phases',
    'tenets',
    'faqs',
    'clients',
    'posts', 'posts_tags',
    'authors', 'authors_social_links',
    'media',
    'payload_locked_documents', 'payload_locked_documents_rels',
  ];
  for (const t of contentTables) {
    try {
      await client.query(`TRUNCATE TABLE "${t}" RESTART IDENTITY CASCADE;`);
      console.log(`Truncated ${t}`);
    } catch (e) {
      // Table may not exist yet — fine
    }
  }

  console.log('✓ Cleanup complete.');
  await client.end();
}

main().catch((err) => {
  console.error('Drop failed:', err);
  process.exit(1);
});
