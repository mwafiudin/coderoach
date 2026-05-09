/**
 * Dynamic route for pages built from blocks (Pages collection).
 * Renders any /<slug> URL where a published Page exists.
 * The 'home' slug is handled by /app/(frontend)/page.tsx instead.
 */
import { getPayload } from 'payload';
import config from '@payload-config';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { SectionShell } from '../_components/detail/SectionShell';
import { BlockRenderer } from '../_components/blocks/BlockRenderer';

export const dynamic = 'force-static';
export const revalidate = 60;

const RESERVED_SLUGS = new Set([
  'admin',
  'api',
  'work',
  'notes',
  'studio',
  'services',
  'sitemap.xml',
  'robots.txt',
]);

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'pages',
    where: { _status: { equals: 'published' } },
    limit: 200,
    depth: 0,
    select: { slug: true },
  });
  return (docs as any[])
    .map((d) => d.slug)
    .filter((slug) => slug && slug !== 'home' && !RESERVED_SLUGS.has(slug))
    .map((slug) => ({ slug: [slug] }));
}

async function findPage(slugSegments: string[], draft = false) {
  const slug = slugSegments[0];
  if (!slug || RESERVED_SLUGS.has(slug)) return null;
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft,
    overrideAccess: draft,
  });
  return (docs[0] as any) || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await findPage(slug);
  if (!page) return { title: 'Not found' };
  const seo = page.seo || {};
  return {
    title: seo.metaTitle || page.title,
    description: seo.metaDescription || undefined,
    openGraph: {
      title: seo.metaTitle || page.title,
      description: seo.metaDescription || undefined,
      ...(seo.ogImage?.url ? { images: [{ url: seo.ogImage.url }] } : {}),
    },
  };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();
  const page = await findPage(slug, isDraftMode);
  if (!page) notFound();
  return (
    <SectionShell>
      <BlockRenderer blocks={page.layout || []} />
    </SectionShell>
  );
}
