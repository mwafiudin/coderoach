import type { MetadataRoute } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
  const payload = await getPayload({ config });

  const [{ docs: projects }, { docs: services }, { docs: posts }] = await Promise.all([
    payload.find({ collection: 'projects', where: { published: { equals: true } }, limit: 1000 }),
    payload.find({ collection: 'services', limit: 100 }),
    payload.find({ collection: 'posts', where: { published: { equals: true } }, limit: 1000 }),
  ]);

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
