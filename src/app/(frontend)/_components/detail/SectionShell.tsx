/**
 * Reusable shell for nav + footer wrapping detail/archive pages.
 * Pulls site-settings + top-bar globals once.
 */
import { getPayload } from 'payload';
import config from '@payload-config';
import { TopBar } from '../TopBar';
import { Nav } from '../Nav';
import { Footer } from '../Footer';
import { InteractionsClient } from '../InteractionsClient';
import { BackToTop } from '../BackToTop';

export async function SectionShell({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config });
  const [topBar, siteSettings] = await Promise.all([
    payload.findGlobal({ slug: 'top-bar' }).catch(() => null),
    payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
  ]);
  return (
    <>
      <TopBar data={topBar as any} />
      <Nav data={siteSettings as any} />
      {children}
      <Footer data={siteSettings as any} />
      <InteractionsClient />
      <BackToTop />
    </>
  );
}
