import * as React from 'react';

/**
 * Icon library — outlined SVG primitives.
 * currentColor stroke at 1.75px. Used in Services, Process, and Studio tenets.
 */

export type IconName =
  | 'build'
  | 'automate'
  | 'intelligence'
  | 'augment'
  | 'discover'
  | 'design'
  | 'layers'
  | 'handoff'
  | 'users'
  | 'voice'
  | 'shield';

const PATHS: Record<IconName, React.ReactNode> = {
  build: (
    <>
      <polyline points="9 8 5 12 9 16" />
      <polyline points="15 8 19 12 15 16" />
      <line x1="14" y1="6" x2="10" y2="18" />
    </>
  ),
  automate: (
    <>
      <path d="M21 12a9 9 0 1 1-3-6.7" />
      <polyline points="21 4 21 10 15 10" />
    </>
  ),
  intelligence: (
    <>
      <line x1="3" y1="20" x2="3" y2="10" />
      <line x1="9" y1="20" x2="9" y2="4" />
      <line x1="15" y1="20" x2="15" y2="14" />
      <line x1="21" y1="20" x2="21" y2="8" />
    </>
  ),
  augment: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  discover: (
    <>
      <circle cx="11" cy="11" r="7" />
      <line x1="20" y1="20" x2="16" y2="16" />
    </>
  ),
  design: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </>
  ),
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
  handoff: (
    <>
      <rect x="2" y="3" width="20" height="5" />
      <path d="M21 8v13H3V8" />
      <line x1="10" y1="13" x2="14" y2="13" />
    </>
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  voice: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </>
  ),
};

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
};

export function Icon({ name, size = 22, className = '' }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
