# 0015 — English version under /en, rolled out page by page

- Date: 2026-11-14
- Status: Accepted (not implemented yet)

## Context

The site is Indonesian only: `<html lang="id">` in both layouts, no locale routing, no hreflang,
no Payload localization. The buyers in PRODUCT.md are Indonesian business owners, but the studio
also wants to be found by English searches and to read as a peer of international studios.
Research: `docs/riset/2026-11-standar-portofolio.md` section 5 (Google Search Central, W3C i18n,
Qiscus as a local example).

## Options considered

1. **`/en` subdirectory, rolled out page by page:** separate URLs, reciprocal hreflang with
   `x-default`, a text language switcher in the nav, English copy written for the reader rather
   than machine-translated. Start with the home page and /work. (Recommended by Claude.)
2. **Defer:** no upkeep for two languages, but English search traffic waits.
3. **English case studies only:** smaller, but English visitors land on an Indonesian home page.

A client-side toggle on one URL was ruled out: Google judges language from visible content and
sends no Accept-Language, so one URL can only rank in one language.

## Decision (decided by: Farrez)

Option 1.

## Reasoning (Farrez)

"Untuk SEO dan kredibilitas": so the site is found from English searches and reads as a peer of
international studios.

## Consequences

- Indonesian stays the default at `/`; English lives under `/en/...`. No redirect by IP or browser
  language; the visitor chooses.
- Each page lists itself and its counterpart in hreflang, plus `x-default` pointing at the
  Indonesian page. A page without an English version has no `/en` URL and no hreflang entry.
- The switcher reads "English" and "Bahasa Indonesia", no flags, top right, on every page.
- Every change to Indonesian copy now has an English twin to update. Copy stays in `projects.ts`
  and `copy.ts`, so the English strings live beside the Indonesian ones, not in the admin.
- Storyboards are checked with English text before `/en` ships (longer headings, logo row).
- Revisit if English pages bring no search traffic after six months, or if keeping two languages
  in step starts delaying portfolio updates.
