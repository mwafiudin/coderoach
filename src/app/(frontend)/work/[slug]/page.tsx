import { getPayload } from 'payload';
import config from '@payload-config';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { SectionShell } from '../../_components/detail/SectionShell';
import { ClientCaseDetail } from './ClientCaseDetail';
import { StudioProductDetail } from './StudioProductDetail';
import { RelatedGrid } from '../../_components/detail/RelatedGrid';
import { PrevNext } from '../../_components/detail/PrevNext';

export const dynamic = 'force-static';
export const revalidate = 60;

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'projects',
    where: { _status: { equals: 'published' } },
    limit: 1000,
    depth: 0,
    select: { slug: true },
  });
  return docs.map((d: any) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  });
  const p = docs[0] as any;
  if (!p) return { title: 'Not found — Coderoach Studio' };
  return {
    title: `${p.client} — Coderoach Studio`,
    description: p.excerpt || p.tagline,
    openGraph: {
      title: p.client,
      description: p.excerpt || p.tagline,
      images: p.coverImage?.url ? [{ url: p.coverImage.url }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft: isDraftMode,
    overrideAccess: isDraftMode,
  });
  const project = docs[0] as any;
  if (!project) notFound();

  // Related: same industry or service, excluding current
  const { docs: relatedRaw } = await payload.find({
    collection: 'projects',
    where: {
      and: [
        { id: { not_equals: project.id } },
        { _status: { equals: 'published' } },
        {
          or: [
            ...(project.industry ? [{ industry: { equals: project.industry } }] : []),
            ...(typeof project.service === 'object' && project.service?.id
              ? [{ service: { equals: project.service.id } }]
              : []),
          ],
        },
      ],
    },
    sort: 'order',
    limit: 3,
  });

  // Prev/Next case (sorted by `order`, restricted to same kind so client-cases nav within client, studio-products within studio)
  const currentOrder = project.order ?? 0;
  const [prevRes, nextRes] = await Promise.all([
    payload.find({
      collection: 'projects',
      where: {
        and: [
          { _status: { equals: 'published' } },
          { kind: { equals: project.kind } },
          { order: { less_than: currentOrder } },
        ],
      },
      sort: '-order',
      limit: 1,
    }),
    payload.find({
      collection: 'projects',
      where: {
        and: [
          { _status: { equals: 'published' } },
          { kind: { equals: project.kind } },
          { order: { greater_than: currentOrder } },
        ],
      },
      sort: 'order',
      limit: 1,
    }),
  ]);
  const prevCase = (prevRes.docs[0] as any) || null;
  const nextCase = (nextRes.docs[0] as any) || null;

  return (
    <SectionShell>
      {project.kind === 'client' ? (
        <ClientCaseDetail project={project} />
      ) : (
        <StudioProductDetail project={project} />
      )}
      <PrevNext
        contextLabel={project.kind === 'client' ? 'More client cases' : 'More studio products'}
        prev={
          prevCase
            ? {
                href: `/work/${prevCase.slug}`,
                label: prevCase.client,
                meta: prevCase.meta || prevCase.publishedYear || '',
              }
            : null
        }
        next={
          nextCase
            ? {
                href: `/work/${nextCase.slug}`,
                label: nextCase.client,
                meta: nextCase.meta || nextCase.publishedYear || '',
              }
            : null
        }
      />
      <RelatedGrid heading={project.kind === 'client' ? 'Related cases' : 'Related work'} type="projects" items={relatedRaw as any[]} />
      {/* Contact CTA strip */}
      <section className="py-20 bg-paper-50 border-t border-paper-200">
        <div className="max-w-[1180px] mx-auto px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600">
              {project.kind === 'client' ? 'Want one of these?' : 'Run a similar product?'}
            </span>
            <p className="text-[24px] font-bold tracking-[-0.015em] mt-2">
              Start a 48-hour discovery.
            </p>
          </div>
          <a
            href="/#contact"
            className="h-12 px-5 rounded-md bg-electric text-paper text-sm font-semibold inline-flex items-center hover:bg-[#2562E0] transition-colors"
          >
            Tell us what you're shipping →
          </a>
        </div>
      </section>
    </SectionShell>
  );
}
