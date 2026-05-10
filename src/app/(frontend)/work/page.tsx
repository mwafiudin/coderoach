import { getPayload } from 'payload';
import config from '@payload-config';
import type { Metadata } from 'next';
import { SectionShell } from '../_components/detail/SectionShell';
import { ProjectArchiveClient } from './ProjectArchiveClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Work — Portfolio Coderoach Studio · Web, Automasi, Dashboard',
  description: 'Portfolio Coderoach Studio — 40+ kolaborasi di F&B, logistik, finance, dan agency. Web development, otomasi workflow, dan dashboard analitik untuk bisnis Indonesia.',
};

export default async function WorkArchivePage() {
  const payload = await getPayload({ config });
  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: { _status: { equals: 'published' } },
    sort: 'order',
    limit: 200,
    depth: 1,
    select: {
      slug: true,
      kind: true,
      client: true,
      tagline: true,
      meta: true,
      industry: true,
      publishedYear: true,
      pills: true,
      excerpt: true,
      coverImage: true,
      featured: true,
      order: true,
    },
  });

  return (
    <SectionShell>
      <ProjectArchiveClient projects={projects as any[]} />
    </SectionShell>
  );
}
