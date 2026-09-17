import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_assessment_sessions_status" AS ENUM('started', 'completed', 'gated');
  CREATE TYPE "public"."enum_assessment_leads_industry" AS ENUM('produksi', 'distribusi', 'jasa', 'retail', 'kuliner', 'fashion', 'kriya', 'lainnya');
  CREATE TYPE "public"."enum_assessment_leads_employees" AS ENUM('1-5', '6-10', '11-20', '21-50', '51-100', '100+');
  CREATE TYPE "public"."enum_assessment_leads_revenue_band" AS ENUM('lt50', '50-100', '100-200', '200-400', '400-800', 'gt800');
  CREATE TYPE "public"."enum_assessment_leads_followup_status" AS ENUM('new', 'contacted', 'qualified', 'not_fit', 'converted');
  CREATE TABLE "assessment_sessions" (
  	"id" varchar PRIMARY KEY NOT NULL,
  	"share_slug" varchar NOT NULL,
  	"instrument_version" numeric DEFAULT 1 NOT NULL,
  	"status" "enum_assessment_sessions_status" DEFAULT 'started' NOT NULL,
  	"phase" numeric,
  	"total" numeric,
  	"answers" jsonb,
  	"scores" jsonb,
  	"utm" jsonb,
  	"referrer" varchar,
  	"user_agent" varchar,
  	"started_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone,
  	"gated_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "assessment_leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"session_id" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"phone_e164" varchar NOT NULL,
  	"brand" varchar NOT NULL,
  	"industry" "enum_assessment_leads_industry" NOT NULL,
  	"employees" "enum_assessment_leads_employees" NOT NULL,
  	"revenue_band" "enum_assessment_leads_revenue_band" NOT NULL,
  	"consent_at" timestamp(3) with time zone NOT NULL,
  	"followup_status" "enum_assessment_leads_followup_status" DEFAULT 'new' NOT NULL,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "assessment_sessions_id" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "assessment_leads_id" integer;
  ALTER TABLE "assessment_leads" ADD CONSTRAINT "assessment_leads_session_id_assessment_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."assessment_sessions"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "assessment_sessions_share_slug_idx" ON "assessment_sessions" USING btree ("share_slug");
  CREATE INDEX "assessment_sessions_status_idx" ON "assessment_sessions" USING btree ("status");
  CREATE INDEX "assessment_sessions_phase_idx" ON "assessment_sessions" USING btree ("phase");
  CREATE INDEX "assessment_sessions_started_at_idx" ON "assessment_sessions" USING btree ("started_at");
  CREATE INDEX "assessment_sessions_completed_at_idx" ON "assessment_sessions" USING btree ("completed_at");
  CREATE INDEX "assessment_sessions_gated_at_idx" ON "assessment_sessions" USING btree ("gated_at");
  CREATE INDEX "assessment_sessions_updated_at_idx" ON "assessment_sessions" USING btree ("updated_at");
  CREATE INDEX "assessment_sessions_created_at_idx" ON "assessment_sessions" USING btree ("created_at");
  CREATE UNIQUE INDEX "assessment_leads_session_idx" ON "assessment_leads" USING btree ("session_id");
  CREATE INDEX "assessment_leads_phone_e164_idx" ON "assessment_leads" USING btree ("phone_e164");
  CREATE INDEX "assessment_leads_revenue_band_idx" ON "assessment_leads" USING btree ("revenue_band");
  CREATE INDEX "assessment_leads_followup_status_idx" ON "assessment_leads" USING btree ("followup_status");
  CREATE INDEX "assessment_leads_updated_at_idx" ON "assessment_leads" USING btree ("updated_at");
  CREATE INDEX "assessment_leads_created_at_idx" ON "assessment_leads" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_assessment_sessions_fk" FOREIGN KEY ("assessment_sessions_id") REFERENCES "public"."assessment_sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_assessment_leads_fk" FOREIGN KEY ("assessment_leads_id") REFERENCES "public"."assessment_leads"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_assessment_sessions_id_idx" ON "payload_locked_documents_rels" USING btree ("assessment_sessions_id");
  CREATE INDEX "payload_locked_documents_rels_assessment_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("assessment_leads_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "assessment_sessions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "assessment_leads" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "assessment_sessions" CASCADE;
  DROP TABLE "assessment_leads" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_assessment_sessions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_assessment_leads_fk";
  
  DROP INDEX "payload_locked_documents_rels_assessment_sessions_id_idx";
  DROP INDEX "payload_locked_documents_rels_assessment_leads_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "assessment_sessions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "assessment_leads_id";
  DROP TYPE "public"."enum_assessment_sessions_status";
  DROP TYPE "public"."enum_assessment_leads_industry";
  DROP TYPE "public"."enum_assessment_leads_employees";
  DROP TYPE "public"."enum_assessment_leads_revenue_band";
  DROP TYPE "public"."enum_assessment_leads_followup_status";`)
}
