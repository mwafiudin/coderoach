/**
 * Narrative sections: the three arguments the landing page makes between the product sections.
 *
 * Each is a rich-text block in the CMS, drawn by its own composition instead of as prose. They share
 * a language — rules that run past the container, type that carries the contrast, one accent — but
 * no two are laid out alike, so the page reads as an argument rather than a list.
 *
 * Content renders without JavaScript; only the rules animate, and they stop under
 * prefers-reduced-motion.
 */
import { parseNarrative } from './parse';

const SECTION = 'relative overflow-hidden py-[clamp(72px,9vw,132px)]';
const CONTAINER = 'max-w-[1180px] mx-auto px-8';
const COLUMNS = 'grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]';
const DISPLAY = 'text-[clamp(32px,4.4vw,60px)] font-bold tracking-[-0.03em] leading-[1.02] text-balance';

/** A hairline that runs off one side of the viewport, past the container it belongs to. */
function BleedRule({
  side = 'left',
  className = '',
  delay = 0,
}: {
  side?: 'left' | 'right';
  className?: string;
  delay?: number;
}) {
  const bleed = side === 'left' ? 'left-[-100vw] right-0 origin-right' : 'left-0 right-[-100vw] origin-left';
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-px bg-paper-200 animate-rule-draw ${bleed} ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    />
  );
}

/** "Kapan bisnis butuh sistem sendiri" — symptoms, each one cut off by a rule. */
export function SymptomsSection({ content }: { content: unknown }) {
  const { title, items, outro } = parseNarrative(content);
  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        <div className={`${COLUMNS} gap-y-10 lg:gap-x-16`}>
          <h2 className={`${DISPLAY} max-w-[13ch] lg:sticky lg:top-28 self-start`}>{title}</h2>

          <div className="relative">
            {items.map((item, i) => (
              <p
                key={item}
                className="relative py-[clamp(18px,2.2vw,28px)] text-[clamp(19px,2.1vw,27px)] leading-[1.25] tracking-[-0.015em] text-ink m-0"
              >
                <BleedRule className="top-0" delay={i * 90} />
                {item}
              </p>
            ))}
            <BleedRule className="bottom-0" delay={items.length * 90} />
          </div>
        </div>

        {outro.length > 0 && (
          <div className={`${COLUMNS} lg:gap-x-16 mt-[clamp(36px,4.5vw,64px)]`}>
            <span aria-hidden className="hidden lg:block" />
            <div className="max-w-[46ch]">
              <p className="text-[clamp(21px,2.5vw,32px)] font-semibold leading-[1.22] tracking-[-0.02em] text-ink text-pretty m-0">
                {outro[0]}
              </p>
              {outro.slice(1).map((line) => (
                <p key={line} className="mt-5 text-[16px] leading-[1.55] text-mist-600 m-0">
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** "Langganan atau bangun sendiri?" — a ledger: each line on the left has its answer on the right. */
export function LedgerSection({ content }: { content: unknown }) {
  const { title, intro, groups } = parseNarrative(content);
  const [rented, owned] = groups;
  const rows = Math.max(rented?.items.length ?? 0, owned?.items.length ?? 0);

  return (
    <section className={`${SECTION} bg-paper-50 border-y border-paper-200`}>
      <div className={CONTAINER}>
        <h2 className={`${DISPLAY} max-w-[16ch]`}>{title}</h2>
        {intro.map((line) => (
          <p key={line} className="mt-6 max-w-[54ch] text-[17px] leading-[1.55] text-mist-600 text-pretty">
            {line}
          </p>
        ))}

        {/* One DOM order (each column whole, so it stacks on a phone); subgrid pairs the rows on a wide screen. */}
        <div
          className="mt-[clamp(40px,5vw,72px)] lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
          style={{ gridTemplateRows: `auto repeat(${rows}, auto)` }}
        >
          <div className="lg:grid lg:grid-rows-subgrid" style={{ gridRow: `span ${rows + 1}` }}>
            <h3 className="flex items-end text-[clamp(30px,5vw,68px)] font-bold tracking-[-0.035em] leading-none text-mist-600 m-0">
              {rented?.title}
            </h3>
            {Array.from({ length: rows }).map((_, i) => (
              <p
                key={rented?.items[i] ?? `rented-${i}`}
                className="flex items-center border-t border-paper-200 py-[clamp(14px,1.6vw,20px)] lg:pr-10 text-[15px] leading-[1.45] text-ink/70 m-0"
              >
                {rented?.items[i]}
              </p>
            ))}
          </div>

          <div
            className="mt-10 lg:mt-0 lg:grid lg:grid-rows-subgrid lg:border-l lg:border-paper-200 lg:pl-[clamp(24px,3vw,48px)]"
            style={{ gridRow: `span ${rows + 1}` }}
          >
            <h3 className="flex items-end text-[clamp(30px,5vw,68px)] font-bold tracking-[-0.035em] leading-none text-ink m-0">
              {owned?.title}
            </h3>
            {Array.from({ length: rows }).map((_, i) => (
              <p
                key={owned?.items[i] ?? `owned-${i}`}
                className="relative flex items-center border-t border-paper-200 py-[clamp(14px,1.6vw,20px)] text-[16px] leading-[1.45] font-medium text-ink m-0 after:absolute after:left-0 after:top-0 after:h-px after:w-[clamp(10px,1.4vw,18px)] after:bg-electric lg:after:left-[calc(clamp(24px,3vw,48px)*-1)]"
              >
                {owned?.items[i]}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** "Cocok untuk siapa" — the two answers pull to opposite edges of the page. */
export function FitSection({ content }: { content: unknown }) {
  const { title, groups, outro } = parseNarrative(content);
  const [fits, doesNot] = groups;

  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={`${DISPLAY} max-w-[14ch]`}>{title}</h2>

        <div className="mt-[clamp(36px,4.5vw,64px)] max-w-[52ch]">
          <h3 className="text-[clamp(24px,3vw,40px)] font-bold tracking-[-0.03em] leading-none text-ink m-0">
            {fits?.title}
          </h3>
          <ul className="mt-6 list-none p-0 m-0">
            {fits?.items.map((item) => (
              <li
                key={item}
                className="relative border-t border-paper-200 py-[clamp(12px,1.4vw,18px)] text-[clamp(16px,1.7vw,19px)] leading-[1.4] text-ink after:absolute after:left-0 after:top-0 after:h-px after:w-[clamp(10px,1.4vw,18px)] after:bg-electric"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mt-[clamp(52px,6vw,92px)] max-w-[52ch] lg:ml-auto lg:text-right">
          <BleedRule side="right" className="-top-[clamp(26px,3vw,46px)]" />
          <h3 className="text-[clamp(22px,2.6vw,34px)] font-bold tracking-[-0.03em] leading-none text-mist-600 m-0">
            {doesNot?.title}
          </h3>
          <ul className="mt-6 list-none p-0 m-0">
            {doesNot?.items.map((item) => (
              <li
                key={item}
                className="border-t border-paper-200 py-[clamp(12px,1.4vw,18px)] text-[15px] leading-[1.45] text-ink/70"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {outro.map((line) => (
          <p key={line} className="mt-[clamp(32px,4vw,56px)] max-w-[46ch] text-[16px] leading-[1.55] text-mist-600 m-0">
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
