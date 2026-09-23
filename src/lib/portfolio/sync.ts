import path from 'node:path';
import type { Payload } from 'payload';
import type { Project } from '../../payload-types';
import { HIDDEN_PROJECT_SLUGS, PORTFOLIO, toLexical, type PortfolioCover, type PortfolioEntry } from './projects';

type SyncOptions = {
  /** Write changes. Without it, only report what would change. */
  apply: boolean;
  /** Directory holding the cover files named in PORTFOLIO. */
  assetsDir: string;
  log?: (line: string) => void;
};

type ProjectData = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Writes PORTFOLIO to the database: covers into Media (matched by filename), entries into Projects
 * (matched by slug, then published), and HIDDEN_PROJECT_SLUGS back to draft without touching their copy.
 */
export async function syncPortfolio(payload: Payload, { apply, assetsDir, log = console.log }: SyncOptions) {
  const { docs: services } = await payload.find({
    collection: 'services',
    limit: 100,
    depth: 0,
    overrideAccess: true,
  });
  const serviceIds = new Map(services.map((s) => [s.slug, s.id]));

  for (const entry of PORTFOLIO) {
    const coverId = entry.cover ? await ensureCover(payload, entry.cover, { apply, assetsDir, log }) : undefined;
    const data = toProjectData(entry, serviceIds.get(entry.service), coverId);
    const existing = await findProject(payload, entry.slug);
    if (existing) {
      log(`update     project ${entry.slug}`);
      if (apply) await payload.update({ collection: 'projects', id: existing.id, data, overrideAccess: true });
    } else {
      log(`create     project ${entry.slug}`);
      if (apply) await payload.create({ collection: 'projects', data, overrideAccess: true });
    }
  }

  for (const slug of HIDDEN_PROJECT_SLUGS) {
    const existing = await findProject(payload, slug);
    if (!existing) {
      log(`skip       project ${slug} (not in this database)`);
    } else if (existing._status === 'draft') {
      log(`keep       project ${slug} (already a draft)`);
    } else {
      log(`unpublish  project ${slug}`);
      if (apply) {
        await payload.update({
          collection: 'projects',
          id: existing.id,
          data: { _status: 'draft' },
          overrideAccess: true,
        });
      }
    }
  }
}

async function findProject(payload: Payload, slug: string) {
  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  return docs[0];
}

async function ensureCover(
  payload: Payload,
  cover: PortfolioCover,
  { apply, assetsDir, log }: Required<SyncOptions>,
): Promise<number | undefined> {
  const data = { alt: cover.alt, focalX: cover.focalX ?? 50, focalY: cover.focalY ?? 50 };
  const { docs } = await payload.find({
    collection: 'media',
    where: { filename: { equals: cover.file } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const existing = docs[0];
  if (existing) {
    if (existing.alt !== data.alt || existing.focalX !== data.focalX || existing.focalY !== data.focalY) {
      log(`update     media   ${cover.file}`);
      if (apply) await payload.update({ collection: 'media', id: existing.id, data, overrideAccess: true });
    }
    return existing.id;
  }
  log(`upload     media   ${cover.file}`);
  if (!apply) return undefined;
  const created = await payload.create({
    collection: 'media',
    data,
    filePath: path.join(assetsDir, cover.file),
    overrideAccess: true,
  });
  return created.id;
}

function toProjectData(entry: PortfolioEntry, serviceId: number | undefined, coverId: number | undefined): ProjectData {
  const { featuredDetails: fd, studio } = entry;
  return {
    slug: entry.slug,
    kind: entry.kind,
    order: entry.order,
    featured: entry.featured ?? false,
    industry: entry.industry,
    ...(serviceId ? { service: serviceId } : {}),
    publishedYear: entry.publishedYear,
    client: entry.client,
    tagline: entry.tagline,
    meta: entry.meta,
    excerpt: entry.excerpt,
    pills: entry.pills.map((pill) => ({ pill })),
    richContent: toLexical(entry.body),
    ...(coverId ? { coverImage: coverId } : {}),
    ...(fd
      ? {
          featuredDetails: {
            badgeLabel: fd.badgeLabel,
            shippedLabel: fd.shippedLabel,
            metaLine: fd.metaLine,
            headline: fd.headline,
            description: fd.description,
            metrics: fd.metrics.map((m) => ({ num: m.num, accent: m.accent ?? '', label: m.label })),
            codePanel: { tag: fd.codePanel.tag, path: fd.codePanel.path, lines: fd.codePanel.lines.map((line) => ({ line })) },
            stack: fd.stack.map((tech) => ({ tech })),
          },
        }
      : {}),
    ...(studio
      ? {
          studio: {
            vizType: studio.vizType,
            usage: studio.usage,
            externalLink: studio.externalLink ?? { label: null, href: null },
            bullets: studio.bullets.map((bullet) => ({ bullet })),
          },
        }
      : {}),
    _status: entry.hidden ? 'draft' : 'published',
  };
}
