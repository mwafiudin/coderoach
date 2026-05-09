import { getPayload } from 'payload';
import config from '@payload-config';
import { Services } from '../Services';
import { SectionHead } from '../SectionHead';

export async function ServiceListBlockRenderer({ block }: { block: any }) {
  const payload = await getPayload({ config });
  let items: any[] = [];
  if (block?.source === 'manual' && Array.isArray(block?.services) && block.services.length > 0) {
    const ids = block.services.map((s: any) => (typeof s === 'object' ? s.id : s)).filter(Boolean);
    if (ids.length > 0) {
      const res = await payload
        .find({ collection: 'services', where: { id: { in: ids } }, sort: 'order', limit: 100 })
        .catch(() => ({ docs: [] }));
      items = res.docs as any[];
    }
  } else {
    const res = await payload
      .find({ collection: 'services', sort: 'order', limit: 100 })
      .catch(() => ({ docs: [] }));
    items = res.docs as any[];
  }
  // Override section head from block if provided — Services component renders its own.
  // For now, just render Services as-is (it has hard-coded section head).
  // TODO: pass block.heading/lede through Services component when we generalize.
  return <Services items={items as any} />;
}
