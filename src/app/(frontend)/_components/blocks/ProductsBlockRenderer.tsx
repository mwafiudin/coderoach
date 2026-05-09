import { getPayload } from 'payload';
import config from '@payload-config';
import { Products } from '../Products';

export async function ProductsBlockRenderer({ block }: { block: any }) {
  const payload = await getPayload({ config });
  let items: any[] = [];
  if (Array.isArray(block?.products) && block.products.length > 0) {
    const ids = block.products.map((p: any) => (typeof p === 'object' ? p.id : p)).filter(Boolean);
    if (ids.length > 0) {
      const res = await payload
        .find({
          collection: 'projects',
          where: { and: [{ id: { in: ids } }, { kind: { equals: 'studio' } }] },
          sort: 'order',
          limit: 100,
        })
        .catch(() => ({ docs: [] }));
      items = res.docs as any[];
    }
  } else {
    const res = await payload
      .find({
        collection: 'projects',
        where: { kind: { equals: 'studio' } },
        sort: 'order',
        limit: 100,
      })
      .catch(() => ({ docs: [] }));
    items = res.docs as any[];
  }
  if (items.length === 0) return null;
  return <Products items={items as any} />;
}
