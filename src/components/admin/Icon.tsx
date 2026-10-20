import { getPayload } from 'payload';
import config from '@payload-config';
import { BrandMark } from './BrandMark';

/**
 * Small icon mark shown in the admin nav corner (top-left).
 * Uses SiteSettings.favicon if set, otherwise the Coderoach mark. Payload gives this slot about
 * 18px, so anything larger spills out of it and gets clipped.
 */
export default async function Icon() {
  let url: string | null = null;
  try {
    const payload = await getPayload({ config });
    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 });
    url = (settings as any)?.favicon?.url || null;
  } catch {
    // Fall through to the mark.
  }
  if (url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} alt="" style={{ display: 'block', height: 18, width: 18, objectFit: 'contain' }} />
    );
  }
  return <BrandMark size={18} />;
}
