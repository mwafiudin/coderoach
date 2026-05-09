import type { MetadataRoute } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

  const slimSelect = { slug: true, updatedAt: true } as const;

  let projects: any[] = [];
  let services: any[] = [];
  let posts: any[] = [];
  try {
    const payload = await getPayload({ config });
    const [pRes, sRes, pstRes] = await Promise.all([
      payload.find({
        collection: 'projects',
        where: { _status: { equals: 'published' } },
        limit: 1000,
        depth: 0,
        select: slimSelect,
      }),
      payload.find({
        collection: 'services',
        limit: 100,
        depth: 0,
        select: slimSelect,
      }),
      payload.find({
        collection: 'posts',
        where: { _status: { equals: 'published' } },
        limit: 1000,
        depth: 0,
        select: { slug: true, updatedAt: true, publishedAt: true },
      }),
    ]);
    projects = pRes.docs;
    services = sRes.docs;
    posts = pstRes.docs;
  } catch (err) {
    console.warn('[sitemap] DB unavailable, returning static entries only', err);
  }

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/work`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/notes`, changeFrequency: 'daily', priority: 0.8 },
  ];

  const projectEntries: MetadataRoute.Sitemap = (projects as any[]).map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const serviceEntries: MetadataRoute.Sitemap = (services as any[]).map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = (posts as any[]).map((p) => ({
    url: `${baseUrl}/notes/${p.slug}`,
    lastModified: p.updatedAt || p.publishedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...projectEntries, ...serviceEntries, ...postEntries];
}
