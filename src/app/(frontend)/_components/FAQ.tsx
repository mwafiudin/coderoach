'use client';

import { SectionHead } from './SectionHead';

type FAQ = {
  id: string | number;
  question: string;
  answer: string;
};

export function FAQ({ items }: { items: FAQ[] }) {
  return (
    <section id="faq" className="py-[120px] bg-paper-50 border-y border-paper-200 relative">
      <div className="max-w-[880px] mx-auto px-8">
        <SectionHead
          marker="[ 06 / 06 ]"
          category="FAQ"
          description="Common questions"
          heading="Things you're probably wondering."
        />
        <div className="mt-12 border-t border-ink reveal-stagger">
          {items.map((q, i) => (
            <details key={q.id} open={i === 0} className="border-b border-paper-200 py-6 group">
              <summary className="list-none cursor-pointer grid items-baseline gap-6" style={{ gridTemplateColumns: '76px 1fr 24px' }}>
                <span className="font-mono text-xs text-mist-600 group-open:text-electric tracking-wider whitespace-nowrap tabular">
                  [ Q.{String(i + 1).padStart(2, '0')} ]
                </span>
                <span className="text-[22px] font-semibold tracking-[-0.01em] leading-snug">{q.question}</span>
                <span className="font-mono text-mist-500 group-open:text-electric text-right text-[22px] leading-none transition-transform duration-[280ms] group-open:rotate-45 ease-[var(--ease-out-quint)]">
                  +
                </span>
              </summary>
              <div className="text-base leading-[1.55] text-mist-600 max-w-[760px] mt-3.5 pl-[100px] pr-6 group-open:animate-faq-in">
                {q.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
