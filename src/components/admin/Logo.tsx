import { getPayload } from 'payload';
import config from '@payload-config';

/**
 * Logo shown on the admin login screen.
 * Pulls from SiteSettings global; falls back to NEXT_PUBLIC_SITE_NAME env, then 'Studio'.
 */
export default async function Logo() {
  const fallbackName = process.env.NEXT_PUBLIC_SITE_NAME || 'Studio';
  let siteName = fallbackName;
  let logoUrl: string | null = null;
  try {
    const payload = await getPayload({ config });
    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 });
    siteName = (settings as any)?.siteName || fallbackName;
    logoUrl = (settings as any)?.logo?.url || null;
  } catch {
    // SiteSettings not yet seeded — first-boot scenario. Fall through to text-only.
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {logoUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logoUrl} alt="" style={{ height: 32, width: 'auto' }} />
      )}
      <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>
        {siteName}
      </span>
    </div>
  );
}
