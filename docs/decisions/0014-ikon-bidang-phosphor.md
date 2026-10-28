# 0014 — Industry icons from @phosphor-icons/react

- Date: 2026-10-28
- Status: Accepted

## Context

The industry ("bidang") tags on /work cards and the Bidang filter were plain mono
labels. Farrez wanted an icon next to each of the 12 values in
`lib/portfolio/taxonomy.ts`. The site had no icon library; the few icons it draws
are inline SVG written by hand.

## Options considered

1. **`@phosphor-icons/react` from npm**, pinned, importing only the 12 icons used.
2. **Copy the 12 Phosphor SVGs into the repo** (MIT, no dependency).
3. **Draw our own 12 icons** in the blueprint style of the site.

## Decision (decided by: farrez)

Option 1, version `2.1.10`, saved exact.

## Reasoning (farrez)

"Ikonnya konsisten satu set dengan bobot garis yang bisa diatur, dan lewat paket npm
versinya terkunci dan bisa di-upgrade tanpa menyalin SVG satu per satu."
(Picked by Farrez from the wording Claude proposed.)

## Adoption check (28 Oct 2026)

- Name and source: `@phosphor-icons/react`, repo `phosphor-icons/react`, MIT.
- No dependencies and no install scripts; peer `react >= 16.8`. `sideEffects: false`.
- `npm audit`: no finding for this package (the 24 open findings are in other
  packages and predate it).
- Code read: the SSR base only renders `<svg>`; no network, storage, or eval.
- Last release 2.1.10 on 22 May 2025, last repo push Jan 2026, not archived.
  Quiet but stable; icons are static data, so a slow release pace is low risk.
- Size: icons are imported per file (`@phosphor-icons/react/dist/ssr/<Name>`), so only
  the 12 used ship, each about 3.5 KB before gzip with all six weights.

## Consequences

- `app/(frontend)/_components/ui/IndustryIcon.tsx` holds the map; `satisfies
  Record<Industry, …>` makes a new industry fail the typecheck until it gets an icon.
- Icons are decorative (`aria-hidden`); the label beside them carries the meaning.
- Revisit if the package is abandoned with a React break, or if the bundle cost of a
  wider use outgrows copying the SVGs (option 2 is the exit: same artwork, MIT).
