import type { Project } from '@/payload-types';
import { industryLabel, KIND_LABELS } from '@/lib/portfolio/taxonomy';
import { Breadcrumbs } from '../../../_components/detail/Breadcrumbs';
import { Meta } from '../../../_components/ui/Meta';
import { DeviceFrame } from '../../_story/DeviceFrame';
import { LinkChips } from '../../_story/LinkChips';
import { asMedia, MediaImg } from '../../_story/MediaImg';
import { linkViews } from '../../_story/ProjectStory';
import { Sources } from '../../_story/Sources';
import { StoryEnhancer } from '../../_story/StoryEnhancer';
import { TourChapter } from '../../_story/TourChapter';
import './coderoach-os.css';

/**
 * Sample numbers. The error line copies the format of the balance trigger in coderoach-app
 * (src/db/migrations/0004_trigger_balance.sql): debit and kredit are numeric(18,2) sums, the id a
 * full uuid. The uuid here is made up.
 */
const DEBIT = '4500000.00';
const KREDIT = '4200000.00';
const JURNAL = '3f9c2a1e-7b4d-4c8a-9e21-5d0b6a8f4c13';

const SHEET: Array<[string, string, string]> = [
  ['Tab Jam kerja', 'Biaya proyek', 'Rp4.500.000'],
  ['Tab Rekap', 'Biaya proyek', 'Rp4.200.000'],
  ['Tab Rekap', 'Margin', '31%'],
];

/** Where one project code turns up, from the offer to the ledger and the agent that reads it. */
const THREAD = ['Penawaran', 'Story', 'Jam kerja', 'Invoice', 'Jurnal', 'Claude Code, lewat MCP'];

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Coderoach OS's own page (ADR 0013), concept "Buku yang menolak selisih"
 * (docs/konsep/coderoach-os.md): the same cost booked unevenly, once in a spreadsheet, where
 * nothing objects until the month is added up, and once in Coderoach OS, where the database turns
 * the whole transaction back with its own error. The app shares the studio's design system, so the
 * page keeps the site's tokens and leans on its mono voice. Without motion both sides stand one
 * above the other.
 */
export async function CoderoachOsPage({ project }: { project: Project }) {
  const rootId = `story-${project.slug}`;
  const links = await linkViews(project.links ?? []);
  const metrics = project.metrics ?? [];
  const features = project.features ?? [];
  const eyebrow = [KIND_LABELS[project.kind], industryLabel(project.industry), project.publishedYear].filter(Boolean);
  const summary = [
    ['Masalah', project.summary?.problem],
    ['Solusi', project.summary?.solution],
    ['Hasil', project.summary?.result],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <main id={rootId} className="story bk-os">
      <section className="pt-6 sm:pt-12 pb-16 sm:pb-24">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
          <div className="hidden sm:block mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/work' }, { label: project.client }]} />
          </div>
          <p className="m-0 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-mist-600 tabular">
            <Meta parts={eyebrow} />
          </p>
          <h1 className="m-0 mt-3 text-[clamp(52px,10vw,132px)] font-bold tracking-[-0.045em] leading-[0.95]">{project.client}</h1>
          <p className="m-0 mt-5 max-w-[30ch] text-[clamp(20px,2.4vw,28px)] font-medium tracking-[-0.015em] leading-[1.3] text-pretty">
            {project.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-start gap-x-6 gap-y-3">
            {project.showcase?.tour && (
              <a href="#tur" className="h-11 inline-flex items-center text-[17px] font-semibold text-[color:var(--os-electric-text)] hover:underline underline-offset-4">
                Tonton turnya
              </a>
            )}
            <LinkChips links={links} />
          </div>
          {summary.length > 0 && (
            <dl className="m-0 mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 border-t border-paper-200 pt-8">
              {summary.map(([label, text], i) => (
                <div key={label}>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-mist-600">
                    [ {pad(i + 1)} ] {label}
                  </dt>
                  <dd className="m-0 mt-2 text-[17px] leading-[1.6] text-pretty">{text}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <section aria-labelledby="selisih-judul" className="os-scene" data-scene="read">
        <div className="os-scene__stage">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8 w-full">
            <p className="m-0 font-mono text-[11px] uppercase tracking-wider text-mist-600">Buku yang menolak selisih</p>
            <h2 id="selisih-judul" className="m-0 mt-3 max-w-[24ch] text-[clamp(30px,4.4vw,54px)] font-bold tracking-[-0.035em] leading-[1.06] text-balance">
              Biaya yang sama, dicatat tidak seimbang, di dua tempat.
            </h2>

            <div className="os-frame">
              <article className="os-side os-side--sheet" aria-labelledby="sheet-judul">
                <h3 id="sheet-judul" className="os-side__name">
                  Di spreadsheet
                </h3>
                <table className="os-sheet" aria-labelledby="sheet-judul">
                  <thead>
                    <tr>
                      <th scope="col">Tab</th>
                      <th scope="col">Baris</th>
                      <th scope="col">Nilai</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SHEET.map(([tab, row, value]) => (
                      <tr key={tab + row}>
                        <td>{tab}</td>
                        <th scope="row">{row}</th>
                        <td className="tabular">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="os-side__verdict">
                  Tersimpan. Tidak ada yang menolak, dan selisih Rp300.000 baru terlihat saat semuanya direkap.
                </p>
              </article>

              <article className="os-side os-side--os" aria-labelledby="os-judul">
                <h3 id="os-judul" className="os-side__name">
                  Di Coderoach OS
                </h3>
                <pre className="os-log">
                  <code>
                    <span className="os-log__dim">BEGIN</span>
                    {'\n'}jurnal_line  debit  {DEBIT}  biaya proyek
                    {'\n'}jurnal_line  kredit {KREDIT}  kas
                    {'\n'}
                    <span className="os-log__dim">COMMIT</span>
                    {'\n'}
                    <span className="os-log__err">
                      ERROR: Jurnal {JURNAL} tidak balance: debit {DEBIT} &lt;&gt; kredit {KREDIT}
                    </span>
                  </code>
                </pre>
                <p className="os-side__verdict">
                  Ditolak. Pemeriksaannya berjalan saat transaksi ditutup, jadi seluruh transaksi batal dan tidak ada baris
                  yang tersimpan.
                </p>
              </article>
            </div>
            <p className="m-0 mt-4 text-[13px] text-mist-600">
              Data contoh. Kalimat galatnya sama dengan yang ditulis trigger keseimbangan di database Coderoach OS.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="benang-judul" className="py-[clamp(72px,9vw,120px)] border-t border-paper-200">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
          <p className="m-0 font-mono text-[11px] uppercase tracking-wider text-mist-600">Satu sistem</p>
          <h2 id="benang-judul" className="m-0 mt-3 max-w-[24ch] text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.03em] leading-[1.08] text-balance">
            Satu kode proyek, dari penawaran sampai buku besar.
          </h2>
          <ol className="os-thread">
            {THREAD.map((stop, i) => (
              <li key={stop} data-scene="enter">
                <span aria-hidden className="os-thread__no">{pad(i + 1)}</span>
                <span className="os-thread__code">CRO-2026-014</span>
                <span className="os-thread__stop">{stop}</span>
              </li>
            ))}
          </ol>
          <p className="m-0 mt-4 text-[13px] text-mist-600">Kode contoh. Setiap jam kerja langsung menjadi biaya proyek, dan margin dihitung ulang setiap jurnal diposting.</p>

          {features.length > 0 && (
            <ol className="m-0 mt-16 p-0 list-none">
              {features.map((f, i) => {
                const shot = asMedia(f.screen);
                return (
                  <li key={f.id ?? i} className="os-feature" data-scene="enter">
                    <p aria-hidden className="os-feature__no">[ {pad(i + 1)} ]</p>
                    <div>
                      <h3 className="m-0 text-[clamp(22px,2.4vw,30px)] font-bold tracking-[-0.02em] leading-[1.2] text-balance">{f.title}</h3>
                      {f.body && <p className="m-0 mt-3 max-w-[56ch] text-[17px] leading-[1.6] text-ink/75 text-pretty">{f.body}</p>}
                    </div>
                    {shot && (
                      <figure className="m-0 os-feature__shot">
                        <DeviceFrame kind="browser">
                          <MediaImg media={shot} sizes="(min-width: 1024px) 760px, 92vw" />
                        </DeviceFrame>
                      </figure>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </section>

      <TourChapter project={project} />
      <Sources metrics={metrics} demoNote={project.showcase?.demoNote} />
      <StoryEnhancer rootId={rootId} />
    </main>
  );
}
