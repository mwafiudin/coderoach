import type { Project } from '@/payload-types';
import { industryLabel, KIND_LABELS } from '@/lib/portfolio/taxonomy';
import { Breadcrumbs } from '../../../_components/detail/Breadcrumbs';
import { Meta } from '../../../_components/ui/Meta';
import { LinkChips } from '../../_story/LinkChips';
import { asMedia } from '../../_story/MediaImg';
import { linkViews } from '../../_story/ProjectStory';
import { Sources } from '../../_story/Sources';
import { StoryEnhancer } from '../../_story/StoryEnhancer';
import { TourChapter } from '../../_story/TourChapter';
import { montserrat } from '../fonts';
import { Suasana } from '../Suasana';
import './laporta.css';
import { FeatureCatalog } from '../../_story/FeatureCatalog';

/** The seven steps of closing a shift, in the order the crew's phone asks for them. */
const SHIFT = ['Absen', 'Penjualan', 'Stock opname', 'Kas kecil', 'Waste', 'Kebersihan', 'Serah terima kas'];

/** What closing that shift posts. Account names only: the amounts on a real receipt are an outlet's own. */
const JOURNAL: Array<[string, 'D' | 'K']> = [
  ['Kas', 'D'],
  ['Penjualan', 'K'],
  ['Beban waste', 'D'],
  ['Persediaan', 'K'],
];

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Laporta's own page (ADR 0013): a till receipt that prints as you scroll and closes as a balanced
 * journal, because that is the product, one shift on a phone ending in the ledger. Amber and
 * Montserrat come from the app itself. Without JS or with reduced motion the receipt is simply
 * printed in full.
 */
export async function LaportaPage({ project }: { project: Project }) {
  const rootId = `story-${project.slug}`;
  const links = await linkViews(project.links ?? []);
  const metrics = project.metrics ?? [];
  const eyebrow = [KIND_LABELS[project.kind], industryLabel(project.industry), project.publishedYear].filter(Boolean);
  const summary = [
    ['Masalah', project.summary?.problem],
    ['Solusi', project.summary?.solution],
    ['Hasil', project.summary?.result],
  ].filter((row): row is [string, string] => Boolean(row[1]));
  // Every printed line, in print order: the steps, the lock, the journal caption and rows, the totals.
  const lines = SHIFT.length + 2 + JOURNAL.length + metrics.length;
  let n = 0;
  // The last line lands at 90% of the scene, so the stamp still has room after it.
  const at = () => ({ '--t': ((n++ / lines) * 0.9).toFixed(3) }) as React.CSSProperties;

  return (
    <main id={rootId} className={`story bk-laporta ${montserrat.variable}`}>
      <section className="pt-6 sm:pt-12 pb-16 sm:pb-24">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
          <div className="hidden sm:block mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/work' }, { label: project.client }]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-start">
            <div>
              <p className="m-0 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-ink/65 tabular">
                <Meta parts={eyebrow} />
              </p>
              <h1 className="m-0 mt-3 text-[clamp(64px,13vw,168px)] font-extrabold tracking-[-0.05em] leading-[0.9]">{project.client}</h1>
              <p className="m-0 mt-5 max-w-[24ch] text-[clamp(22px,2.8vw,34px)] font-semibold tracking-[-0.02em] leading-[1.2] text-pretty">
                {project.tagline}
              </p>
              <div className="mt-6 flex flex-wrap items-start gap-x-6 gap-y-3">
                {asMedia(project.showcase?.tour) && (
                  <a href="#tur" className="h-11 inline-flex items-center text-[18px] font-bold text-electric hover:underline underline-offset-4">
                    Tonton turnya
                  </a>
                )}
                <LinkChips links={links} />
              </div>
            </div>
            {/* A stub hanging from the top edge: the receipt below starts here. */}
            <div aria-hidden className="lp-stub hidden md:block">
              <p>LAPORTA</p>
              <p>BUKA SHIFT</p>
              <p className="lp-stub__dash" />
            </div>
          </div>
          {summary.length > 0 && (
            <dl className="m-0 mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 border-t-2 border-dashed border-paper-200 pt-8">
              {summary.map(([label, text]) => (
                <div key={label}>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-electric">{label}</dt>
                  <dd className="m-0 mt-2 text-[17px] leading-[1.55] text-pretty">{text}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <Suasana
        src="/assets/suasana/laporta-kasir.v1.webp"
        alt="Meja kasir warung ayam goreng saat tutup, printer struk mengeluarkan gulungan kertas panjang"
        caption="Jam tutup di outlet: saat crew menyerahkan shift."
      />

      <section aria-labelledby="struk-judul" className="lp-scene" data-scene="read">
        <div className="lp-scene__stage">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-20 items-center">
            <div>
              <p className="m-0 font-mono text-[11px] uppercase tracking-wider text-electric">Satu shift</p>
              <h2 id="struk-judul" className="m-0 mt-3 text-[clamp(34px,5vw,64px)] font-extrabold tracking-[-0.04em] leading-[1.02] text-balance">
                Dari laci kas sampai buku besar, dalam satu struk.
              </h2>
              <p className="m-0 mt-5 max-w-[44ch] text-[17px] leading-[1.6] text-ink/70 text-pretty">
                Crew menutup shift dari ponsel dalam tujuh langkah. Begitu diserahkan, datanya terkunci, dan setiap
                langkah memposting jurnal yang harus seimbang.
              </p>
            </div>
            <div className="lp-printer">
              <div aria-hidden className="lp-printer__slot" />
              <div className="lp-receipt" role="group" aria-label="Struk tutup shift, data contoh">
                <p className="lp-receipt__head">
                  LAPORTA
                  <br />
                  TUTUP SHIFT
                </p>
                <ol className="lp-receipt__lines">
                  {SHIFT.map((step, i) => (
                    <li key={step} className="lp-line" style={at()}>
                      <span>
                        {pad(i + 1)} {step}
                      </span>
                      <span className="lp-line__fill" aria-hidden />
                      <span>OK</span>
                    </li>
                  ))}
                </ol>
                <p className="lp-line lp-receipt__lock" style={at()}>
                  Terkunci setelah diserahkan
                </p>
                <table className="lp-journal">
                  <caption className="lp-line" style={at()}>
                    Jurnal
                  </caption>
                  <thead className="sr-only">
                    <tr>
                      <th scope="col">Akun</th>
                      <th scope="col">Debit</th>
                      <th scope="col">Kredit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {JOURNAL.map(([account, side]) => (
                      <tr key={account} className="lp-line" style={at()}>
                        <th scope="row">{account}</th>
                        <td>{side === 'D' ? 'D' : ''}</td>
                        <td>{side === 'K' ? 'K' : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="lp-stamp" aria-label="Debit dan kredit seimbang">
                  SEIMBANG
                </p>
                {metrics.length > 0 && (
                  <ul className="lp-receipt__totals">
                    {metrics.map((m, i) => (
                      <li key={m.key ?? i} className="lp-line" style={at()}>
                        <span>{m.label}</span>
                        <a href={`#sumber-${i + 1}`} aria-label={`${m.value} ${m.unit ?? ''}, sumber ${i + 1}`}>
                          {m.status === 'target' ? 'Target ' : ''}
                          {m.value}
                          {m.unit ? ` ${m.unit}` : ''} [{i + 1}]
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="lp-receipt__note">Data contoh</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeatureCatalog slug={project.slug ?? ''} client={project.client} />
      <TourChapter project={project} />
      <Sources metrics={metrics} demoNote={project.showcase?.demoNote} />
      <StoryEnhancer rootId={rootId} />
    </main>
  );
}
