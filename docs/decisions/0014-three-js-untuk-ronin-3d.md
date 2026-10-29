# 0014 — three.js for the RideDeck Ronin viewer

- Date: 2026-10-28
- Status: Accepted

## Context

RideDeck gets a bespoke page (ADR 0013). Farrez wants its TVS Ronin model shown as a
still render and as an interactive 3D view. The site had no 3D library. The model is
`ronin.glb` from rideDeck-lab: AI-made from TVS's public product photos (Hunyuan3D-2),
76k triangles, vertex colours, 1.97 MB; meshopt-compressed to 433 KB for the site.

## Options considered

1. `@google/model-viewer`, lazy-loaded (Claude's recommendation): least code, orbit and
   poster built in, little control over animation.
2. A turntable of pre-rendered frames: no dependency, but not real 3D.
3. `three` directly: full control over lights, materials, and animation; more code to own.

## Decision (decided by: farrez)

Option 3. `three@0.186.1` pinned exactly, `@types/three@0.186.0` as a dev dependency.
The viewer is a client component loaded with `import()` only when its section nears the
viewport; the still render is its poster and the no-JS / reduced-motion fallback.
`GLTFLoader` and `MeshoptDecoder` come from three's own `examples/jsm`, so no extra package.

## Reasoning (farrez)

"Animasi lean nanti" — so the model can later lean and pitch from the app's ride
simulation data, not only turn.

## Consequences

- Audit at adoption: MIT, maintained by mrdoob and Mugen87, last release 2026-09-24,
  `npm audit --omit=dev` result in the PR. Upgrades are deliberate, never ranged.
- The page states the model is AI-made from public photos and not an official TVS
  model, carries the Tencent Hunyuan 3D 2.0 Community License attribution, and shows no
  TVS logo. Its shape still derives from TVS's design: a grey area Farrez chose to accept
  on 28 Oct 2026. Remove the model if TVS objects.
- Revisit if the page breaks the ADR 0003 guardrails (LCP ≤2.5s, CLS <0.1), or if no lean
  animation has been built a few months from now (then option 1 or 2 is lighter).
