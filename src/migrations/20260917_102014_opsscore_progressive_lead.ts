import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "assessment_leads" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "assessment_leads" ALTER COLUMN "phone_e164" DROP NOT NULL;
  ALTER TABLE "assessment_leads" ALTER COLUMN "brand" DROP NOT NULL;
  ALTER TABLE "assessment_leads" ALTER COLUMN "industry" DROP NOT NULL;
  ALTER TABLE "assessment_leads" ALTER COLUMN "employees" DROP NOT NULL;
  ALTER TABLE "assessment_leads" ALTER COLUMN "revenue_band" DROP NOT NULL;
  ALTER TABLE "assessment_leads" ALTER COLUMN "consent_at" DROP NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "assessment_leads" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "assessment_leads" ALTER COLUMN "phone_e164" SET NOT NULL;
  ALTER TABLE "assessment_leads" ALTER COLUMN "brand" SET NOT NULL;
  ALTER TABLE "assessment_leads" ALTER COLUMN "industry" SET NOT NULL;
  ALTER TABLE "assessment_leads" ALTER COLUMN "employees" SET NOT NULL;
  ALTER TABLE "assessment_leads" ALTER COLUMN "revenue_band" SET NOT NULL;
  ALTER TABLE "assessment_leads" ALTER COLUMN "consent_at" SET NOT NULL;`)
}
