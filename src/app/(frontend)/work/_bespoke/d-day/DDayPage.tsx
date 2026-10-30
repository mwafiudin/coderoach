import { Check } from '@phosphor-icons/react/dist/ssr/Check';
import { X } from '@phosphor-icons/react/dist/ssr/X';
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
import './d-day.css';

/**
 * The conditions Lanjutkan checks, in the order syaratLanjutkan() in the d-day repo checks them
 * (dashboard/src/lib/lanjutkan.ts). The failing message is the code's own; the minutes are a sample.
 * The check stops at the first failure, so the ones after it are not reached.
 */
const CONDITIONS: Array<{ text: string; fails?: string }> = [
  { text: 'Ada potret sinkron dari worker, lengkap dengan rekonsiliasi' },
  {
    text: 'Potret itu paling lama 10 menit',
    fails: 'Sinkronisasi terakhir 14 menit lalu; Lanjutkan butuh yang paling lama 10 menit. Sinkronkan lagi.',
  },
  { text: 'Semua engine live ikut sinkronisasi terakhir' },
  { text: 'Semua engine berputusan cocok dengan exchange' },
];

/** Where the check stops: the first condition that fails. */
const STALE = CONDITIONS.findIndex((c) => c.fails);

/**
 * d-day's own page (ADR 0013), concept "Gembok dan tag" (docs/konsep/d-day.md): stopping hangs a
 * lock with a tag at once; taking it off needs proof, and proof goes stale. Dark, one orange (the
 * lock), and a background that carries the system's state, as in the app. Without motion the tag
 * hangs and the stale condition reads as failed, which is where the story ends.
 */
export async function DDayPage({ project }: { project: Project }) {
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
    <main id={rootId} className="story bk-dd">
      <section className="pt-6 sm:pt-12 pb-16 sm:pb-24">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
          <div className="hidden sm:block mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/work' }, { label: project.client }]} />
          </div>
          <p className="m-0 dd-caption">
            <Meta parts={eyebrow} />
          </p>
          <h1 className="m-0 mt-3 text-[clamp(56px,11vw,140px)] font-bold tracking-[-0.04em] leading-[0.95]">{project.client}</h1>
          <p className="m-0 mt-5 max-w-[30ch] text-[clamp(20px,2.4vw,28px)] font-semibold leading-[1.3] text-pretty">{project.tagline}</p>
          <div className="mt-6 flex flex-wrap items-start gap-x-6 gap-y-3">
            {project.showcase?.tour && (
              <a href="#tur" className="h-11 inline-flex items-center text-[17px] font-semibold dd-link hover:underline underline-offset-4">
                Tonton turnya
              </a>
            )}
            <LinkChips links={links} />
          </div>
          {summary.length > 0 && (
            <dl className="m-0 mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
              {summary.map(([label, text]) => (
                <div key={label} className="dd-card">
                  <dt className="dd-caption">{label}</dt>
                  <dd className="m-0 mt-2 text-[17px] leading-[1.55] text-pretty">{text}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <section aria-labelledby="gembok-judul" className="dd-scene" data-scene="read">
        <div className="dd-scene__stage">
          <div className="max-w-[1120px] mx-auto px-5 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
            <div>
              <p className="m-0 dd-caption">Gembok dan tag</p>
              <h2 id="gembok-judul" className="m-0 mt-3 text-[clamp(30px,4.2vw,50px)] font-bold tracking-[-0.03em] leading-[1.08] text-balance">
                Berhenti cukup satu ketukan. Melanjutkan harus dibuktikan.
              </h2>
              <p className="m-0 mt-5 max-w-[46ch] text-[17px] leading-[1.6] dd-muted text-pretty">
                Di pabrik, yang menghentikan mesin menggantung gembok dan tag di sakelarnya. Di d-day, Hentikan semua memasang
                gembok itu seketika. Bedanya, yang melepasnya bukan orang, melainkan bukti dari exchange.
              </p>

              <article className="dd-tag" aria-label="Tag penghentian, data simulasi">
                <span aria-hidden className="dd-tag__lock" />
                <p className="dd-tag__status">Berhenti total: tidak ada order sampai dilanjutkan manusia</p>
                <dl className="dd-tag__fields">
                  <div>
                    <dt>halt_level</dt>
                    <dd>halt_total</dd>
                  </div>
                  <div>
                    <dt>halt_reason</dt>
                    <dd>dihentikan manual dari dashboard</dd>
                  </div>
                  <div>
                    <dt>halted_at</dt>
                    <dd>2026-10-07T13:42:08Z</dd>
                  </div>
                </dl>
                <p className="dd-tag__sim">Data simulasi</p>
              </article>
            </div>

            <div>
              <h3 className="m-0 text-[20px] font-semibold">Syarat melepas tag</h3>
              <ol className="dd-conditions">
                {CONDITIONS.map((c, i) => {
                  const state = i < STALE ? 'ok' : i === STALE ? 'stale' : 'skip';
                  return (
                  <li key={c.text} className={`dd-cond dd-cond--${state}`} style={{ '--t': i * 0.16 } as React.CSSProperties}>
                    <span className="dd-cond__mark" aria-hidden>
                      {state === 'ok' && <Check weight="bold" />}
                      {state === 'stale' && <X weight="bold" />}
                    </span>
                    <span>
                      <span className="sr-only">{state === 'ok' ? 'Terpenuhi: ' : state === 'skip' ? 'Belum diperiksa: ' : ''}</span>
                      {c.text}
                      {c.fails && (
                        <span className="dd-cond__fail">
                          <span className="sr-only">Tidak terpenuhi: </span>
                          {c.fails}
                        </span>
                      )}
                      {state === 'skip' && <span className="dd-cond__skip">Belum diperiksa: pemeriksaan berhenti di syarat yang gagal.</span>}
                    </span>
                  </li>
                  );
                })}
              </ol>
              <p className="m-0 mt-5 text-[16px] leading-[1.55] dd-muted">
                Bila keempatnya terpenuhi, Lanjutkan terbuka dan menunggu kata LANJUTKAN diketik. Server memeriksa ulang semuanya,
                tidak memercayai formulir. Tanpa engine live tidak ada yang perlu dicocokkan, jadi syaratnya gugur.
              </p>
              <p className="m-0 mt-3 text-[14px] dd-muted">Contoh: potret berumur 14 menit, jadi tag tetap terpasang.</p>
            </div>
          </div>
        </div>
      </section>

      {features.length > 0 && (
        <section aria-labelledby="fitur-judul" className="py-[clamp(72px,9vw,120px)] dd-calm">
          <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
            <h2 id="fitur-judul" className="m-0 text-[clamp(28px,4vw,46px)] font-bold tracking-[-0.03em] leading-[1.08]">
              Di dalam {project.client}.
            </h2>
            <ol className="m-0 mt-12 p-0 list-none">
              {features.map((f, i) => {
                const shot = asMedia(f.screen);
                return (
                  <li key={f.id ?? i} className="dd-feature" data-scene="enter">
                    <div>
                      <h3 className="m-0 text-[clamp(22px,2.4vw,28px)] font-bold tracking-[-0.02em] leading-[1.2] text-balance">{f.title}</h3>
                      {f.body && <p className="m-0 mt-3 max-w-[52ch] text-[17px] leading-[1.6] dd-muted text-pretty">{f.body}</p>}
                    </div>
                    {shot && (
                      <figure className="m-0 dd-feature__shot">
                        <DeviceFrame kind="browser">
                          <MediaImg media={shot} sizes="(min-width: 1024px) 640px, 92vw" />
                        </DeviceFrame>
                        <figcaption className="mt-2 text-[13px] dd-muted">Tangkapan dalam tema terang aplikasinya. Data simulasi.</figcaption>
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
