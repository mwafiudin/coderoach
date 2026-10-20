# 0012 — PRODUCT.md exception for the project pages

- Date: 2026-10-21
- Status: Accepted (farrez; wafi's concurrence pending, he is away until 23 Oct)

## Context

ADR 0003 gives `/work/[slug]` the full apple.com product-page manner. That
reaches past two lines in PRODUCT.md: "Blueprint, not brochure" (the brand's
hairline-and-grid register) and the "Dark hero panels used for drama"
anti-reference. ADR 0003's own consequences said PRODUCT.md would get an
explicit exception agreed with wafi. That exception has lived as a draft inline
in PRODUCT.md ("Exception: project pages (draft, to agree with wafi in the PR)")
rather than as a decision. This records it so it stops drifting.

## Options considered

1. **Scoped exception** for `/work/[slug]` only, with the rest of PRODUCT.md
   unchanged. (What the inline draft already describes.)
2. **Relax PRODUCT.md globally** to allow the Apple manner everywhere.
3. **No exception:** force the project pages back to the landing register,
   overriding ADR 0003.

Recommended by Claude: 1.

## Decision (decided by: farrez)

Option 1. On `/work/[slug]` only: the product-page formula (name, one line, then
one idea per section), motion bound to scroll, one dark chapter that holds the
tour (never the hero), and blueprint ornaments where a picture is missing.
Still binding there: one accent (`#2C70FE`), proof over adjectives (every number
footnoted to its source), plain Indonesian, and the accessibility rules. The
landing, services, notes, and studio pages keep PRODUCT.md as-is.

## Reasoning (farrez)

"Halaman proyek itu etalase buat calon klien, jadi harus kelihatan premium, dan
acuan premium yang paling dikenal orang ya halaman produk Apple." (ADR 0003.)
The exception is narrow so the brand's register still holds everywhere else.

## Consequences

- PRODUCT.md's "Exception" section now points here instead of carrying a draft.
- wafi concurs when he is back (23 Oct); until then this is farrez's call, and
  the PR carries it for his review.
- Revisit if the two visual languages start to read as two different brands, or
  if the guardrails in ADR 0003 (LCP ≤2.5s, CLS <0.1, readable without JS) slip.
