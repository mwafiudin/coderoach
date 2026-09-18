import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Counter rows for the API rate limits. Deliberately not a Payload collection: a collection would
 * pull the table into payload_locked_documents_rels and every document write would join against it.
 */

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "rate_limits" (
     "id" serial PRIMARY KEY NOT NULL,
     "key" varchar NOT NULL,
     "count" numeric DEFAULT 0 NOT NULL,
     "reset_at" timestamp(3) with time zone NOT NULL,
     "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
     "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
   );
   CREATE UNIQUE INDEX IF NOT EXISTS "rate_limits_key_idx" ON "rate_limits" USING btree ("key");
   CREATE INDEX IF NOT EXISTS "rate_limits_reset_at_idx" ON "rate_limits" USING btree ("reset_at");
   CREATE INDEX IF NOT EXISTS "rate_limits_updated_at_idx" ON "rate_limits" USING btree ("updated_at");
   CREATE INDEX IF NOT EXISTS "rate_limits_created_at_idx" ON "rate_limits" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "rate_limits";`)
}
