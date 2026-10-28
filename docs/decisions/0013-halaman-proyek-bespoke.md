# 0013 — Bespoke project pages in each product's own identity

- Date: 2026-10-28
- Status: Accepted (pilot: laporta, jeda, yiheecam)

## Context

Every project page uses one shared story template (ADR 0003), so Laporta, Jeda,
and YiheeCam read alike apart from their screenshots. Farrez asked for pages
whose content and scroll animation each show what the product is. The pages
were designed through the `alur-desain` flow: three directions per project in
pen.dev (drafted by Gemini), chosen by Farrez at GD5 on 28 Oct 2026: Laporta
"struk", Jeda "dua meja", YiheeCam "protokol".

## Options considered

1. Shared template plus one signature scene per project (Claude's recommendation).
2. Fully bespoke page per project.
3. Data-only variation of the shared template (accent, order, media).

And for the look: Coderoach language with a product accent (recommended), the
Apple manner, or each app's own identity.

## Decision (decided by: farrez)

Option 2, in each app's own identity. A page per slug under
`work/_bespoke/<slug>/`, picked in `work/[slug]/page.tsx` through a registry.
It reuses only plumbing: the `--p` engine (`StoryEnhancer`), `TourChapter`,
`Sources`, link chips, and media. The site tokens are remapped on the page root,
so those shared parts take the app's colours. Copy stays in `projects.ts`.

## Reasoning (farrez)

"Betul-betul menggambarkan aplikasi tersebut secara kreatif."

## Consequences

- DESIGN.md has a section for these pages; elsewhere it still governs.
- Only consent `studio` (or an IZN reference) may get a bespoke page: a legacy
  entry may only be reworded (ADR 0009). `lib/portfolio/bespoke.test.ts`
  enforces this.
- Three faces load from Google Fonts at build time (next/font, self-hosted in
  the output), only on the page that uses them.
- The overlay on /work and the presentation keep the shared template.
- Each new bespoke page is its own design job (GD5 per page). Revisit if the
  site starts reading as many brands, or if a page breaks the ADR 0003
  guardrails (LCP ≤2.5s, CLS <0.1, readable without JS).
