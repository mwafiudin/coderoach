import { getPayload } from 'payload';
import config from '@payload-config';
import { Work } from '../Work';

export async function WorkBlockRenderer({ block }: { block: any }) {
  const payload = await getPayload({ config });
  // Strategy:
  // - Featured: explicit relation OR project with featured=true (any kind).
  // - List: explicit list relation OR all client projects (excluding featured).
  let cases: any[] = [];
  if (Array.isArray(block?.listProjects) && block.listProjects.length > 0) {
    const ids = block.listProjects.map((p: any) => (typeof p === 'object' ? p.id : p)).filter(Boolean);
    if (ids.length > 0) {
      const res = await payload
        .find({
          collection: 'projects',
          where: { id: { in: ids } },
          sort: 'order',
          limit: 100,
          depth: 1,
        })
        .catch(() => ({ docs: [] }));
      cases = res.docs as any[];
    }
  } else {
    const res = await payload
      .find({
        collection: 'projects',
        where: { or: [{ kind: { equals: 'client' } }, { featured: { equals: true } }] },
        sort: 'order',
        limit: 100,
        depth: 1,
      })
      .catch(() => ({ docs: [] }));
    cases = res.docs as any[];
  }

  // If block specifies an explicit featuredProject, ensure it's in the list and surfaced as featured.
  if (block?.featuredProject) {
    const id = typeof block.featuredProject === 'object' ? block.featuredProject.id : block.featuredProject;
    if (id) {
      cases = cases.map((c: any) => ({ ...c, featured: c.id === id ? true : false }));
      const exists = cases.find((c: any) => c.id === id);
      if (!exists) {
        const res = await payload
          .find({ collection: 'projects', where: { id: { equals: id } }, limit: 1, depth: 1 })
          .catch(() => ({ docs: [] }));
        if (res.docs[0]) cases = [{ ...(res.docs[0] as any), featured: true }, ...cases];
      }
    }
  }

  return <Work cases={cases as any} />;
}
