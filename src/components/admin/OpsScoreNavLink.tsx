import type { ServerProps } from 'payload';
import { NavGroup } from '@payloadcms/ui';
import Link from 'next/link';
import { ADMIN_COPY } from '@/lib/opsscore/copy';

/** Custom admin views do not appear in the nav on their own. */
export default function OpsScoreNavLink({ payload }: ServerProps) {
  return (
    <NavGroup label={ADMIN_COPY.navGroup}>
      <Link className="nav__link" href={`${payload.config.routes.admin}/opsscore`} prefetch={false}>
        <span className="nav__link-label">{ADMIN_COPY.navLink}</span>
      </Link>
    </NavGroup>
  );
}
