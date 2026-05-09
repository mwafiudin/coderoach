import { getPayload } from 'payload';
import config from '@payload-config';

/**
 * Small icon mark shown in the admin nav corner (top-left).
 * Uses SiteSettings.favicon if set, otherwise SiteSettings.logo, otherwise initials.
 */
export default async function Icon() {
  let url: string | null = null;
  let initial = 'S';
  try {
    const payload = await getPayload({ config });
    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 });
    url = (settings as any)?.favicon?.url || (settings as any)?.logo?.url || null;
    const name: string | undefined = (settings as any)?.siteName;
    if (name) initial = name.trim().charAt(0).toUpperCase();
  } catch {
    // Fall through to initial.
  }
  if (url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} alt="" style={{ height: 24, width: 24, objectFit: 'contain' }} />
    );
  }
  return (
    <div
      aria-hidden
      style={{
        height: 24,
        width: 24,
        borderRadius: 6,
        background: 'var(--theme-elevation-800, #111)',
        color: 'var(--theme-elevation-0, #fff)',
        display: 'grid',
        placeItems: 'center',
        fontSize: 13,
        fontWeight: 700,
      }}
    >
      {initial}
    </div>
  );
}
