# Coderoach Studio Template

A productized Payload v3 + Next.js 15 template for **company profile sites and landing pages**. Each new client engagement forks this repo, swaps brand and copy in admin, and ships to Vercel — typically in days, not weeks.

## What's in the box

- **Next.js 15** (App Router, React 19, Turbopack dev)
- **Payload CMS v3** with native drafts + Live Preview + autosave
- **Postgres** database (Vercel/Supabase/Neon compatible)
- **Vercel Blob** media storage with auto-generated image variants
- **Resend** email adapter for contact form notifications
- **Tailwind v4** + custom design tokens
- **Block-based Pages** — drag-and-drop page builder with 12 ready-made blocks
- **Custom admin Dashboard** — quick links to globals, recent drafts, inbox
- **TypeScript** end-to-end with `payload-types` integration

## Architecture at a glance

```
src/
├── app/(frontend)/        Public site (Next.js routes)
│   ├── page.tsx            → renders Pages collection slug "home" via blocks
│   ├── [...slug]/          → renders any other Page slug
│   ├── work/, notes/,      → archive + detail routes (Projects + Posts)
│   │   services/            
│   ├── api/contact         → contact form endpoint (validates + creates Submission)
│   ├── api/preview         → Live Preview entry point (sets draftMode)
│   └── _components/blocks/ → BlockRenderer + 12 block adapters
├── app/(payload)/         Admin UI + REST/GraphQL endpoints
│   └── api/pages/duplicate → clones a Page (incl. nested blocks)
├── blocks/                 12 Payload Block configs (Hero, RichText, FAQ, …)
├── collections/            Payload collections (Pages, Posts, Projects, …, Submissions)
├── globals/                Site Settings, Hero, Studio, Contact, Top Bar, Blog Settings
├── components/admin/       Custom admin: Logo, Icon, Dashboard
├── fields/                 Reusable field schemas (linkField, imageField)
├── lib/                    Helpers (slugify, revalidate, seed)
└── payload.config.ts       Payload boot config
```

## Forking workflow

### 1. Clone & install

```bash
git clone <this-repo> client-acme
cd client-acme
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Fill in:
- `PAYLOAD_SECRET` — long random string (`openssl rand -hex 32`)
- `DATABASE_URI` — Postgres connection string (or `POSTGRES_URL` / `DATABASE_URL`)
- `BLOB_READ_WRITE_TOKEN` — from Vercel Blob (auto-set when integrated via Vercel dashboard)
- `NEXT_PUBLIC_SERVER_URL` — full site URL
- `NEXT_PUBLIC_SITE_NAME` — first-boot fallback brand name
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` — for contact form (optional in dev)

### 3. Initialize database

```bash
pnpm migrate         # apply baseline schema migration
pnpm seed            # populate placeholder content
pnpm dev             # start dev server at localhost:3000
```

### 4. Rebrand in admin

1. Visit `/admin` and create your first user.
2. **Site Settings** → set `siteName`, upload `logo` + `logoDark` + `favicon`, edit footer columns + social.
3. **Pages → home** → swap copy in each block (Hero, Studio, Contact, etc.).
4. **Clients** → upload client logos (or leave dummy entries, hide section).
5. **Services / Posts / Projects** → edit or delete defaults.

The site reflects changes within the 60s ISR window, or instantly on collection edits via revalidation hooks.

### 5. Deploy

Push to a Vercel project linked to:
- A Postgres database (Vercel Postgres, Supabase, or Neon)
- A Vercel Blob store
- Resend (set `RESEND_*` env vars)

```bash
vercel deploy --prod
```

## Building new pages with blocks

In admin → **Pages → Create**:

1. Set title and slug (URL becomes `/<slug>`)
2. In **Layout**, add blocks in any order:
   - **Hero** — pill, headline, lede, CTAs, optional ops console + trusted-by marquee
   - **Service list** — pulls from Services collection
   - **Work** — featured project + list
   - **Products** — studio products grid
   - **Process** — 4-phase timeline
   - **Studio** — heading, lede, stats, tenets, optional pull quote
   - **Notes** — recent blog posts
   - **FAQ** — pulls from FAQs collection (or define inline)
   - **Contact** — full contact form
   - **Rich text** — long-form Lexical content
   - **CTA banner** — single CTA strip
   - **Stats grid** — bento-style number + accent + label
3. Save as draft, click **Live Preview** to iterate at mobile/tablet/desktop breakpoints
4. Publish → page renders at `/<slug>`

## Duplicate template flow

In **Pages → list view**, the duplicate endpoint (`POST /api/pages/duplicate?id=<id>`) creates a draft copy of any page including all nested blocks. Wire this into a custom admin button or call it from a script for fast landing-page iteration.

## Conventions

- **Slugs** auto-generate from `client` (Projects), `title` (Posts/Pages), `name` (Authors). Editable in sidebar.
- **Drafts**: Posts, Projects, Pages all use Payload native `_status` (`draft` | `published`) with autosave every 800ms.
- **Featured projects**: setting `featured: true` on a Project automatically un-features any other (enforced via `beforeChange` hook).
- **Section markers / mono labels** in blocks (`[ 01 / 07 ]` etc.) are conventions, not requirements — edit per page.
- **Globals as defaults**: Hero / Studio / Contact globals exist for first-boot defaults but the homepage reads from the `home` Page's blocks.

## Adding a new block

1. Create `src/blocks/MyBlock.ts` exporting a `Block` config
2. Register in `src/blocks/index.ts` and in `src/collections/Pages.ts` `layout.blocks`
3. Create `src/app/(frontend)/_components/blocks/MyBlockRenderer.tsx`
4. Add a case in `src/app/(frontend)/_components/blocks/BlockRenderer.tsx`
5. Run `pnpm generate:types` to pick up new block types
6. Run `pnpm generate:importmap` if the block uses custom admin components

## Adding a new collection

1. Create `src/collections/MyCollection.ts`
2. Import + add to `collections: []` in `src/payload.config.ts`
3. `pnpm generate:types && pnpm migrate:create`
4. Apply migration: `pnpm migrate`

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Start Next.js dev server (port 3000) |
| `pnpm build` | Production build |
| `pnpm start` | Run production build |
| `pnpm seed` | Wipe & repopulate placeholder content |
| `pnpm generate:types` | Regenerate `payload-types.ts` |
| `pnpm generate:importmap` | Regenerate admin component import map (after adding custom admin components) |
| `pnpm migrate:create` | Capture current schema diff into a new migration file |
| `pnpm migrate` | Apply pending migrations |
| `pnpm payload <cmd>` | Direct access to Payload CLI |

## What's intentionally NOT included

- **Multi-tenancy** — single Payload instance per fork. Each client gets their own DB + deploy.
- **Role-based access** — single admin role. Add Payload's auth plugin if needed.
- **API keys / programmatic auth** — content is read via Local API; no public REST exposure expected.
- **i18n / localization** — add when the first multi-language site requires it.
- **Scheduled publish** — `_status` is binary (draft / published). Add Payload Jobs plugin if cron-publish becomes a need.

## Troubleshooting

- **Schema push prompts in dev mode**: Payload auto-pushes schema in development. If a column is being dropped, it asks for confirmation. Either run `pnpm migrate:create` once and use `pnpm migrate` thereafter, or use the `expect`-based seed wrapper at `/tmp/seed-expect.exp` (template not committed).
- **`Cannot find package '@payloadcms/email-resend'`**: Re-run `pnpm install` and restart dev server. Turbopack sometimes caches module resolution before a new dependency lands.
- **Live Preview not rendering**: ensure `NEXT_PUBLIC_SERVER_URL` matches the dev server port and the page detail handler reads `draftMode()`.
- **Images don't show variants**: `imageSizes` on Media collection only generates variants for newly-uploaded images. Re-upload existing media or add a one-off backfill script.
