import { getPayload } from 'payload';
import config from '@payload-config';
import { Process } from '../Process';

export async function ProcessBlockRenderer({ block }: { block: any }) {
  const payload = await getPayload({ config });
  let phases: any[] = [];
  if (Array.isArray(block?.phases) && block.phases.length > 0) {
    const ids = block.phases.map((p: any) => (typeof p === 'object' ? p.id : p)).filter(Boolean);
    if (ids.length > 0) {
      const res = await payload
        .find({ collection: 'process-phases', where: { id: { in: ids } }, sort: 'order', limit: 100 })
        .catch(() => ({ docs: [] }));
      phases = res.docs as any[];
    }
  } else {
    const res = await payload
      .find({ collection: 'process-phases', sort: 'order', limit: 100 })
      .catch(() => ({ docs: [] }));
    phases = res.docs as any[];
  }
  if (phases.length === 0) return null;
  return <Process phases={phases as any} />;
}
