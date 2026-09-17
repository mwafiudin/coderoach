import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "submissions" ADD COLUMN "assessment_session_id" varchar;
  ALTER TABLE "submissions" ADD CONSTRAINT "submissions_assessment_session_id_assessment_sessions_id_fk" FOREIGN KEY ("assessment_session_id") REFERENCES "public"."assessment_sessions"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "submissions_assessment_session_idx" ON "submissions" USING btree ("assessment_session_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "submissions" DROP CONSTRAINT "submissions_assessment_session_id_assessment_sessions_id_fk";
  
  DROP INDEX "submissions_assessment_session_idx";
  ALTER TABLE "submissions" DROP COLUMN "assessment_session_id";`)
}
