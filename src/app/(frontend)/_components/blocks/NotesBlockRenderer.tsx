import { getPayload } from 'payload';
import config from '@payload-config';
import { HomeNotes } from '../HomeNotes';

export async function NotesBlockRenderer({ block }: { block: any }) {
  const payload = await getPayload({ config });
  const limit = Math.max(1, Math.min(12, block?.limit ?? 3));
  const res = await payload
    .find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
      sort: '-publishedAt',
      limit,
      depth: 1,
    })
    .catch(() => ({ docs: [] }));
  if (res.docs.length === 0) return null;
  return <HomeNotes posts={res.docs as any[]} />;
}
