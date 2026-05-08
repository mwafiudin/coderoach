import { Icon, type IconName } from '@/lib/icons';
import { SectionHead } from './SectionHead';

type Phase = {
  id: string | number;
  tag: string;
  icon: IconName;
  name: string;
  week: string;
  what: string;
  deliv: string;
};

export function Process({ phases }: { phases: Phase[] }) {
  return (
    <section id="process" className="py-[120px] relative">
      <div className="max-w-[1180px] mx-auto px-8">
        <SectionHead
          marker="[ 04 / 07 ]"
          category="Process"
          description="How an engagement runs"
          heading="From spec to system in four phases."
          lede="Every engagement runs the same shape. Different scope, different stack — same shipping discipline."
        />
        <div
          className="grid grid-cols-1 md:grid-cols-4 relative pt-14 mt-14 [--progress:0]"
          data-process
        >
          {/* Rail */}
          <div
            aria-hidden
            className="absolute left-0 right-0 h-0.5 max-md:hidden"
            style={{
              top: '23px',
              background:
                'linear-gradient(to right, var(--color-electric) 0%, var(--color-electric) calc(var(--progress)*100%), var(--color-paper-200) calc(var(--progress)*100%), var(--color-paper-200) 100%)',
              transition: 'background 200ms linear',
              zIndex: 0,
            }}
          />
          {phases.map((p, i) => (
            <div key={p.id} className="relative pr-7 pt-6 max-md:pb-8 max-md:border-b max-md:border-paper-200">
              {/* Dot — desktop only, sits on the rail */}
              <div
                aria-hidden
                className="absolute w-3.5 h-3.5 rounded-full bg-paper-100 border-2 border-ink box-border max-md:hidden"
                style={{ top: '-39px', left: 0 }}
                data-phase-dot={i + 1}
              />
              <div className="flex justify-between font-mono text-[11px] tracking-wider tabular">
                <span className="text-mist-600">[ {p.tag} ]</span>
                <span className="text-electric">{p.week}</span>
              </div>
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-paper-50 border border-paper-200 text-shadow-700 flex-shrink-0 mt-[18px]" data-phase-icon={i + 1}>
                <Icon name={p.icon} size={20} />
              </div>
              <h4 className="text-[28px] font-bold tracking-[-0.015em] my-3.5 mt-3.5 mb-3">{p.name}</h4>
              <p className="text-sm text-mist-600 leading-[1.5] m-0 mb-4">{p.what}</p>
              <div className="bg-paper-50 border border-paper-200 rounded-md px-3 py-2.5 text-[13px] leading-[1.4]">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-mist-600 mb-1">You get</span>
                {p.deliv}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
