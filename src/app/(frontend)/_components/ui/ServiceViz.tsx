/**
 * Per-service mini visualizations — each represents the service's actual work.
 * Used in homepage Services cards (replaces flat icon chip) and /services/[slug] hero.
 *
 * 4 variants:
 * - build     : code snippet with shipped checkmark
 * - automate  : cycle / pipeline w/ animated dots
 * - intelligence : mini bar chart with one tall electric bar
 * - augment   : input → LLM → output flow
 */
import * as React from 'react';

type Variant = 'build' | 'automate' | 'intelligence' | 'augment';
type Tone = 'light' | 'dark';

const TONE_FG = { light: 'text-shadow-700', dark: 'text-mist-400' } as const;
const TONE_LINE = { light: 'stroke-paper-200', dark: 'stroke-shadow-700' } as const;

export function ServiceViz({ variant, tone = 'light' }: { variant: Variant; tone?: Tone }) {
  const fg = TONE_FG[tone];
  const line = TONE_LINE[tone];
  switch (variant) {
    case 'build':
      return (
        <svg
          viewBox="0 0 120 60"
          className={`w-full h-full ${fg}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {/* code lines */}
          <line x1="8" y1="14" x2="48" y2="14" />
          <line x1="14" y1="22" x2="58" y2="22" />
          <line x1="14" y1="30" x2="42" y2="30" />
          <line x1="8" y1="38" x2="32" y2="38" />
          {/* arrow */}
          <line x1="62" y1="30" x2="84" y2="30" />
          <polyline points="78,24 84,30 78,36" />
          {/* shipped box */}
          <rect x="90" y="20" width="22" height="20" rx="2" stroke="currentColor" />
          <polyline points="95,30 100,35 108,25" stroke="var(--color-electric)" strokeWidth="1.75" />
        </svg>
      );

    case 'automate':
      return (
        <svg
          viewBox="0 0 120 60"
          className={`w-full h-full ${fg}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {/* circular cycle */}
          <circle cx="60" cy="30" r="22" />
          {/* arrowhead on cycle */}
          <polyline points="78,24 82,30 76,32" stroke="var(--color-electric)" strokeWidth="1.5" />
          {/* 3 process dots inside cycle */}
          <circle cx="50" cy="22" r="2" fill="currentColor" stroke="none" />
          <circle cx="68" cy="28" r="2" fill="var(--color-electric)" stroke="none" />
          <circle cx="55" cy="40" r="2" fill="currentColor" stroke="none" />
          {/* in/out lines */}
          <line x1="14" y1="30" x2="36" y2="30" />
          <line x1="84" y1="30" x2="106" y2="30" />
          <polyline points="100,26 106,30 100,34" />
        </svg>
      );

    case 'intelligence':
      return (
        <svg
          viewBox="0 0 120 60"
          className={`w-full h-full ${fg}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          aria-hidden="true"
        >
          {/* baseline */}
          <line x1="10" y1="50" x2="110" y2="50" stroke="currentColor" />
          {/* bars */}
          <rect x="20" y="36" width="10" height="14" fill="currentColor" stroke="none" opacity="0.55" />
          <rect x="36" y="28" width="10" height="22" fill="currentColor" stroke="none" opacity="0.7" />
          <rect x="52" y="14" width="10" height="36" fill="var(--color-electric)" stroke="none" />
          <rect x="68" y="22" width="10" height="28" fill="currentColor" stroke="none" opacity="0.7" />
          <rect x="84" y="32" width="10" height="18" fill="currentColor" stroke="none" opacity="0.55" />
          {/* trend line over bars */}
          <polyline points="25,40 41,32 57,18 73,26 89,38" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          {/* highlight dot */}
          <circle cx="57" cy="18" r="2.5" fill="var(--color-electric)" stroke="none" />
        </svg>
      );

    case 'augment':
      return (
        <svg
          viewBox="0 0 120 60"
          className={`w-full h-full ${fg}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {/* input box */}
          <rect x="6" y="20" width="22" height="20" rx="2" />
          <line x1="11" y1="26" x2="23" y2="26" opacity="0.5" />
          <line x1="11" y1="30" x2="20" y2="30" opacity="0.5" />
          <line x1="11" y1="34" x2="22" y2="34" opacity="0.5" />
          {/* arrow in */}
          <line x1="28" y1="30" x2="46" y2="30" />
          <polyline points="42,26 46,30 42,34" />
          {/* AI octagon (brand mark) */}
          <polygon
            points="60,16 72,16 80,24 80,36 72,44 60,44 52,36 52,24"
            fill="rgba(44,112,254,0.08)"
            stroke="var(--color-electric)"
            strokeWidth="1.5"
          />
          <text
            x="66"
            y="34"
            textAnchor="middle"
            fontSize="10"
            fontFamily="JetBrains Mono"
            fill="var(--color-electric)"
            stroke="none"
            fontWeight="600"
          >
            AI
          </text>
          {/* arrow out */}
          <line x1="80" y1="30" x2="98" y2="30" />
          <polyline points="94,26 98,30 94,34" />
          {/* output box */}
          <rect x="98" y="20" width="16" height="20" rx="2" />
          <line x1="102" y1="28" x2="110" y2="28" stroke="var(--color-electric)" strokeWidth="1.5" />
          <line x1="102" y1="32" x2="108" y2="32" stroke="var(--color-electric)" strokeWidth="1.5" />
        </svg>
      );
  }
}
