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
import { nunitoSans } from '../fonts';
import './jeda.css';

/** A made-up entry, the same kind the tour records: nobody's real note. */
const NOTE = {
  situasi: 'Rapat dimajukan ke besok pagi.',
  pikiran: 'Aku pasti belum siap dan bakal kelihatan bodoh.',
  emosi: 'Cemas',
};

/** Older rows in the psychologist's table, already read. */
const READ_ROWS = [
  ['Senin', 'Ditegur di grup kantor', 'Malu'],
  ['Selasa', 'Pesan belum dibalas teman', 'Sedih'],
];

const STEPS = ['Klien mencatat, di mana saja', 'Catatan menyeberang begitu ada sinyal', 'Psikolog membaca yang baru'];

/**
 * Jeda's own page (ADR 0013): two desks, the client's phone and the psychologist's reading room,
 * and one note crossing between them as you scroll. Slow and quiet on purpose: the app is written
 * in faded blue ink on warm grey paper, and so is this page. Without motion the note simply sits
 * in the table, marked new.
 */
export async function JedaPage({ project }: { project: Project }) {
  const rootId = `story-${project.slug}`;
  const links = await linkViews(project.links ?? []);
  const features = project.features ?? [];
  const phone = asMedia(project.showcase?.screenPhone);
  const eyebrow = [KIND_LABELS[project.kind], industryLabel(project.industry), project.publishedYear].filter(Boolean);
  const summary = [
    ['Masalah', project.summary?.problem],
    ['Solusi', project.summary?.solution],
    ['Hasil', project.summary?.result],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <main id={rootId} className={`story bk-jeda ${nunitoSans.variable}`}>
      <section className="pt-6 sm:pt-12 pb-16 sm:pb-24">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
          <div className="hidden sm:block mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/work' }, { label: project.client }]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr] gap-12 md:gap-16 items-center">
            <div>
              <p className="m-0 text-[13px] font-semibold text-ink/70">
                <Meta parts={eyebrow} />
              </p>
              <h1 className="m-0 mt-4">
                <span className="block text-[20px] font-bold tracking-[0.02em] text-electric">{project.client}</span>
                <span className="block mt-3 text-[clamp(36px,5.2vw,60px)] font-semibold tracking-[-0.02em] leading-[1.12] text-balance">
                  {project.darkChapter?.title || project.tagline}
                </span>
              </h1>
              {project.darkChapter?.title && (
                <p className="m-0 mt-5 max-w-[38ch] text-[19px] leading-[1.6] text-ink/75 text-pretty">{project.tagline}</p>
              )}
              <div className="mt-7 flex flex-wrap items-start gap-x-6 gap-y-3">
                {asMedia(project.showcase?.tour) && (
                  <a href="#tur" className="h-11 inline-flex items-center text-[17px] font-bold text-electric underline underline-offset-4 decoration-paper-200 hover:decoration-electric">
                    Tonton turnya
                  </a>
                )}
                <LinkChips links={links} />
              </div>
            </div>
            {phone && (
              <div className="jd-float max-w-[280px] w-full mx-auto">
                <DeviceFrame kind="phone">
                  <MediaImg media={phone} priority sizes="280px" />
                </DeviceFrame>
              </div>
            )}
          </div>
          {summary.length > 0 && (
            <dl className="m-0 mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {summary.map(([label, text]) => (
                <div key={label} className="jd-sheet">
                  <dt className="text-[14px] font-bold text-electric">{label}</dt>
                  <dd className="m-0 mt-2 text-[16px] leading-[1.65] text-pretty">{text}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <section aria-labelledby="meja-judul" className="jd-scene" data-scene="read">
        <div className="jd-scene__stage">
          <div className="max-w-[1120px] mx-auto px-5 sm:px-8 w-full">
            <h2 id="meja-judul" className="m-0 max-w-[22ch] text-[clamp(28px,3.6vw,44px)] font-semibold tracking-[-0.015em] leading-[1.2] text-balance">
              Satu catatan, dua meja.
            </h2>
            <ol className="jd-steps m-0 mt-5 p-0 list-none">
              {STEPS.map((s, i) => (
                <li key={s} style={{ '--i': i } as React.CSSProperties}>
                  {s}
                </li>
              ))}
            </ol>

            <div className="jd-desks mt-10">
              {/* Client: the note is written into the phone first, saved there, then sent. */}
              <div className="jd-desk">
                <p className="jd-desk__label">Ponsel klien</p>
                <div className="jd-phone">
                  <div className="jd-note jd-note--phone">
                    <p className="jd-note__k">Situasi</p>
                    <p className="jd-note__v">{NOTE.situasi}</p>
                    <p className="jd-note__k">Pikiran</p>
                    <p className="jd-note__v">{NOTE.pikiran}</p>
                    <p className="jd-sync">
                      <span className="jd-sync__saved">Tersimpan di perangkat</span>
                      <span className="jd-sync__sent">Tersinkron</span>
                    </p>
                  </div>
                </div>
              </div>

              <div aria-hidden className="jd-path">
                <span className="jd-path__dot" />
              </div>

              {/* Psychologist: a quiet table, the new note on top. */}
              <div className="jd-desk">
                <p className="jd-desk__label">Ruang baca psikolog</p>
                <table className="jd-table">
                  <caption className="sr-only">Catatan klien, contoh karangan</caption>
                  <thead>
                    <tr>
                      <th scope="col">Hari</th>
                      <th scope="col">Situasi</th>
                      <th scope="col">Emosi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="jd-row--new">
                      <td>
                        Rabu <span className="jd-badge">Baru sejak terakhir dibuka</span>
                      </td>
                      <td>{NOTE.situasi}</td>
                      <td>{NOTE.emosi}</td>
                    </tr>
                    {READ_ROWS.map(([day, situation, emotion]) => (
                      <tr key={day}>
                        <td>{day}</td>
                        <td>{situation}</td>
                        <td>{emotion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="m-0 mt-6 text-[13px] text-ink/65">Contoh karangan, bukan catatan klien.</p>
          </div>
        </div>
      </section>

      {features.length > 0 && (
        <section aria-labelledby="fitur-judul" className="py-[clamp(72px,9vw,120px)]">
          <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
            <h2 id="fitur-judul" className="m-0 text-[clamp(28px,3.6vw,44px)] font-semibold tracking-[-0.015em] leading-[1.2]">
              Di dalam {project.client}.
            </h2>
            <div className="mt-12">
              {features.map((f, i) => {
                const shot = asMedia(f.screen);
                const tall = Boolean(shot?.width && shot.height && shot.height > shot.width);
                return (
                  <article key={f.id ?? i} className={`jd-feature ${i % 2 ? 'jd-feature--flip' : ''}`} data-scene="enter">
                    <div className="jd-feature__text">
                      <h3 className="m-0 text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.3] text-balance">{f.title}</h3>
                      {f.body && <p className="m-0 mt-3 max-w-[46ch] text-[17px] leading-[1.7] text-ink/75 text-pretty">{f.body}</p>}
                    </div>
                    {shot && (
                      <figure className={`m-0 jd-feature__shot ${tall ? 'jd-feature__shot--tall' : ''}`}>
                        <DeviceFrame kind={tall ? 'phone' : 'browser'}>
                          <MediaImg media={shot} sizes={tall ? '260px' : '(min-width: 1024px) 560px, 92vw'} />
                        </DeviceFrame>
                      </figure>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <TourChapter project={project} />
      <Sources metrics={project.metrics ?? []} demoNote={project.showcase?.demoNote} />
      <StoryEnhancer rootId={rootId} />
    </main>
  );
}
