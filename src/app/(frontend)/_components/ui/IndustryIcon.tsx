import type { ComponentType, SVGProps } from 'react';
import { AirplaneTilt } from '@phosphor-icons/react/dist/ssr/AirplaneTilt';
import { Bank } from '@phosphor-icons/react/dist/ssr/Bank';
import { Buildings } from '@phosphor-icons/react/dist/ssr/Buildings';
import { Cpu } from '@phosphor-icons/react/dist/ssr/Cpu';
import { DotsThreeCircle } from '@phosphor-icons/react/dist/ssr/DotsThreeCircle';
import { Factory } from '@phosphor-icons/react/dist/ssr/Factory';
import { ForkKnife } from '@phosphor-icons/react/dist/ssr/ForkKnife';
import { GraduationCap } from '@phosphor-icons/react/dist/ssr/GraduationCap';
import { Heartbeat } from '@phosphor-icons/react/dist/ssr/Heartbeat';
import { Newspaper } from '@phosphor-icons/react/dist/ssr/Newspaper';
import { Scales } from '@phosphor-icons/react/dist/ssr/Scales';
import { UsersThree } from '@phosphor-icons/react/dist/ssr/UsersThree';
import type { Industry } from '@/lib/portfolio/taxonomy';

type Icon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string; weight?: 'regular' }>;

// One icon per industry (ADR 0014). `satisfies` makes a new industry in taxonomy.ts fail the
// typecheck until it gets an icon here. Per-icon imports keep the other ~1,500 out of the bundle.
const ICONS = {
  fb: ForkKnife,
  manufacturing: Factory,
  legal: Scales,
  media: Newspaper,
  health: Heartbeat,
  education: GraduationCap,
  finance: Bank,
  construction: Buildings,
  travel: AirplaneTilt,
  community: UsersThree,
  technology: Cpu,
  other: DotsThreeCircle,
} satisfies Record<Industry, Icon>;

/**
 * Decorative: the label next to it already says the industry, so screen readers skip the icon.
 * Phosphor's regular weight at 1.3em matches the stroke of the 10–11px mono labels.
 */
export function IndustryIcon({ industry, className = '' }: { industry: string | null | undefined; className?: string }) {
  const Icon: Icon = ICONS[(industry ?? 'other') as Industry] ?? ICONS.other;
  return <Icon aria-hidden focusable="false" size="1.3em" weight="regular" className={`shrink-0 ${className}`} />;
}
