import { getPayload } from 'payload';
import config from '@payload-config';
import { TopBar } from './_components/TopBar';
import { Nav } from './_components/Nav';
import { Hero } from './_components/Hero';
import { Services } from './_components/Services';
import { Work } from './_components/Work';
import { Products } from './_components/Products';
import { Process } from './_components/Process';
import { Studio } from './_components/Studio';
import { HomeNotes } from './_components/HomeNotes';
import { FAQ } from './_components/FAQ';
import { Contact } from './_components/Contact';
import { Footer } from './_components/Footer';
import { InteractionsClient } from './_components/InteractionsClient';
import { BackToTop } from './_components/BackToTop';

export const dynamic = 'force-static';
export const revalidate = 60;

export default async function HomePage() {
  const payload = await getPayload({ config });

  const [
    hero,
    studio,
    contact,
    topBar,
    siteSettings,
    services,
    clientProjects,
    studioProjects,
    processPhases,
    tenets,
    faqs,
    clients,
    posts,
  ] = await Promise.all([
    payload.findGlobal({ slug: 'hero' }).catch(() => null),
    payload.findGlobal({ slug: 'studio' }).catch(() => null),
    payload.findGlobal({ slug: 'contact' }).catch(() => null),
    payload.findGlobal({ slug: 'top-bar' }).catch(() => null),
    payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
    payload.find({ collection: 'services', sort: 'order', limit: 100 }).catch(() => ({ docs: [] })),
    payload
      .find({ collection: 'projects', where: { kind: { equals: 'client' } }, sort: 'order', limit: 100 })
      .catch(() => ({ docs: [] })),
    payload
      .find({ collection: 'projects', where: { kind: { equals: 'studio' } }, sort: 'order', limit: 100 })
      .catch(() => ({ docs: [] })),
    payload.find({ collection: 'process-phases', sort: 'order', limit: 100 }).catch(() => ({ docs: [] })),
    payload.find({ collection: 'tenets', sort: 'order', limit: 100 }).catch(() => ({ docs: [] })),
    payload.find({ collection: 'faqs', sort: 'order', limit: 100 }).catch(() => ({ docs: [] })),
    payload.find({ collection: 'clients', sort: 'order', limit: 100 }).catch(() => ({ docs: [] })),
    payload
      .find({ collection: 'posts', where: { published: { equals: true } }, sort: '-publishedAt', limit: 3, depth: 1 })
      .catch(() => ({ docs: [] })),
  ]);

  return (
    <>
      <TopBar data={topBar as any} />
      <Nav data={siteSettings as any} />
      <Hero data={hero as any} clients={(clients.docs as any[]).map((c) => ({ name: c.name }))} />
      <Services items={services.docs as any} />
      <Work cases={clientProjects.docs as any} />
      <Products items={studioProjects.docs as any} />
      <Process phases={processPhases.docs as any} />
      <Studio data={studio as any} tenets={tenets.docs as any} />
      <HomeNotes posts={posts.docs as any[]} />
      <FAQ items={faqs.docs as any} />
      <Contact data={contact as any} />
      <Footer data={siteSettings as any} />
      <InteractionsClient />
      <BackToTop />
    </>
  );
}
