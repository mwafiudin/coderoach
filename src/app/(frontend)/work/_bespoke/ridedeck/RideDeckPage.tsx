import type { Media, Project } from '@/payload-types';
import { RIDEDECK_DIR, RIDEDECK_FILES as F } from '@/lib/portfolio/ridedeck';
import { industryLabel, KIND_LABELS } from '@/lib/portfolio/taxonomy';
import { Breadcrumbs } from '../../../_components/detail/Breadcrumbs';
import { Meta } from '../../../_components/ui/Meta';
import { LinkChips } from '../../_story/LinkChips';
import { asMedia, MediaImg } from '../../_story/MediaImg';
import { linkViews } from '../../_story/ProjectStory';
import { Sources } from '../../_story/Sources';
import { StoryEnhancer } from '../../_story/StoryEnhancer';
import { archivo } from '../fonts';
import { RoninViewer } from './RoninViewer';
import { Segments } from './Segments';
import './ridedeck.css';

const at = (file: string) => `${RIDEDECK_DIR}/${file}`;

/** Tape colours in the order the app uses them on its dashboard: route, now, departure. */
const TAPES = ['rd-tape--red', 'rd-tape--green', 'rd-tape--amber'] as const;

const RONIN = {
  src: at(F.ronin),
  poster: at(F.roninPoster),
  alt: 'Model 3D motor TVS Ronin dari sudut tiga perempat depan, abu-abu dengan aksen jingga di tangki dan garpu depan',
};

/** The dashboard as it was the night after the first build, against the one in the showcase. */
const BEFORE = {
  src: at(F.before),
  alt: 'Dasbor rideDeck versi pertama: tombol teks Peta, Rute, Mulai, Atur, angka kecepatan besar, tiga baris readout, dan ubin app',
};

const ICON_SHEET = {
  src: at(F.iconSheet),
  alt: 'Tiga konsep ikon dari Gemini: lampu indikator dengan bendera kuning, speedometer jarum merah, dan layar segmen hijau, semuanya di pelat baja',
};

function Tape({ tone, children }: { tone: (typeof TAPES)[number] | 'rd-tape--black'; children: React.ReactNode }) {
  return <span className={`rd-tape ${tone}`}>{children}</span>;
}

function Phone({ media, priority = false }: { media: Media; priority?: boolean }) {
  return (
    <div className="rd-phone">
      <MediaImg media={media} priority={priority} sizes="280px" className="block w-full h-auto" />
    </div>
  );
}

/**
 * RideDeck's own page (ADR 0013, 0014): the app's night dashboard. Black windows in steel frames,
 * Dymo-style tape labels in wide Archivo, and numbers drawn from segments. The Ronin the app
 * simulates sits in the middle scene and leans as you scroll, as an illustration of the lean dial.
 */
export async function RideDeckPage({ project }: { project: Project }) {
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

  return (
    <main id={rootId} className={`story bk-ridedeck ${archivo.variable}`}>
      <section className="rd-hero" data-scene="exit">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 pt-6 sm:pt-12 pb-14 sm:pb-20">
          <div className="hidden sm:block mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/work' }, { label: project.client }]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 items-center">
            <div>
              <p className="m-0 rd-label">
                <Meta parts={eyebrow} />
              </p>
              <h1 className="m-0 mt-4 rd-wordmark">{project.client}</h1>
              <p className="m-0 mt-6 max-w-[30ch] text-[clamp(22px,2.6vw,32px)] leading-[1.2] font-semibold text-pretty">{project.tagline}</p>
              <div className="rd-window mt-8 max-w-[420px]">
                <Tape tone="rd-tape--green">Kecepatan</Tape>
                <div className="rd-window__readout">
                  <Segments text="--" label="Readout kecepatan saat motor diam: dua garis" />
                  <span className="rd-unit">km/jam</span>
                </div>
              </div>
              <div className="mt-6">
                <LinkChips links={links} />
              </div>
            </div>
            {screen && (
              <div className="max-w-[280px] w-full mx-auto">
                <Phone media={screen} priority />
              </div>
            )}
          </div>
        </div>
      </section>

      {summary.length > 0 && (
        <section className="pb-16 sm:pb-24">
          <dl className="m-0 max-w-[1180px] mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {summary.map(([label, text], i) => (
              <div key={label} className="rd-steel">
                <div className="rd-window h-full">
                  <dt>
                    <Tape tone={TAPES[i]}>{label}</Tape>
                  </dt>
                  <dd className="m-0 mt-4 text-[16px] leading-[1.6] text-pretty">{text}</dd>
                </div>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section aria-labelledby="ronin-judul" className="rd-scene" data-scene="read">
        <div className="rd-scene__stage">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 items-center">
            <div>
              <Tape tone="rd-tape--amber">Lean</Tape>
              <h2 id="ronin-judul" className="m-0 mt-4 rd-display text-[clamp(32px,4.6vw,56px)] leading-[1.02] text-balance">
                Motor yang sama ada di dalam dasbor.
              </h2>
              <p className="m-0 mt-5 max-w-[46ch] text-[17px] leading-[1.6] rd-dim text-pretty">
                rideDeck menggambar motor pemiliknya, sebuah TVS Ronin, untuk simulasi lean dan pitch dari sensor HP. Di halaman ini
                kemiringannya mengikuti gulir sebagai ilustrasi, bukan data perjalanan.
              </p>
            </div>
            <figure className="m-0">
              <RoninViewer src={RONIN.src} poster={RONIN.poster} posterAlt={RONIN.alt} />
              <figcaption className="mt-3 text-[12px] leading-[1.5] rd-dim">
                Model buatan AI dari foto publik TVS Ronin, bukan model resmi TVS Motor. Bentuk dari Tencent Hunyuan3D-2, dipakai di
                bawah Tencent Hunyuan 3D 2.0 Community License.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {screen && (
        <section aria-labelledby="iterasi-judul" className="py-[clamp(72px,9vw,120px)]">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
            <h2 id="iterasi-judul" className="m-0 rd-display text-[clamp(32px,4.6vw,56px)] leading-[1.02] text-balance">
              Satu minggu di dudukan stang.
            </h2>
            <p className="m-0 mt-4 max-w-[56ch] text-[17px] leading-[1.6] rd-dim text-pretty">
              Versi pertama hanya angka dan tombol teks. Setelah dipakai dan diuji di HP, tombol mendapat ikon, angka menjadi instrumen,
              dan peta serta simulasi masuk ke dasbor.
            </p>
            <div className="rd-compare mt-12">
              <figure className="m-0" data-scene="enter">
                <Tape tone="rd-tape--black">22 Okt 2026</Tape>
                <div className="rd-phone mt-4">
                  {/* eslint-disable-next-line @next/next/no-img-element -- a fixed local file, already sized */}
                  <img src={BEFORE.src} alt={BEFORE.alt} width={780} height={1576} loading="lazy" decoding="async" className="block w-full h-auto" />
                </div>
              </figure>
              <figure className="m-0" data-scene="enter">
                <Tape tone="rd-tape--green">28 Okt 2026</Tape>
                <div className="mt-4">
                  <Phone media={screen} />
                </div>
              </figure>
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="ikon-judul" className="rd-band py-[clamp(64px,8vw,104px)]">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 items-center">
          <figure className="m-0">
            {/* eslint-disable-next-line @next/next/no-img-element -- a fixed local file, already sized */}
            <img src={ICON_SHEET.src} alt={ICON_SHEET.alt} width={1200} height={400} loading="lazy" decoding="async" className="block w-full h-auto rounded-xl" />
            <figcaption className="mt-3 text-[12px] leading-[1.5] rd-dim">Konsep buatan AI (Gemini), hanya acuan.</figcaption>
          </figure>
          <div>
            <h2 id="ikon-judul" className="m-0 rd-display text-[clamp(28px,3.4vw,44px)] leading-[1.05] text-balance">
              Dari konsep ke ikon.
            </h2>
            <div className="mt-6 flex items-center gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element -- an SVG drawn from the app's own vector */}
              <img src={at(F.icon)} alt="" width={96} height={96} className="rounded-[22px] shrink-0" />
              <p className="m-0 text-[16px] leading-[1.6] rd-dim text-pretty">
                Pemilik memilih konsep pertama, lampu indikator dengan bendera. Ikon akhirnya digambar ulang sebagai vektor datar mengikuti
                DESIGN.md app. Gambar AI tidak dipakai langsung, salah satunya karena konsep kedua menulis huruf acak di layarnya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {features.length > 0 && (
        <section aria-labelledby="fitur-judul" className="py-[clamp(72px,9vw,120px)]">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
            <h2 id="fitur-judul" className="m-0 rd-display text-[clamp(32px,4.6vw,56px)] leading-[1.02]">
              Di dalam {project.client}.
            </h2>
            <div className="mt-12">
              {features.map((f, i) => {
                const shot = asMedia(f.screen);
                return (
                  <article key={f.id ?? i} className={`rd-feature ${i % 2 ? 'rd-feature--flip' : ''}`} data-scene="enter">
                    <div>
                      <Tape tone={TAPES[i % TAPES.length]}>{String(i + 1).padStart(2, '0')}</Tape>
                      <h3 className="m-0 mt-3 rd-display text-[clamp(24px,2.6vw,34px)] leading-[1.08] text-balance">{f.title}</h3>
                      {f.body && <p className="m-0 mt-3 max-w-[48ch] text-[17px] leading-[1.6] rd-dim text-pretty">{f.body}</p>}
                    </div>
                    {shot && (
                      <figure className="m-0 rd-feature__shot">
                        <Phone media={shot} />
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
