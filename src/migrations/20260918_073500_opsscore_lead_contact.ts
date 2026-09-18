import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "assessment_leads" ADD COLUMN "email" varchar;
   ALTER TABLE "assessment_leads" ADD COLUMN "website" varchar;
   ALTER TABLE "assessment_leads" ADD COLUMN "repeat_contact" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "assessment_leads" DROP COLUMN "email";
   ALTER TABLE "assessment_leads" DROP COLUMN "website";
   ALTER TABLE "assessment_leads" DROP COLUMN "repeat_contact";`)
}
