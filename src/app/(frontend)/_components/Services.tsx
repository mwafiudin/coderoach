import { Icon, type IconName } from '@/lib/icons';
import { SectionHead } from './SectionHead';

type Service = {
  id: string | number;
  tag: string;
  icon: IconName;
  title: string;
  tagline: string;
  blurb: string;
  list: Array<{ item: string }>;
  stack: Array<{ tech: string }>;
};

export function Services({ items }: { items: Service[] }) {
  return (
    <section id="services" className="py-[120px] relative">
      <div className="max-w-[1180px] mx-auto px-8">
        <SectionHead
          marker="[ 01 / 06 ]"
          category="Services"
          description="What we build"
          heading="Four ways we ship."
          lede="We don't sell hours. We ship outcomes — products that earn their place in your operations."
        />
        <div
          className="grid gap-4 mt-14"
          style={{
            gridTemplateColumns: '1.6fr 1fr 1fr',
            gridTemplateAreas: '"a b c" "a d c"',
          }}
        >
          {items.map((it, i) => {
            const isHero = i === 0;
            const area = ['a', 'b', 'c', 'd'][i];
            return (
              <article
                key={it.id}
                style={{ gridArea: area }}
                className={`relative flex flex-col gap-4 rounded-[12px] border transition-colors group overflow-hidden
                  ${isHero
                    ? 'bg-ink text-paper border-ink p-10 gap-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_0_0_1px_rgba(244,247,245,0.04),0_8px_24px_-12px_rgba(8,9,10,0.4)]'
                    : 'bg-paper-50 border-paper-200 p-8 hover:border-shadow-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]'
                  }`}
              >
                {isHero && (
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-inherit pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-[360ms] bg-[radial-gradient(480px_circle_at_var(--mx,50%)_var(--my,50%),rgba(44,112,254,0.14),transparent_42%)]"
                  />
                )}
                <div className="flex items-center relative z-[1]">
                  <span
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-[10px] border transition-colors
                      ${isHero
                        ? 'bg-paper/[0.06] border-shadow-700 text-mist-400 group-hover:text-electric group-hover:bg-electric/[0.16]'
                        : 'bg-paper-100 border-paper-200 text-shadow-700 group-hover:text-electric group-hover:bg-electric/[0.08]'
                      }`}
                  >
                    <Icon name={it.icon} size={24} />
                  </span>
                </div>
                <h3 className={`font-bold tracking-[-0.015em] m-0 leading-[1.05] relative z-[1] ${isHero ? 'text-[44px]' : 'text-[36px]'}`}>
                  {it.title}
                </h3>
                <p className="text-[17px] leading-[1.4] font-medium m-0 relative z-[1]">{it.tagline}</p>
                <p className={`text-[15px] leading-[1.55] m-0 relative z-[1] ${isHero ? 'text-mist-500' : 'text-mist-600'}`}>
                  {it.blurb}
                </p>
                <ul className="list-none p-0 m-0 flex flex-col gap-2 relative z-[1]">
                  {it.list.map((l) => (
                    <li key={l.item} className="text-sm leading-[1.4] flex gap-2.5">
                      <span className="text-electric font-bold">→</span>
                      {l.item}
                    </li>
                  ))}
                </ul>
                <div className={`flex gap-1.5 flex-wrap mt-auto pt-3 relative z-[1] border-t ${isHero ? 'border-shadow-700' : 'border-paper-200/60'}`}>
                  <span className={`font-mono text-[11px] uppercase tracking-wider self-center mr-1 ${isHero ? 'text-mist-500' : 'text-mist-600'}`}>
                    [ stack ]
                  </span>
                  {it.stack.map((s) => (
                    <span
                      key={s.tech}
                      className={`h-6 px-2.5 rounded-full inline-flex items-center font-mono text-[11px] font-medium uppercase tracking-wider whitespace-nowrap
                        ${isHero ? 'bg-mist-400/[0.18] text-paper' : 'bg-mist-400/30 text-ink'}`}
                    >
                      {s.tech}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
