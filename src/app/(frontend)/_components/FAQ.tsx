import { SectionHead } from './SectionHead';

type FAQ = {
  id: string | number;
  question: string;
  answer: string;
};

export function FAQ({ items }: { items: FAQ[] }) {
  // Split items into 2 balanced halves for desktop 2-col layout.
  const mid = Math.ceil(items.length / 2);
  const colA = items.slice(0, mid);
  const colB = items.slice(mid);

  return (
    <section id="faq" className="py-[120px] bg-paper-50 border-y border-paper-200 relative">
      <div className="max-w-[1180px] mx-auto px-8">
        <SectionHead
          marker="[ 07 / 07 ]"
          category="FAQ"
          description=""
          heading="Pertanyaan yang biasanya muncul."
        />
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-0">
          <div className="border-t border-ink lg:border-r-0 reveal-stagger">
            {colA.map((q, i) => (
              <FaqItem key={q.id} q={q} index={i} open={i === 0} />
            ))}
          </div>
          <div className="border-t border-ink reveal-stagger">
            {colB.map((q, i) => (
              <FaqItem key={q.id} q={q} index={i + mid} open={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, index, open }: { q: FAQ; index: number; open: boolean }) {
  return (
    <details open={open} className="border-b border-paper-200 py-6 group">
      <summary
        className="list-none cursor-pointer grid items-baseline gap-4"
        style={{ gridTemplateColumns: '64px 1fr 24px' }}
      >
        <span className="font-mono text-xs text-mist-600 group-open:text-electric tracking-wider whitespace-nowrap tabular">
          [ Q.{String(index + 1).padStart(2, '0')} ]
        </span>
        <span className="text-[19px] font-semibold tracking-[-0.01em] leading-snug">{q.question}</span>
        <span className="font-mono text-mist-500 group-open:text-electric text-right text-[22px] leading-none transition-transform duration-[280ms] group-open:rotate-45 ease-[var(--ease-out-quint)]">
          +
        </span>
      </summary>
      <div className="text-[15px] leading-[1.6] text-mist-600 mt-3.5 pl-[80px] pr-6 group-open:animate-faq-in">
        {q.answer}
      </div>
    </details>
  );
}
