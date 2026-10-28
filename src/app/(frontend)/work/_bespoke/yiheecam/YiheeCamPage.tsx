import type { Media, Project } from '@/payload-types';
import { industryLabel, KIND_LABELS } from '@/lib/portfolio/taxonomy';
import { Breadcrumbs } from '../../../_components/detail/Breadcrumbs';
import { Meta } from '../../../_components/ui/Meta';
import { LinkChips } from '../../_story/LinkChips';
import { asMedia, MediaImg } from '../../_story/MediaImg';
import { linkViews } from '../../_story/ProjectStory';
import { Sources } from '../../_story/Sources';
import { StoryEnhancer } from '../../_story/StoryEnhancer';
import { barlowCondensed } from '../fonts';
import './yiheecam.css';

/**
 * The board in the scene. Each word is shown first as the ASCII bytes of its own letters, so the
 * hex on screen is honest: it decodes to exactly what it turns into, and claims nothing about the
 * camera's real packets.
 */
const BOARD: Array<[string, string]> = [
  ['Mode', 'REC'],
  ['Baterai', 'BATT'],
  ['Kartu', 'SD'],
];

const STAGES = ['Byte mentah', 'Dikelompokkan', 'Terurai', 'Terbaca'];

/** The ride behind the hero. Made with AI and said so on the page: it is mood, not a recording. */
const RIDE = {
  src: '/assets/suasana/yiheecam-kebun-teh.v1.webp',
  alt: 'Jalan kebun teh berkabut dilihat dari kamera di dagu helm, setang motor di bawah',
  credit: 'Foto ilustrasi buatan AI (Google Flow), bukan rekaman kamera.',
};

/**
 * Screens whose live view shows the mock camera's test pattern. The pattern fills the top third,
 * so only the part below it is shown: the board and buttons, which are the real app.
 */
const TEST_PATTERN = /^yiheecam-yakin/;

function Shot({ media, priority = false }: { media: Media; priority?: boolean }) {
  if (!TEST_PATTERN.test(media.filename ?? '')) {
    return <MediaImg media={media} priority={priority} sizes="260px" className="block w-full h-auto" />;
  }
  return (
    <div className="yc-shot--cropped">
      <MediaImg media={media} priority={priority} sizes="260px" className="block w-full h-full object-cover object-bottom" />
    </div>
  );
}

const hex = (ch: string) => ch.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0');

function Flap({ front, back, t }: { front: string; back: string; t: number }) {
  return (
    <span className="yc-cell" style={{ '--t': t.toFixed(3) } as React.CSSProperties}>
      <span className="yc-flap">
        <span className="yc-face yc-face--front">{front}</span>
        <span className="yc-face yc-face--back">{back}</span>
      </span>
    </span>
  );
}

/**
 * YiheeCam's own page (ADR 0013): a split-flap board, the app's own status display, decoding raw
 * bytes into words as you scroll, because the product is a protocol rebuilt from the bytes up.
 * Dark ground, Barlow Condensed, and the record lamp come from the app. At rest the board reads
 * REC, BATT, SD.
 */
export async function YiheeCamPage({ project }: { project: Project }) {
  const rootId = `story-${project.slug}`;
  const links = await linkViews(project.links ?? []);
  const features = project.features ?? [];
  const screen = asMedia(project.showcase?.screen);
  const eyebrow = [KIND_LABELS[project.kind], industryLabel(project.industry), project.publishedYear].filter(Boolean);
  const summary = [
    ['Masalah', project.summary?.problem],
    ['Solusi', project.summary?.solution],
    ['Hasil', project.summary?.result],
  ].filter((row): row is [string, string] => Boolean(row[1]));
  const cells = BOARD.reduce((n, [, word]) => n + word.length, 0);
  let n = 0;
  // Cells flip in reading order and finish at 85% of the scene, leaving the lamp the last beat.
  const next = () => ((n++ / cells) * 0.85 + 0.05);

  return (
    <main id={rootId} className={`story bk-yiheecam ${barlowCondensed.variable}`}>
      <section className="yc-hero" data-scene="exit">
        {/* eslint-disable-next-line @next/next/no-img-element -- a fixed local file, already sized */}
        <img
          src={RIDE.src}
          alt={RIDE.alt}
          width={1376}
          height={768}
          fetchPriority="high"
          decoding="async"
          className="yc-hero__photo"
        />
        <div className="relative max-w-[1180px] mx-auto px-5 sm:px-8 pt-6 sm:pt-12 pb-14 sm:pb-20">
          <div className="hidden sm:block mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/work' }, { label: project.client }]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 items-center">
            <div>
              <p className="m-0 yc-label">
                <Meta parts={eyebrow} />
              </p>
              <h1 className="m-0 mt-4">
                <span className="sr-only">{project.client}</span>
                <span aria-hidden className="yc-word yc-word--hero">
                  {[...project.client.toUpperCase()].map((ch, i) => (
                    <span key={i} className="yc-tile">
                      {ch}
                    </span>
                  ))}
                </span>
              </h1>
              <p className="m-0 mt-6 max-w-[30ch] yc-display text-[clamp(24px,2.8vw,34px)] leading-[1.15] text-pretty">{project.tagline}</p>
              <div className="mt-6">
                <LinkChips links={links} />
              </div>
            </div>
            {screen && (
              <div className="yc-phone max-w-[260px] w-full mx-auto">
                <Shot media={screen} priority />
              </div>
            )}
          </div>
          <p className="yc-hero__credit">{RIDE.credit}</p>
        </div>
      </section>

      <section className="pt-12 pb-16 sm:pb-24">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
          {summary.length > 0 && (
            <dl className="m-0 mt-16 grid grid-cols-1 md:grid-cols-3 gap-px yc-panel">
              {summary.map(([label, text]) => (
                <div key={label} className="p-6">
                  <dt className="yc-label">{label}</dt>
                  <dd className="m-0 mt-2 text-[16px] leading-[1.6] text-pretty">{text}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <section aria-labelledby="papan-judul" className="yc-scene" data-scene="read">
        <div className="yc-scene__stage">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8 w-full">
            <h2 id="papan-judul" className="m-0 yc-display text-[clamp(34px,5vw,64px)] leading-[1] text-balance">
              Dibangun ulang dari byte.
            </h2>
            <ol className="yc-stages m-0 mt-5 p-0 list-none">
              {STAGES.map((s, i) => (
                <li key={s} style={{ '--i': i } as React.CSSProperties}>
                  {s}
                </li>
              ))}
            </ol>
            <div className="yc-board mt-10" role="img" aria-label="Papan split-flap: byte heksadesimal membalik menjadi REC, BATT, dan SD">
              {BOARD.map(([label, word]) => (
                <div key={word} className="yc-row" aria-hidden>
                  <span className="yc-row__label">{label}</span>
                  <span className="yc-word">
                    {[...word].map((ch, i) => (
                      <Flap key={i} front={hex(ch)} back={ch} t={next()} />
                    ))}
                  </span>
                  {word === 'REC' && <span className="yc-lamp" />}
                </div>
              ))}
            </div>
            <p className="m-0 mt-6 text-[13px] text-ink/65 max-w-[60ch]">
              Ilustrasi: tiap byte adalah kode ASCII hurufnya sendiri, bukan paket protokol kamera.
            </p>
          </div>
        </div>
      </section>

      {features.length > 0 && (
        <section aria-labelledby="fitur-judul" className="py-[clamp(72px,9vw,120px)]">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
            <h2 id="fitur-judul" className="m-0 yc-display text-[clamp(34px,5vw,60px)] leading-[1]">
              Di dalam {project.client}.
            </h2>
            <div className="mt-12">
              {features.map((f, i) => {
                const shot = asMedia(f.screen);
                return (
                  <article key={f.id ?? i} className={`yc-feature ${i % 2 ? 'yc-feature--flip' : ''}`} data-scene="enter">
                    <div>
                      <p className="m-0 yc-label">{String(i + 1).padStart(2, '0')}</p>
                      <h3 className="m-0 mt-2 yc-display text-[clamp(26px,2.8vw,36px)] leading-[1.05] text-balance">{f.title}</h3>
                      {f.body && <p className="m-0 mt-3 max-w-[48ch] text-[17px] leading-[1.6] text-ink/75 text-pretty">{f.body}</p>}
                    </div>
                    {shot && (
                      <figure className="m-0 yc-phone yc-feature__shot">
                        <Shot media={shot} />
                      </figure>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Sources metrics={project.metrics ?? []} demoNote={project.showcase?.demoNote} />
      <StoryEnhancer rootId={rootId} />
    </main>
  );
}
