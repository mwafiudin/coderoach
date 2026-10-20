import nextVitals from 'eslint-config-next/core-web-vitals';

// Next 16 dropped `next lint`; this is the same rule set as a flat config.
const config = [
  ...nextVitals,
  // `.claude/**` holds scratch git worktrees with their own built `.next/` and `_legacy/`; the
  // globs above are root-anchored so they miss those nested copies, which otherwise dwarf the
  // real source count. `**/` anchors the build-output ignores at any depth too.
  { ignores: ['**/.next/**', '**/_legacy/**', 'public/**', 'src/app/(payload)/**', 'src/payload-types.ts', '.claude/**'] },
  {
    rules: {
      // Every hit in this repo is the hydration-safe "set a client-only value after mount" idiom
      // (new Date(), sessionStorage, matchMedia): deriving it during render would bring back the
      // SSR mismatch it exists to avoid. The rule fights the pattern rather than a bug here.
      'react-hooks/set-state-in-effect': 'off',
      // The "latest ref" idiom — refreshing a callback in a ref so an effect need not resubscribe.
      'react-hooks/refs': 'off',
    },
  },
];

export default config;
