import { getPayload } from 'payload';
import config from '@payload-config';
import type { Metadata } from 'next';
import { SectionShell } from '../_components/detail/SectionShell';
import { ProjectArchiveClient } from './ProjectArchiveClient';

export const dynamic = 'force-static';
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Work — Coderoach Studio',
  description: 'Forty engagements across F&B, logistics, finance, and agency. Selected client cases and studio products.',
};

export default async function WorkArchivePage() {
  const payload = await getPayload({ config });
  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: { published: { equals: true } },
    sort: 'order',
    limit: 200,
  });

  return (
    <SectionShell>
      <ProjectArchiveClient projects={projects as any[]} />
    </SectionShell>
  );
}
