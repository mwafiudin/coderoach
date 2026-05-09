import { Contact } from '../Contact';

export function ContactBlockRenderer({ block }: { block: any }) {
  return <Contact data={block as any} />;
}
