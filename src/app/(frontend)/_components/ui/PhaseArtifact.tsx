/**
 * Per-phase artifact illustration — visual preview of what the phase produces.
 * Used in Process section to add visual interest beyond plain text deliverables.
 */
import * as React from 'react';

type Variant = 'discover' | 'design' | 'layers' | 'handoff';

export function PhaseArtifact({ variant }: { variant: Variant }) {
  switch (variant) {
    case 'discover':
      // Brief document with lines + magnifier hint
      return (
        <svg
          viewBox="0 0 100 60"
          className="w-full h-full text-mist-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <rect x="14" y="10" width="48" height="44" rx="2" />
          <line x1="20" y1="20" x2="50" y2="20" opacity="0.6" />
          <line x1="20" y1="26" x2="56" y2="26" opacity="0.6" />
          <line x1="20" y1="32" x2="44" y2="32" stroke="var(--color-electric)" strokeWidth="1.5" />
          <line x1="20" y1="38" x2="52" y2="38" opacity="0.6" />
          <line x1="20" y1="44" x2="40" y2="44" opacity="0.6" />
          {/* magnifier */}
          <circle cx="74" cy="34" r="9" stroke="var(--color-electric)" strokeWidth="1.5" />
          <line x1="80" y1="40" x2="86" y2="46" stroke="var(--color-electric)" strokeWidth="1.5" />
        </svg>
      );

    case 'design':
      // Wireframe boxes layout
      return (
        <svg
          viewBox="0 0 100 60"
          className="w-full h-full text-mist-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          aria-hidden="true"
        >
          <rect x="14" y="8" width="72" height="44" rx="2" />
          <line x1="14" y1="18" x2="86" y2="18" opacity="0.6" />
          {/* sidebar */}
          <line x1="34" y1="18" x2="34" y2="52" opacity="0.6" />
          <rect x="20" y="24" width="10" height="2.5" fill="currentColor" stroke="none" opacity="0.4" />
          <rect x="20" y="30" width="10" height="2.5" fill="currentColor" stroke="none" opacity="0.4" />
          <rect x="20" y="36" width="10" height="2.5" fill="currentColor" stroke="none" opacity="0.4" />
          {/* main content */}
          <rect x="40" y="24" width="42" height="6" stroke="var(--color-electric)" strokeWidth="1.25" />
          <rect x="40" y="34" width="20" height="14" fill="currentColor" stroke="none" opacity="0.2" />
          <rect x="64" y="34" width="18" height="14" fill="currentColor" stroke="none" opacity="0.2" />
        </svg>
      );

    case 'layers':
      // Code snippet with brackets
      return (
        <svg
          viewBox="0 0 100 60"
          className="w-full h-full text-mist-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <rect x="10" y="8" width="80" height="44" rx="3" />
          {/* terminal header dots */}
          <circle cx="16" cy="14" r="1" fill="currentColor" stroke="none" />
          <circle cx="20" cy="14" r="1" fill="currentColor" stroke="none" />
          <circle cx="24" cy="14" r="1" fill="currentColor" stroke="none" />
          <line x1="10" y1="20" x2="90" y2="20" opacity="0.4" />
          {/* code lines with one electric */}
          <line x1="16" y1="28" x2="46" y2="28" opacity="0.5" />
          <line x1="22" y1="34" x2="58" y2="34" stroke="var(--color-electric)" strokeWidth="1.5" />
          <line x1="22" y1="40" x2="48" y2="40" opacity="0.5" />
          <line x1="16" y1="46" x2="38" y2="46" opacity="0.5" />
        </svg>
      );

    case 'handoff':
      // Package box with arrow out, docs stack
      return (
        <svg
          viewBox="0 0 100 60"
          className="w-full h-full text-mist-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {/* docs stack */}
          <rect x="12" y="16" width="22" height="28" rx="1.5" opacity="0.6" />
          <rect x="16" y="12" width="22" height="28" rx="1.5" opacity="0.8" />
          <rect x="20" y="8" width="22" height="28" rx="1.5" stroke="var(--color-electric)" strokeWidth="1.5" />
          <line x1="24" y1="14" x2="38" y2="14" opacity="0.5" />
          <line x1="24" y1="20" x2="36" y2="20" opacity="0.5" />
          <line x1="24" y1="26" x2="38" y2="26" opacity="0.5" />
          {/* arrow handing off */}
          <line x1="50" y1="30" x2="74" y2="30" stroke="var(--color-electric)" strokeWidth="1.5" />
          <polyline points="68,24 74,30 68,36" stroke="var(--color-electric)" strokeWidth="1.5" />
          {/* receiver box */}
          <rect x="78" y="20" width="14" height="20" rx="1.5" />
          <polyline points="82,30 86,33 90,28" stroke="var(--color-electric)" strokeWidth="1.5" />
        </svg>
      );
  }
}
