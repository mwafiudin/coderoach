import { getPayload } from 'payload';
import config from '@payload-config';
import { FAQ } from '../FAQ';

export async function FAQBlockRenderer({ block }: { block: any }) {
  let items: Array<{ id: string | number; question: string; answer: string }> = [];

  if (block?.source === 'custom' && Array.isArray(block?.customItems)) {
    items = block.customItems.map((q: any, i: number) => ({
      id: i,
      question: q.question,
      answer: q.answer,
    }));
  } else {
    const payload = await getPayload({ config });
    const res = await payload
      .find({ collection: 'faqs', sort: 'order', limit: 100 })
      .catch(() => ({ docs: [] }));
    items = res.docs as any;
  }
  if (items.length === 0) return null;
  return <FAQ items={items as any} />;
}
