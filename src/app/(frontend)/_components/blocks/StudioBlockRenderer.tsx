import { getPayload } from 'payload';
import config from '@payload-config';
import { Studio } from '../Studio';

export async function StudioBlockRenderer({ block }: { block: any }) {
  const payload = await getPayload({ config });
  let tenets: any[] = [];
  if (Array.isArray(block?.tenets) && block.tenets.length > 0) {
    const ids = block.tenets.map((t: any) => (typeof t === 'object' ? t.id : t)).filter(Boolean);
    if (ids.length > 0) {
      const res = await payload
        .find({ collection: 'tenets', where: { id: { in: ids } }, sort: 'order', limit: 100 })
        .catch(() => ({ docs: [] }));
      tenets = res.docs as any[];
    }
  } else {
    const res = await payload
      .find({ collection: 'tenets', sort: 'order', limit: 100 })
      .catch(() => ({ docs: [] }));
    tenets = res.docs as any[];
  }
  // Studio component reads heading/lede/stats from a `data` shape that matches the block fields.
  return <Studio data={block as any} tenets={tenets as any} />;
}
