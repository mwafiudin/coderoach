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
import { inter } from '../fonts';
import './viralytics.css';

/**
 * The hand-overs, in the app's phase order (campaign_phases, commit 21df1da; link review, de99a87):
 * who holds the baton in each zone and who stands waiting for it.
 */
const ZONES: Array<{ phase: string; act: string; holds: string; waits: string }> = [
  { phase: 'Submission', act: 'Agensi mengajukan KOL, brand memutuskan per KOL', holds: 'Brand', waits: 'Agensi' },
  { phase: 'Drafting', act: 'KOL menyetor draft, disetujui di gerbang fase', holds: 'KOL', waits: 'Brand' },
  { phase: 'Posting', act: 'KOL mengirim link unggahan, tim agensi memverifikasi', holds: 'Tim agensi', waits: 'KOL' },
  { phase: 'Laporan', act: 'Metrik ditarik dari link yang lolos, tidak diketik', holds: 'Brand', waits: 'tidak ada' },
];

type Leg = 'lewat' | 'di sini' | 'gugur' | 'kembali' | '';

/** Made-up creators running side by side: one stopped at Submission, one draft sent back once. */
const LANES: Array<{ handle: string; legs: Leg[] }> = [
  { handle: '@dita.contoh', legs: ['lewat', 'lewat', 'lewat', 'di sini'] },
  { handle: '@bima.contoh', legs: ['lewat', 'kembali', 'di sini', ''] },
  { handle: '@rani.contoh', legs: ['gugur', '', '', ''] },
];

const LEG_LABEL: Record<Exclude<Leg, ''>, string> = {
  lewat: 'Lewat',
  'di sini': 'Di sini',
  gugur: 'Ditolak brand',
  kembali: 'Draft dikembalikan sekali, lalu lewat',
};

/**
 * Viralytics's own page (ADR 0013), concept "Estafet" (docs/konsep/viralytics.md): a campaign as a
 * relay where every hand-over zone shows who holds the baton and who stands waiting, because
 * everyone sees the same track; at the finish one link is followed from verification to the
 * report. The app's black ground, its blue, and its single glow (here only on the baton) come from
 * its design system. Without motion the baton waits at the finish and every zone reads in full.
 */
export async function ViralyticsPage({ project }: { project: Project }) {
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
    <main id={rootId} className={`story bk-vr ${inter.variable}`}>
      <section className="pt-6 sm:pt-12 pb-16 sm:pb-24">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
          <div className="hidden sm:block mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/work' }, { label: project.client }]} />
          </div>
          <p className="m-0 vr-label">
            <Meta parts={eyebrow} />
          </p>
          <h1 className="m-0 mt-3 vr-display text-[clamp(52px,10vw,132px)] leading-[0.95] tracking-[-0.04em]">{project.client}</h1>
          <p className="m-0 mt-5 max-w-[32ch] vr-display text-[clamp(20px,2.4vw,28px)] font-medium leading-[1.3] tracking-[-0.015em] text-pretty">
            {project.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-start gap-x-6 gap-y-3">
            {project.showcase?.tour && (
              <a href="#tur" className="h-11 inline-flex items-center text-[17px] font-semibold vr-link hover:underline underline-offset-4">
                Tonton turnya
              </a>
            )}
            <LinkChips links={links} />
          </div>
          {summary.length > 0 && (
            <dl className="m-0 mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 border-t border-paper-200 pt-8">
              {summary.map(([label, text]) => (
                <div key={label}>
                  <dt className="vr-label vr-link">{label}</dt>
                  <dd className="m-0 mt-2 text-[17px] leading-[1.6] text-pretty vr-soft">{text}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <section aria-labelledby="estafet-judul" className="vr-scene" data-scene="read">
        <div className="vr-scene__stage">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8 w-full">
            <p className="m-0 vr-label vr-link">Estafet</p>
            <h2 id="estafet-judul" className="m-0 mt-3 max-w-[22ch] vr-display text-[clamp(30px,4.4vw,54px)] leading-[1.06] tracking-[-0.03em] text-balance">
              Semua orang melihat lintasan yang sama.
            </h2>
            <p className="m-0 mt-5 max-w-[54ch] text-[17px] leading-[1.6] vr-soft text-pretty">
              Setiap fase campaign adalah zona oper. Tongkat hanya berpindah di dalam zona, setelah gerbangnya disetujui, dan
              di setiap zona tertulis siapa yang memegang dan siapa yang berdiri menunggu.
            </p>

            <div className="vr-track" aria-hidden>
              <span className="vr-track__line" />
              <span className="vr-run">
                <span className="vr-baton" />
              </span>
            </div>
            <ol className="vr-zones">
              {ZONES.map((z, i) => (
                <li key={z.phase} className="vr-zone" style={{ '--z': i } as React.CSSProperties}>
                  <p className="vr-zone__phase">
                    <span className="vr-zone__no">{String(i + 1).padStart(2, '0')}</span> {z.phase}
                  </p>
                  <p className="vr-zone__act">{z.act}</p>
                  <p className="vr-zone__plate">
                    Memegang: <strong>{z.holds}</strong>
                    <br />
                    Menunggu: <strong>{z.waits}</strong>
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="lajur-judul" className="py-[clamp(72px,9vw,120px)] border-t border-paper-200">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
          <p className="m-0 vr-label vr-link">Lajur sejajar</p>
          <h2 id="lajur-judul" className="m-0 mt-3 max-w-[24ch] vr-display text-[clamp(28px,4vw,46px)] leading-[1.08] tracking-[-0.03em] text-balance">
            Bukan lomba: setiap KOL punya lajurnya sendiri.
          </h2>
          <div className="vr-lanes-wrap">
            <table className="vr-lanes">
              <caption className="sr-only">Posisi tiga KOL contoh di setiap fase</caption>
              <thead>
                <tr>
                  <th scope="col">KOL</th>
                  {ZONES.map((z) => (
                    <th key={z.phase} scope="col">
                      {z.phase}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LANES.map((lane) => (
                  <tr key={lane.handle} role="row">
                    <th scope="row" role="rowheader">
                      {lane.handle}
                    </th>
                    {lane.legs.map((leg, i) => (
                      <td key={i} role="cell" className={leg ? `vr-leg vr-leg--${leg.replace(' ', '-')}` : 'vr-leg'}>
                        {leg ? (
                          <>
                            <span className="vr-leg__phase">{ZONES[i].phase}: </span>
                            {LEG_LABEL[leg]}
                          </>
                        ) : (
                          <span className="sr-only">Belum</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="m-0 mt-4 text-[13px] vr-faint">Handle dan posisi contoh.</p>
        </div>
      </section>

      <section aria-labelledby="finis-judul" className="py-[clamp(72px,9vw,120px)] border-t border-paper-200">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,520px)] gap-10 lg:gap-16 items-start">
          <div>
            <p className="m-0 vr-label vr-link">Garis finis</p>
            <h2 id="finis-judul" className="m-0 mt-3 vr-display text-[clamp(28px,4vw,46px)] leading-[1.08] tracking-[-0.03em] text-balance">
              Satu link, diikuti sampai laporan.
            </h2>
            <p className="m-0 mt-5 max-w-[46ch] text-[17px] leading-[1.6] vr-soft text-pretty">
              Angka di laporan tidak disalin dari tangkapan layar. Link unggahan diverifikasi dulu, baru metriknya ditarik,
              dan laporan membaca data yang sama dengan operasinya.
            </p>
          </div>
          <ol className="vr-finish" data-scene="enter">
            <li>
              <span className="vr-finish__step">Link dikirim KOL</span>
              <span className="vr-finish__value vr-mono">instagram.com/p/contoh</span>
            </li>
            <li>
              <span className="vr-finish__step">Diverifikasi tim agensi</span>
              <span className="vr-finish__value vr-pill">Terverifikasi</span>
            </li>
            <li>
              <span className="vr-finish__step">Metrik ditarik</span>
              <span className="vr-finish__value vr-num">48.200 views, ER 6,1%</span>
            </li>
            <li>
              <span className="vr-finish__step">Di laporan campaign</span>
              <span className="vr-finish__value vr-num">48.200 views, ER 6,1%</span>
            </li>
          </ol>
        </div>
        <p className="max-w-[1180px] mx-auto px-5 sm:px-8 m-0 mt-4 text-[13px] vr-faint">Data contoh.</p>
      </section>

      {features.length > 0 && (
        <section aria-labelledby="fitur-judul" className="py-[clamp(72px,9vw,120px)] border-t border-paper-200">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
            <h2 id="fitur-judul" className="m-0 vr-display text-[clamp(28px,4vw,46px)] leading-[1.08] tracking-[-0.03em]">
              Di dalam {project.client}.
            </h2>
            <ol className="m-0 mt-12 p-0 list-none">
              {features.map((f, i) => {
                const shot = asMedia(f.screen);
                return (
                  <li key={f.id ?? i} className="vr-feature" data-scene="enter">
                    <div>
                      <h3 className="m-0 vr-display text-[clamp(22px,2.4vw,30px)] font-bold tracking-[-0.02em] leading-[1.2] text-balance">{f.title}</h3>
                      {f.body && <p className="m-0 mt-3 max-w-[52ch] text-[17px] leading-[1.6] vr-soft text-pretty">{f.body}</p>}
                    </div>
                    {shot && (
                      <figure className="m-0 vr-feature__shot">
                        <DeviceFrame kind="browser">
                          <MediaImg media={shot} sizes="(min-width: 1024px) 680px, 92vw" />
                        </DeviceFrame>
                      </figure>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      )}

      <TourChapter project={project} />
      <Sources metrics={metrics} demoNote={project.showcase?.demoNote} />
      <StoryEnhancer rootId={rootId} />
    </main>
  );
}
