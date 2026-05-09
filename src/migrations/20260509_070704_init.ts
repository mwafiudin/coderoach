import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_service_list_source" AS ENUM('all', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_faq_source" AS ENUM('collection', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_max_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_tone" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_service_list_source" AS ENUM('all', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_source" AS ENUM('collection', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_max_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_tone" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_icon" AS ENUM('build', 'automate', 'intelligence', 'augment');
  CREATE TYPE "public"."enum_projects_kind" AS ENUM('client', 'studio');
  CREATE TYPE "public"."enum_projects_industry" AS ENUM('fb', 'logistics', 'finance', 'agency', 'vc', 'manufacturing', 'other');
  CREATE TYPE "public"."enum_projects_studio_viz_type" AS ENUM('laporta', 'viralytics', 'none');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_kind" AS ENUM('client', 'studio');
  CREATE TYPE "public"."enum__projects_v_version_industry" AS ENUM('fb', 'logistics', 'finance', 'agency', 'vc', 'manufacturing', 'other');
  CREATE TYPE "public"."enum__projects_v_version_studio_viz_type" AS ENUM('laporta', 'viralytics', 'none');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_process_phases_icon" AS ENUM('discover', 'design', 'layers', 'handoff');
  CREATE TYPE "public"."enum_tenets_icon" AS ENUM('users', 'voice', 'shield');
  CREATE TYPE "public"."enum_posts_category" AS ENUM('engineering', 'operating', 'studio', 'notes');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_category" AS ENUM('engineering', 'operating', 'studio', 'notes');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_submissions_scope" AS ENUM('Build', 'Automate', 'Intelligence', 'Augment', 'Belum yakin', 'Other');
  CREATE TYPE "public"."enum_submissions_status" AS ENUM('new', 'contacted', 'archived');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_meta_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pill_text" varchar,
  	"headline_lead" varchar,
  	"headline_accent" varchar,
  	"lede" varchar,
  	"cta_primary_label" varchar DEFAULT 'Get started',
  	"cta_primary_href" varchar DEFAULT '#contact',
  	"cta_secondary_label" varchar,
  	"cta_secondary_href" varchar,
  	"show_ops_console" boolean DEFAULT true,
  	"show_trusted_by" boolean DEFAULT true,
  	"trusted_by_label" varchar DEFAULT 'Trusted by',
  	"trusted_by_tagline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_marker" varchar DEFAULT '[ 01 / 07 ]',
  	"category" varchar DEFAULT 'Services',
  	"description" varchar,
  	"heading" varchar,
  	"lede" varchar,
  	"source" "enum_pages_blocks_service_list_source" DEFAULT 'all',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_work" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_marker" varchar DEFAULT '[ 02 / 07 ]',
  	"category" varchar DEFAULT 'Work',
  	"description" varchar,
  	"heading" varchar,
  	"lede" varchar,
  	"featured_project_id" integer,
  	"show_view_all_link" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_marker" varchar DEFAULT '[ 03 / 07 ]',
  	"category" varchar DEFAULT 'Products',
  	"description" varchar,
  	"heading" varchar,
  	"lede" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_marker" varchar DEFAULT '[ 04 / 07 ]',
  	"category" varchar DEFAULT 'Process',
  	"description" varchar,
  	"heading" varchar,
  	"lede" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_studio_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"accent" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_studio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_marker" varchar DEFAULT '[ 05 / 07 ] · Studio',
  	"heading" varchar,
  	"lede" varchar,
  	"pull_quote_quote" varchar,
  	"pull_quote_attribution" varchar,
  	"full_studio_link_label" varchar DEFAULT 'See the full studio →',
  	"full_studio_link_href" varchar DEFAULT '/studio',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_marker" varchar DEFAULT '[ 06 / 07 ]',
  	"category" varchar DEFAULT 'Field Notes',
  	"heading" varchar,
  	"lede" varchar,
  	"limit" numeric DEFAULT 3,
  	"show_view_all_link" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_custom_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_marker" varchar DEFAULT 'FAQ',
  	"heading" varchar DEFAULT 'Things you''re probably wondering.',
  	"source" "enum_pages_blocks_faq_source" DEFAULT 'collection',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_scopes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"scope" varchar
  );
  
  CREATE TABLE "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_marker" varchar DEFAULT '[ CONTACT ]',
  	"heading_line1" varchar,
  	"heading_line2_accent" varchar,
  	"lede" varchar,
  	"form_labels_submit" varchar DEFAULT 'Send the brief →',
  	"form_labels_email_fallback" varchar DEFAULT 'hello@example.com',
  	"success_heading" varchar DEFAULT 'Thanks — we got your brief.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"max_width" "enum_pages_blocks_rich_text_max_width" DEFAULT 'narrow',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"cta_label" varchar DEFAULT 'Get in touch',
  	"cta_href" varchar DEFAULT '#contact',
  	"tone" "enum_pages_blocks_cta_banner_tone" DEFAULT 'dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_grid_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"accent" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"projects_id" integer,
  	"process_phases_id" integer,
  	"tenets_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_meta_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"pill_text" varchar,
  	"headline_lead" varchar,
  	"headline_accent" varchar,
  	"lede" varchar,
  	"cta_primary_label" varchar DEFAULT 'Get started',
  	"cta_primary_href" varchar DEFAULT '#contact',
  	"cta_secondary_label" varchar,
  	"cta_secondary_href" varchar,
  	"show_ops_console" boolean DEFAULT true,
  	"show_trusted_by" boolean DEFAULT true,
  	"trusted_by_label" varchar DEFAULT 'Trusted by',
  	"trusted_by_tagline" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_marker" varchar DEFAULT '[ 01 / 07 ]',
  	"category" varchar DEFAULT 'Services',
  	"description" varchar,
  	"heading" varchar,
  	"lede" varchar,
  	"source" "enum__pages_v_blocks_service_list_source" DEFAULT 'all',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_work" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_marker" varchar DEFAULT '[ 02 / 07 ]',
  	"category" varchar DEFAULT 'Work',
  	"description" varchar,
  	"heading" varchar,
  	"lede" varchar,
  	"featured_project_id" integer,
  	"show_view_all_link" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_marker" varchar DEFAULT '[ 03 / 07 ]',
  	"category" varchar DEFAULT 'Products',
  	"description" varchar,
  	"heading" varchar,
  	"lede" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_marker" varchar DEFAULT '[ 04 / 07 ]',
  	"category" varchar DEFAULT 'Process',
  	"description" varchar,
  	"heading" varchar,
  	"lede" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_studio_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"accent" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_studio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_marker" varchar DEFAULT '[ 05 / 07 ] · Studio',
  	"heading" varchar,
  	"lede" varchar,
  	"pull_quote_quote" varchar,
  	"pull_quote_attribution" varchar,
  	"full_studio_link_label" varchar DEFAULT 'See the full studio →',
  	"full_studio_link_href" varchar DEFAULT '/studio',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_marker" varchar DEFAULT '[ 06 / 07 ]',
  	"category" varchar DEFAULT 'Field Notes',
  	"heading" varchar,
  	"lede" varchar,
  	"limit" numeric DEFAULT 3,
  	"show_view_all_link" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_custom_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_marker" varchar DEFAULT 'FAQ',
  	"heading" varchar DEFAULT 'Things you''re probably wondering.',
  	"source" "enum__pages_v_blocks_faq_source" DEFAULT 'collection',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_scopes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"scope" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_marker" varchar DEFAULT '[ CONTACT ]',
  	"heading_line1" varchar,
  	"heading_line2_accent" varchar,
  	"lede" varchar,
  	"form_labels_submit" varchar DEFAULT 'Send the brief →',
  	"form_labels_email_fallback" varchar DEFAULT 'hello@example.com',
  	"success_heading" varchar DEFAULT 'Thanks — we got your brief.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"max_width" "enum__pages_v_blocks_rich_text_max_width" DEFAULT 'narrow',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"cta_label" varchar DEFAULT 'Get in touch',
  	"cta_href" varchar DEFAULT '#contact',
  	"tone" "enum__pages_v_blocks_cta_banner_tone" DEFAULT 'dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_grid_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"accent" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"projects_id" integer,
  	"process_phases_id" integer,
  	"tenets_id" integer
  );
  
  CREATE TABLE "services_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "services_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tech" varchar NOT NULL
  );
  
  CREATE TABLE "services_service_f_a_q" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"slug" varchar NOT NULL,
  	"tag" varchar NOT NULL,
  	"icon" "enum_services_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"tagline" varchar NOT NULL,
  	"blurb" varchar NOT NULL,
  	"hero_lede" varchar,
  	"rich_content" jsonb,
  	"pricing_note" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  CREATE TABLE "projects_pills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pill" varchar
  );
  
  CREATE TABLE "projects_featured_details_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"accent" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "projects_featured_details_code_panel_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar
  );
  
  CREATE TABLE "projects_featured_details_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tech" varchar
  );
  
  CREATE TABLE "projects_studio_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"bullet" varchar
  );
  
  CREATE TABLE "projects_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"kind" "enum_projects_kind" DEFAULT 'client',
  	"order" numeric DEFAULT 0,
  	"featured" boolean DEFAULT false,
  	"industry" "enum_projects_industry",
  	"service_id" integer,
  	"published_year" varchar,
  	"client" varchar,
  	"tagline" varchar,
  	"meta" varchar,
  	"excerpt" varchar,
  	"rich_content" jsonb,
  	"featured_details_badge_label" varchar DEFAULT '[ FEATURED · 2026 ]',
  	"featured_details_shipped_label" varchar DEFAULT '[ ✓ SHIPPED ]',
  	"featured_details_meta_line" varchar,
  	"featured_details_headline" varchar,
  	"featured_details_description" varchar,
  	"featured_details_code_panel_tag" varchar DEFAULT '[ .TS ]',
  	"featured_details_code_panel_path" varchar,
  	"studio_viz_type" "enum_projects_studio_viz_type",
  	"studio_usage" varchar,
  	"studio_external_link_label" varchar,
  	"studio_external_link_href" varchar,
  	"cover_image_id" integer,
  	"testimonial_quote" varchar,
  	"testimonial_author" varchar,
  	"testimonial_role" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  CREATE TABLE "_projects_v_version_pills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"pill" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_featured_details_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"num" varchar,
  	"accent" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_featured_details_code_panel_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"line" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_featured_details_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tech" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_studio_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"bullet" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_kind" "enum__projects_v_version_kind" DEFAULT 'client',
  	"version_order" numeric DEFAULT 0,
  	"version_featured" boolean DEFAULT false,
  	"version_industry" "enum__projects_v_version_industry",
  	"version_service_id" integer,
  	"version_published_year" varchar,
  	"version_client" varchar,
  	"version_tagline" varchar,
  	"version_meta" varchar,
  	"version_excerpt" varchar,
  	"version_rich_content" jsonb,
  	"version_featured_details_badge_label" varchar DEFAULT '[ FEATURED · 2026 ]',
  	"version_featured_details_shipped_label" varchar DEFAULT '[ ✓ SHIPPED ]',
  	"version_featured_details_meta_line" varchar,
  	"version_featured_details_headline" varchar,
  	"version_featured_details_description" varchar,
  	"version_featured_details_code_panel_tag" varchar DEFAULT '[ .TS ]',
  	"version_featured_details_code_panel_path" varchar,
  	"version_studio_viz_type" "enum__projects_v_version_studio_viz_type",
  	"version_studio_usage" varchar,
  	"version_studio_external_link_label" varchar,
  	"version_studio_external_link_href" varchar,
  	"version_cover_image_id" integer,
  	"version_testimonial_quote" varchar,
  	"version_testimonial_author" varchar,
  	"version_testimonial_role" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  CREATE TABLE "process_phases" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"tag" varchar NOT NULL,
  	"icon" "enum_process_phases_icon" NOT NULL,
  	"name" varchar NOT NULL,
  	"what" varchar NOT NULL,
  	"deliv" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tenets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"icon" "enum_tenets_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "clients" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer,
  	"logo_dark_id" integer,
  	"website" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"category" "enum_posts_category" DEFAULT 'engineering',
  	"author_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"featured" boolean DEFAULT false,
  	"reading_time" numeric,
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"cover_image_id" integer,
  	"og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_posts_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_category" "enum__posts_v_version_category" DEFAULT 'engineering',
  	"version_author_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_featured" boolean DEFAULT false,
  	"version_reading_time" numeric,
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_cover_image_id" integer,
  	"version_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "authors_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "authors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"role" varchar,
  	"bio" varchar,
  	"avatar_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"scope" "enum_submissions_scope",
  	"brief" varchar NOT NULL,
  	"submitted_at" timestamp(3) with time zone,
  	"status" "enum_submissions_status" DEFAULT 'new',
  	"user_agent" varchar,
  	"referrer" varchar,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"services_id" integer,
  	"projects_id" integer,
  	"process_phases_id" integer,
  	"tenets_id" integer,
  	"faqs_id" integer,
  	"clients_id" integer,
  	"posts_id" integer,
  	"authors_id" integer,
  	"submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "hero_meta_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"pill_text" varchar NOT NULL,
  	"headline_lead" varchar NOT NULL,
  	"headline_accent" varchar NOT NULL,
  	"lede" varchar NOT NULL,
  	"cta_primary_label" varchar DEFAULT 'Start a 48-hour discovery' NOT NULL,
  	"cta_primary_href" varchar DEFAULT '#contact' NOT NULL,
  	"cta_secondary_label" varchar DEFAULT 'See what we''ve shipped',
  	"cta_secondary_href" varchar DEFAULT '#work',
  	"trusted_by_label" varchar DEFAULT '// TRUSTED BY 40+ OPERATORS',
  	"trusted_by_tagline" varchar DEFAULT 'Across Indonesia & SEA — F&B, logistics, finance, agencies.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "studio_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"num" varchar NOT NULL,
  	"accent" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "studio_about_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "studio" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_marker" varchar DEFAULT 'Who you''ll work with',
  	"heading" varchar NOT NULL,
  	"lede" varchar NOT NULL,
  	"about_page_heading" varchar DEFAULT 'A studio that ships.',
  	"about_page_lede" varchar,
  	"about_mission" varchar,
  	"about_story" jsonb,
  	"about_workspace_address" varchar DEFAULT 'Kemang, Jakarta Selatan, Indonesia',
  	"about_workspace_hours" varchar DEFAULT 'Mon–Fri · 09:00–18:00 WIB · async otherwise',
  	"about_workspace_tagline" varchar DEFAULT 'Walk-ins by appointment.',
  	"about_workspace_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_scopes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"scope" varchar NOT NULL
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_marker" varchar DEFAULT 'Start a project',
  	"heading_line1" varchar DEFAULT 'Got something to ship?' NOT NULL,
  	"heading_line2_accent" varchar DEFAULT 'Let''s talk.' NOT NULL,
  	"lede" varchar NOT NULL,
  	"form_labels_email" varchar DEFAULT '[ // YOUR EMAIL ]',
  	"form_labels_scope" varchar DEFAULT '[ // SCOPE ]',
  	"form_labels_brief" varchar DEFAULT '[ // WHAT ARE YOU SHIPPING? ]',
  	"form_labels_submit" varchar DEFAULT 'Send the brief →',
  	"form_labels_email_fallback" varchar DEFAULT 'hello@coderoach.studio',
  	"success_heading" varchar DEFAULT 'Thanks — we got your brief.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "top_bar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"tag" varchar DEFAULT '[ // NOW BOOKING ]',
  	"message" varchar NOT NULL,
  	"link_label" varchar DEFAULT 'Start a 48-hour discovery →',
  	"link_href" varchar DEFAULT '#contact',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Studio' NOT NULL,
  	"site_description" varchar,
  	"logo_id" integer,
  	"logo_dark_id" integer,
  	"favicon_id" integer,
  	"nav_status_label" varchar DEFAULT 'JKT · OPEN Q3',
  	"nav_cta_label" varchar DEFAULT 'Start a discovery →',
  	"nav_cta_href" varchar DEFAULT '#contact',
  	"footer_tagline" varchar,
  	"footer_badge" varchar DEFAULT 'JKT-1 · OPEN FOR Q3',
  	"footer_meta_line_left" varchar,
  	"footer_meta_line_right" varchar,
  	"og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "blog_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"archive_hero_section_marker" varchar DEFAULT '[ FIELD NOTES / 01 ]',
  	"archive_hero_heading" varchar DEFAULT 'Notes from the studio.',
  	"archive_hero_lede" varchar DEFAULT 'Engineering, operating, and the bits in between.',
  	"posts_per_page" numeric DEFAULT 12,
  	"default_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_meta_items" ADD CONSTRAINT "pages_blocks_hero_meta_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_list" ADD CONSTRAINT "pages_blocks_service_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_work" ADD CONSTRAINT "pages_blocks_work_featured_project_id_projects_id_fk" FOREIGN KEY ("featured_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_work" ADD CONSTRAINT "pages_blocks_work_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_products" ADD CONSTRAINT "pages_blocks_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process" ADD CONSTRAINT "pages_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_studio_stats" ADD CONSTRAINT "pages_blocks_studio_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_studio" ADD CONSTRAINT "pages_blocks_studio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_notes" ADD CONSTRAINT "pages_blocks_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_custom_items" ADD CONSTRAINT "pages_blocks_faq_custom_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_scopes" ADD CONSTRAINT "pages_blocks_contact_scopes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner" ADD CONSTRAINT "pages_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_grid_stats" ADD CONSTRAINT "pages_blocks_stats_grid_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_grid" ADD CONSTRAINT "pages_blocks_stats_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_process_phases_fk" FOREIGN KEY ("process_phases_id") REFERENCES "public"."process_phases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_tenets_fk" FOREIGN KEY ("tenets_id") REFERENCES "public"."tenets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_meta_items" ADD CONSTRAINT "_pages_v_blocks_hero_meta_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_list" ADD CONSTRAINT "_pages_v_blocks_service_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_work" ADD CONSTRAINT "_pages_v_blocks_work_featured_project_id_projects_id_fk" FOREIGN KEY ("featured_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_work" ADD CONSTRAINT "_pages_v_blocks_work_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_products" ADD CONSTRAINT "_pages_v_blocks_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process" ADD CONSTRAINT "_pages_v_blocks_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_studio_stats" ADD CONSTRAINT "_pages_v_blocks_studio_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_studio" ADD CONSTRAINT "_pages_v_blocks_studio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_notes" ADD CONSTRAINT "_pages_v_blocks_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_custom_items" ADD CONSTRAINT "_pages_v_blocks_faq_custom_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_scopes" ADD CONSTRAINT "_pages_v_blocks_contact_scopes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_banner" ADD CONSTRAINT "_pages_v_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_grid_stats" ADD CONSTRAINT "_pages_v_blocks_stats_grid_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_grid" ADD CONSTRAINT "_pages_v_blocks_stats_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_process_phases_fk" FOREIGN KEY ("process_phases_id") REFERENCES "public"."process_phases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_tenets_fk" FOREIGN KEY ("tenets_id") REFERENCES "public"."tenets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_list" ADD CONSTRAINT "services_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_stack" ADD CONSTRAINT "services_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_service_f_a_q" ADD CONSTRAINT "services_service_f_a_q_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_pills" ADD CONSTRAINT "projects_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_featured_details_metrics" ADD CONSTRAINT "projects_featured_details_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_featured_details_code_panel_lines" ADD CONSTRAINT "projects_featured_details_code_panel_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_featured_details_stack" ADD CONSTRAINT "projects_featured_details_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_studio_bullets" ADD CONSTRAINT "projects_studio_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_pills" ADD CONSTRAINT "_projects_v_version_pills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_featured_details_metrics" ADD CONSTRAINT "_projects_v_version_featured_details_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_featured_details_code_panel_lines" ADD CONSTRAINT "_projects_v_version_featured_details_code_panel_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_featured_details_stack" ADD CONSTRAINT "_projects_v_version_featured_details_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_studio_bullets" ADD CONSTRAINT "_projects_v_version_studio_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_service_id_services_id_fk" FOREIGN KEY ("version_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "clients" ADD CONSTRAINT "clients_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "clients" ADD CONSTRAINT "clients_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_version_tags" ADD CONSTRAINT "_posts_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_author_id_authors_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_og_image_id_media_id_fk" FOREIGN KEY ("version_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "authors_social_links" ADD CONSTRAINT "authors_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "authors" ADD CONSTRAINT "authors_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_process_phases_fk" FOREIGN KEY ("process_phases_id") REFERENCES "public"."process_phases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tenets_fk" FOREIGN KEY ("tenets_id") REFERENCES "public"."tenets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_clients_fk" FOREIGN KEY ("clients_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_submissions_fk" FOREIGN KEY ("submissions_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_meta_items" ADD CONSTRAINT "hero_meta_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studio_stats" ADD CONSTRAINT "studio_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studio_about_timeline" ADD CONSTRAINT "studio_about_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studio" ADD CONSTRAINT "studio_about_workspace_image_id_media_id_fk" FOREIGN KEY ("about_workspace_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_scopes" ADD CONSTRAINT "contact_scopes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_columns_links" ADD CONSTRAINT "site_settings_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_columns" ADD CONSTRAINT "site_settings_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social" ADD CONSTRAINT "site_settings_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_settings" ADD CONSTRAINT "blog_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "pages_blocks_hero_meta_items_order_idx" ON "pages_blocks_hero_meta_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_meta_items_parent_id_idx" ON "pages_blocks_hero_meta_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_list_order_idx" ON "pages_blocks_service_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_list_parent_id_idx" ON "pages_blocks_service_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_list_path_idx" ON "pages_blocks_service_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_work_order_idx" ON "pages_blocks_work" USING btree ("_order");
  CREATE INDEX "pages_blocks_work_parent_id_idx" ON "pages_blocks_work" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_work_path_idx" ON "pages_blocks_work" USING btree ("_path");
  CREATE INDEX "pages_blocks_work_featured_project_idx" ON "pages_blocks_work" USING btree ("featured_project_id");
  CREATE INDEX "pages_blocks_products_order_idx" ON "pages_blocks_products" USING btree ("_order");
  CREATE INDEX "pages_blocks_products_parent_id_idx" ON "pages_blocks_products" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_products_path_idx" ON "pages_blocks_products" USING btree ("_path");
  CREATE INDEX "pages_blocks_process_order_idx" ON "pages_blocks_process" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_parent_id_idx" ON "pages_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_path_idx" ON "pages_blocks_process" USING btree ("_path");
  CREATE INDEX "pages_blocks_studio_stats_order_idx" ON "pages_blocks_studio_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_studio_stats_parent_id_idx" ON "pages_blocks_studio_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_studio_order_idx" ON "pages_blocks_studio" USING btree ("_order");
  CREATE INDEX "pages_blocks_studio_parent_id_idx" ON "pages_blocks_studio" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_studio_path_idx" ON "pages_blocks_studio" USING btree ("_path");
  CREATE INDEX "pages_blocks_notes_order_idx" ON "pages_blocks_notes" USING btree ("_order");
  CREATE INDEX "pages_blocks_notes_parent_id_idx" ON "pages_blocks_notes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_notes_path_idx" ON "pages_blocks_notes" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_custom_items_order_idx" ON "pages_blocks_faq_custom_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_custom_items_parent_id_idx" ON "pages_blocks_faq_custom_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_scopes_order_idx" ON "pages_blocks_contact_scopes" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_scopes_parent_id_idx" ON "pages_blocks_contact_scopes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_banner_order_idx" ON "pages_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_banner_parent_id_idx" ON "pages_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_banner_path_idx" ON "pages_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_grid_stats_order_idx" ON "pages_blocks_stats_grid_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_grid_stats_parent_id_idx" ON "pages_blocks_stats_grid_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_grid_order_idx" ON "pages_blocks_stats_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_grid_parent_id_idx" ON "pages_blocks_stats_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_grid_path_idx" ON "pages_blocks_stats_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "pages_rels_projects_id_idx" ON "pages_rels" USING btree ("projects_id");
  CREATE INDEX "pages_rels_process_phases_id_idx" ON "pages_rels" USING btree ("process_phases_id");
  CREATE INDEX "pages_rels_tenets_id_idx" ON "pages_rels" USING btree ("tenets_id");
  CREATE INDEX "_pages_v_blocks_hero_meta_items_order_idx" ON "_pages_v_blocks_hero_meta_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_meta_items_parent_id_idx" ON "_pages_v_blocks_hero_meta_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_service_list_order_idx" ON "_pages_v_blocks_service_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_list_parent_id_idx" ON "_pages_v_blocks_service_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_list_path_idx" ON "_pages_v_blocks_service_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_work_order_idx" ON "_pages_v_blocks_work" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_work_parent_id_idx" ON "_pages_v_blocks_work" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_work_path_idx" ON "_pages_v_blocks_work" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_work_featured_project_idx" ON "_pages_v_blocks_work" USING btree ("featured_project_id");
  CREATE INDEX "_pages_v_blocks_products_order_idx" ON "_pages_v_blocks_products" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_products_parent_id_idx" ON "_pages_v_blocks_products" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_products_path_idx" ON "_pages_v_blocks_products" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_process_order_idx" ON "_pages_v_blocks_process" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_parent_id_idx" ON "_pages_v_blocks_process" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_path_idx" ON "_pages_v_blocks_process" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_studio_stats_order_idx" ON "_pages_v_blocks_studio_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_studio_stats_parent_id_idx" ON "_pages_v_blocks_studio_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_studio_order_idx" ON "_pages_v_blocks_studio" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_studio_parent_id_idx" ON "_pages_v_blocks_studio" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_studio_path_idx" ON "_pages_v_blocks_studio" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_notes_order_idx" ON "_pages_v_blocks_notes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_notes_parent_id_idx" ON "_pages_v_blocks_notes" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_notes_path_idx" ON "_pages_v_blocks_notes" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_custom_items_order_idx" ON "_pages_v_blocks_faq_custom_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_custom_items_parent_id_idx" ON "_pages_v_blocks_faq_custom_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_scopes_order_idx" ON "_pages_v_blocks_contact_scopes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_scopes_parent_id_idx" ON "_pages_v_blocks_contact_scopes" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_order_idx" ON "_pages_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_parent_id_idx" ON "_pages_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_path_idx" ON "_pages_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_banner_order_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_banner_parent_id_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_banner_path_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_grid_stats_order_idx" ON "_pages_v_blocks_stats_grid_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_grid_stats_parent_id_idx" ON "_pages_v_blocks_stats_grid_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_grid_order_idx" ON "_pages_v_blocks_stats_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_grid_parent_id_idx" ON "_pages_v_blocks_stats_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_grid_path_idx" ON "_pages_v_blocks_stats_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_og_image_idx" ON "_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id");
  CREATE INDEX "_pages_v_rels_projects_id_idx" ON "_pages_v_rels" USING btree ("projects_id");
  CREATE INDEX "_pages_v_rels_process_phases_id_idx" ON "_pages_v_rels" USING btree ("process_phases_id");
  CREATE INDEX "_pages_v_rels_tenets_id_idx" ON "_pages_v_rels" USING btree ("tenets_id");
  CREATE INDEX "services_list_order_idx" ON "services_list" USING btree ("_order");
  CREATE INDEX "services_list_parent_id_idx" ON "services_list" USING btree ("_parent_id");
  CREATE INDEX "services_stack_order_idx" ON "services_stack" USING btree ("_order");
  CREATE INDEX "services_stack_parent_id_idx" ON "services_stack" USING btree ("_parent_id");
  CREATE INDEX "services_service_f_a_q_order_idx" ON "services_service_f_a_q" USING btree ("_order");
  CREATE INDEX "services_service_f_a_q_parent_id_idx" ON "services_service_f_a_q" USING btree ("_parent_id");
  CREATE INDEX "services_order_idx" ON "services" USING btree ("order");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_projects_id_idx" ON "services_rels" USING btree ("projects_id");
  CREATE INDEX "projects_pills_order_idx" ON "projects_pills" USING btree ("_order");
  CREATE INDEX "projects_pills_parent_id_idx" ON "projects_pills" USING btree ("_parent_id");
  CREATE INDEX "projects_featured_details_metrics_order_idx" ON "projects_featured_details_metrics" USING btree ("_order");
  CREATE INDEX "projects_featured_details_metrics_parent_id_idx" ON "projects_featured_details_metrics" USING btree ("_parent_id");
  CREATE INDEX "projects_featured_details_code_panel_lines_order_idx" ON "projects_featured_details_code_panel_lines" USING btree ("_order");
  CREATE INDEX "projects_featured_details_code_panel_lines_parent_id_idx" ON "projects_featured_details_code_panel_lines" USING btree ("_parent_id");
  CREATE INDEX "projects_featured_details_stack_order_idx" ON "projects_featured_details_stack" USING btree ("_order");
  CREATE INDEX "projects_featured_details_stack_parent_id_idx" ON "projects_featured_details_stack" USING btree ("_parent_id");
  CREATE INDEX "projects_studio_bullets_order_idx" ON "projects_studio_bullets" USING btree ("_order");
  CREATE INDEX "projects_studio_bullets_parent_id_idx" ON "projects_studio_bullets" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_order_idx" ON "projects_gallery" USING btree ("_order");
  CREATE INDEX "projects_gallery_parent_id_idx" ON "projects_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_image_idx" ON "projects_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_kind_idx" ON "projects" USING btree ("kind");
  CREATE INDEX "projects_order_idx" ON "projects" USING btree ("order");
  CREATE INDEX "projects_featured_idx" ON "projects" USING btree ("featured");
  CREATE INDEX "projects_industry_idx" ON "projects" USING btree ("industry");
  CREATE INDEX "projects_service_idx" ON "projects" USING btree ("service_id");
  CREATE INDEX "projects_cover_image_idx" ON "projects" USING btree ("cover_image_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_projects_id_idx" ON "projects_rels" USING btree ("projects_id");
  CREATE INDEX "_projects_v_version_pills_order_idx" ON "_projects_v_version_pills" USING btree ("_order");
  CREATE INDEX "_projects_v_version_pills_parent_id_idx" ON "_projects_v_version_pills" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_featured_details_metrics_order_idx" ON "_projects_v_version_featured_details_metrics" USING btree ("_order");
  CREATE INDEX "_projects_v_version_featured_details_metrics_parent_id_idx" ON "_projects_v_version_featured_details_metrics" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_featured_details_code_panel_lines_order_idx" ON "_projects_v_version_featured_details_code_panel_lines" USING btree ("_order");
  CREATE INDEX "_projects_v_version_featured_details_code_panel_lines_parent_id_idx" ON "_projects_v_version_featured_details_code_panel_lines" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_featured_details_stack_order_idx" ON "_projects_v_version_featured_details_stack" USING btree ("_order");
  CREATE INDEX "_projects_v_version_featured_details_stack_parent_id_idx" ON "_projects_v_version_featured_details_stack" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_studio_bullets_order_idx" ON "_projects_v_version_studio_bullets" USING btree ("_order");
  CREATE INDEX "_projects_v_version_studio_bullets_parent_id_idx" ON "_projects_v_version_studio_bullets" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_gallery_order_idx" ON "_projects_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_version_gallery_parent_id_idx" ON "_projects_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_gallery_image_idx" ON "_projects_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_kind_idx" ON "_projects_v" USING btree ("version_kind");
  CREATE INDEX "_projects_v_version_version_order_idx" ON "_projects_v" USING btree ("version_order");
  CREATE INDEX "_projects_v_version_version_featured_idx" ON "_projects_v" USING btree ("version_featured");
  CREATE INDEX "_projects_v_version_version_industry_idx" ON "_projects_v" USING btree ("version_industry");
  CREATE INDEX "_projects_v_version_version_service_idx" ON "_projects_v" USING btree ("version_service_id");
  CREATE INDEX "_projects_v_version_version_cover_image_idx" ON "_projects_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_projects_id_idx" ON "_projects_v_rels" USING btree ("projects_id");
  CREATE INDEX "process_phases_order_idx" ON "process_phases" USING btree ("order");
  CREATE INDEX "process_phases_updated_at_idx" ON "process_phases" USING btree ("updated_at");
  CREATE INDEX "process_phases_created_at_idx" ON "process_phases" USING btree ("created_at");
  CREATE INDEX "tenets_order_idx" ON "tenets" USING btree ("order");
  CREATE INDEX "tenets_updated_at_idx" ON "tenets" USING btree ("updated_at");
  CREATE INDEX "tenets_created_at_idx" ON "tenets" USING btree ("created_at");
  CREATE INDEX "faqs_order_idx" ON "faqs" USING btree ("order");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "clients_order_idx" ON "clients" USING btree ("order");
  CREATE INDEX "clients_logo_idx" ON "clients" USING btree ("logo_id");
  CREATE INDEX "clients_logo_dark_idx" ON "clients" USING btree ("logo_dark_id");
  CREATE INDEX "clients_updated_at_idx" ON "clients" USING btree ("updated_at");
  CREATE INDEX "clients_created_at_idx" ON "clients" USING btree ("created_at");
  CREATE INDEX "posts_tags_order_idx" ON "posts_tags" USING btree ("_order");
  CREATE INDEX "posts_tags_parent_id_idx" ON "posts_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_category_idx" ON "posts" USING btree ("category");
  CREATE INDEX "posts_author_idx" ON "posts" USING btree ("author_id");
  CREATE INDEX "posts_published_at_idx" ON "posts" USING btree ("published_at");
  CREATE INDEX "posts_featured_idx" ON "posts" USING btree ("featured");
  CREATE INDEX "posts_cover_image_idx" ON "posts" USING btree ("cover_image_id");
  CREATE INDEX "posts_og_image_idx" ON "posts" USING btree ("og_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "_posts_v_version_tags_order_idx" ON "_posts_v_version_tags" USING btree ("_order");
  CREATE INDEX "_posts_v_version_tags_parent_id_idx" ON "_posts_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_category_idx" ON "_posts_v" USING btree ("version_category");
  CREATE INDEX "_posts_v_version_version_author_idx" ON "_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_posts_v_version_version_published_at_idx" ON "_posts_v" USING btree ("version_published_at");
  CREATE INDEX "_posts_v_version_version_featured_idx" ON "_posts_v" USING btree ("version_featured");
  CREATE INDEX "_posts_v_version_version_cover_image_idx" ON "_posts_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_posts_v_version_version_og_image_idx" ON "_posts_v" USING btree ("version_og_image_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "authors_social_links_order_idx" ON "authors_social_links" USING btree ("_order");
  CREATE INDEX "authors_social_links_parent_id_idx" ON "authors_social_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "authors_slug_idx" ON "authors" USING btree ("slug");
  CREATE INDEX "authors_avatar_idx" ON "authors" USING btree ("avatar_id");
  CREATE INDEX "authors_updated_at_idx" ON "authors" USING btree ("updated_at");
  CREATE INDEX "authors_created_at_idx" ON "authors" USING btree ("created_at");
  CREATE INDEX "submissions_email_idx" ON "submissions" USING btree ("email");
  CREATE INDEX "submissions_status_idx" ON "submissions" USING btree ("status");
  CREATE INDEX "submissions_updated_at_idx" ON "submissions" USING btree ("updated_at");
  CREATE INDEX "submissions_created_at_idx" ON "submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_process_phases_id_idx" ON "payload_locked_documents_rels" USING btree ("process_phases_id");
  CREATE INDEX "payload_locked_documents_rels_tenets_id_idx" ON "payload_locked_documents_rels" USING btree ("tenets_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_clients_id_idx" ON "payload_locked_documents_rels" USING btree ("clients_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_authors_id_idx" ON "payload_locked_documents_rels" USING btree ("authors_id");
  CREATE INDEX "payload_locked_documents_rels_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "hero_meta_items_order_idx" ON "hero_meta_items" USING btree ("_order");
  CREATE INDEX "hero_meta_items_parent_id_idx" ON "hero_meta_items" USING btree ("_parent_id");
  CREATE INDEX "studio_stats_order_idx" ON "studio_stats" USING btree ("_order");
  CREATE INDEX "studio_stats_parent_id_idx" ON "studio_stats" USING btree ("_parent_id");
  CREATE INDEX "studio_about_timeline_order_idx" ON "studio_about_timeline" USING btree ("_order");
  CREATE INDEX "studio_about_timeline_parent_id_idx" ON "studio_about_timeline" USING btree ("_parent_id");
  CREATE INDEX "studio_about_workspace_about_workspace_image_idx" ON "studio" USING btree ("about_workspace_image_id");
  CREATE INDEX "contact_scopes_order_idx" ON "contact_scopes" USING btree ("_order");
  CREATE INDEX "contact_scopes_parent_id_idx" ON "contact_scopes" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_columns_links_order_idx" ON "site_settings_footer_columns_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_columns_links_parent_id_idx" ON "site_settings_footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_columns_order_idx" ON "site_settings_footer_columns" USING btree ("_order");
  CREATE INDEX "site_settings_footer_columns_parent_id_idx" ON "site_settings_footer_columns" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_order_idx" ON "site_settings_social" USING btree ("_order");
  CREATE INDEX "site_settings_social_parent_id_idx" ON "site_settings_social" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_logo_dark_idx" ON "site_settings" USING btree ("logo_dark_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "site_settings_og_image_idx" ON "site_settings" USING btree ("og_image_id");
  CREATE INDEX "blog_settings_default_og_image_idx" ON "blog_settings" USING btree ("default_og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_hero_meta_items" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_service_list" CASCADE;
  DROP TABLE "pages_blocks_work" CASCADE;
  DROP TABLE "pages_blocks_products" CASCADE;
  DROP TABLE "pages_blocks_process" CASCADE;
  DROP TABLE "pages_blocks_studio_stats" CASCADE;
  DROP TABLE "pages_blocks_studio" CASCADE;
  DROP TABLE "pages_blocks_notes" CASCADE;
  DROP TABLE "pages_blocks_faq_custom_items" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_contact_scopes" CASCADE;
  DROP TABLE "pages_blocks_contact" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_cta_banner" CASCADE;
  DROP TABLE "pages_blocks_stats_grid_stats" CASCADE;
  DROP TABLE "pages_blocks_stats_grid" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_meta_items" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_service_list" CASCADE;
  DROP TABLE "_pages_v_blocks_work" CASCADE;
  DROP TABLE "_pages_v_blocks_products" CASCADE;
  DROP TABLE "_pages_v_blocks_process" CASCADE;
  DROP TABLE "_pages_v_blocks_studio_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_studio" CASCADE;
  DROP TABLE "_pages_v_blocks_notes" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_custom_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_scopes" CASCADE;
  DROP TABLE "_pages_v_blocks_contact" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_grid_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_grid" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "services_list" CASCADE;
  DROP TABLE "services_stack" CASCADE;
  DROP TABLE "services_service_f_a_q" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "projects_pills" CASCADE;
  DROP TABLE "projects_featured_details_metrics" CASCADE;
  DROP TABLE "projects_featured_details_code_panel_lines" CASCADE;
  DROP TABLE "projects_featured_details_stack" CASCADE;
  DROP TABLE "projects_studio_bullets" CASCADE;
  DROP TABLE "projects_gallery" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_pills" CASCADE;
  DROP TABLE "_projects_v_version_featured_details_metrics" CASCADE;
  DROP TABLE "_projects_v_version_featured_details_code_panel_lines" CASCADE;
  DROP TABLE "_projects_v_version_featured_details_stack" CASCADE;
  DROP TABLE "_projects_v_version_studio_bullets" CASCADE;
  DROP TABLE "_projects_v_version_gallery" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "process_phases" CASCADE;
  DROP TABLE "tenets" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "clients" CASCADE;
  DROP TABLE "posts_tags" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "_posts_v_version_tags" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "authors_social_links" CASCADE;
  DROP TABLE "authors" CASCADE;
  DROP TABLE "submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "hero_meta_items" CASCADE;
  DROP TABLE "hero" CASCADE;
  DROP TABLE "studio_stats" CASCADE;
  DROP TABLE "studio_about_timeline" CASCADE;
  DROP TABLE "studio" CASCADE;
  DROP TABLE "contact_scopes" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "top_bar" CASCADE;
  DROP TABLE "site_settings_footer_columns_links" CASCADE;
  DROP TABLE "site_settings_footer_columns" CASCADE;
  DROP TABLE "site_settings_social" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "blog_settings" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_service_list_source";
  DROP TYPE "public"."enum_pages_blocks_faq_source";
  DROP TYPE "public"."enum_pages_blocks_rich_text_max_width";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_tone";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_service_list_source";
  DROP TYPE "public"."enum__pages_v_blocks_faq_source";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_max_width";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_tone";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_projects_kind";
  DROP TYPE "public"."enum_projects_industry";
  DROP TYPE "public"."enum_projects_studio_viz_type";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_kind";
  DROP TYPE "public"."enum__projects_v_version_industry";
  DROP TYPE "public"."enum__projects_v_version_studio_viz_type";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum_process_phases_icon";
  DROP TYPE "public"."enum_tenets_icon";
  DROP TYPE "public"."enum_posts_category";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_category";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_submissions_scope";
  DROP TYPE "public"."enum_submissions_status";`)
}
