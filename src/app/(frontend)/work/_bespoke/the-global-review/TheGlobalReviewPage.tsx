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
import { cardo, montserrat } from '../fonts';
import './the-global-review.css';

/**
 * A made-up headline, deliberately neutral: nothing The Global Review published, no byline, no
 * date. The rubric names are the site's real menu.
 */
const SAMPLE = {
  rubric: 'Geopolitik',
  id: { before: 'Membaca Ulang Peta ', mark: 'Kerja Sama Maritim', after: ' di Kawasan' },
  en: { before: 'Rereading the Map of ', mark: 'Maritime Cooperation', after: ' in the Region' },
  dek: 'Teks contoh untuk halaman ini, bukan tulisan The Global Review.',
};

type Parts = { before: string; mark: string; after: string };

/** Rows of the rubric archive; only the sample keeps its highlight, as on the site's own lists. */
const ARCHIVE: Array<string | Parts> = [
  'Contoh judul tulisan pertama di rubrik ini',
  SAMPLE.id,
  'Contoh judul tulisan ketiga, terbit lebih lama',
];

/** The highlighter the site draws over the phrase the editors chose (globals.css .mk in its repo). */
function Mark({ children }: { children: React.ReactNode }) {
  return <mark className="tg-mk">{children}</mark>;
}

function Headline({ parts }: { parts: Parts }) {
  return (
    <>
      {parts.before}
      <Mark>{parts.mark}</Mark>
      {parts.after}
    </>
  );
}

/**
 * The Global Review's own page (ADR 0013), concept "Satu acuan, banyak cetakan"
 * (docs/konsep/the-global-review.md): one headline set once, in the place the editors already
 * write, then printed on every surface the new site has. The highlighted phrase is the thread: the
 * editors choose it, and it follows the story everywhere. Montserrat, Cardo, navy, and archive
 * paper come from the client's own site. Nothing is held while scrolling: the source card sticks in
 * its column and the prints scroll past it.
 */
export async function TheGlobalReviewPage({ project }: { project: Project }) {
  const rootId = `story-${project.slug}`;
  const links = await linkViews(project.links ?? []);
  const metrics = project.metrics ?? [];
  const cover = asMedia(project.coverImage);
  const eyebrow = [KIND_LABELS[project.kind], industryLabel(project.industry), project.publishedYear].filter(Boolean);
  const summary = [
    ['Masalah', project.summary?.problem],
    ['Solusi', project.summary?.solution],
    ['Hasil', project.summary?.result],
  ].filter((row): row is [string, string] => Boolean(row[1]));
  const [first, ...rest] = project.client.split(' ');

  return (
    <main id={rootId} className={`story bk-tgr ${montserrat.variable} ${cardo.variable}`}>
      <section className="pt-6 sm:pt-12 pb-16 sm:pb-24">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
          <div className="hidden sm:block mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/work' }, { label: project.client }]} />
          </div>
          <p className="m-0 tg-kicker">
            <Meta parts={eyebrow} />
          </p>
          <h1 className="m-0 mt-4 tg-display text-[clamp(44px,8.4vw,112px)] leading-[1.02] tracking-[-0.03em] text-balance">
            {first} <span className="tg-mk">{rest.join(' ')}</span>
          </h1>
          <p className="m-0 mt-6 max-w-[30ch] tg-display text-[clamp(20px,2.4vw,28px)] font-semibold leading-[1.3] tracking-[-0.01em] text-pretty">
            {project.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-start gap-x-6 gap-y-3">
            <LinkChips links={links} />
          </div>
          {summary.length > 0 && (
            <dl className="m-0 mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 border-t border-paper-200 pt-8">
              {summary.map(([label, text]) => (
                <div key={label}>
                  <dt className="tg-kicker text-electric">{label}</dt>
                  <dd className="m-0 mt-2 tg-serif text-[19px] leading-[1.6] text-pretty">{text}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <section aria-labelledby="cetak-judul" className="tg-scene">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
          <p className="m-0 tg-kicker text-electric">Satu acuan, banyak cetakan</p>
          <h2 id="cetak-judul" className="m-0 mt-3 max-w-[22ch] tg-display text-[clamp(30px,4.4vw,54px)] leading-[1.08] tracking-[-0.025em] text-balance">
            Redaksi menyusunnya sekali, di tempat yang sama.
          </h2>
          <p className="m-0 mt-5 max-w-[56ch] tg-serif text-[19px] leading-[1.6] text-ink/80 text-pretty">
            Judul dan frasa sorotannya tetap ditulis di wp-admin. Situs baru membacanya lewat REST API, lalu mencetaknya
            di setiap permukaan yang dilihat pembaca, dengan sorotan yang sama.
          </p>

          <div className="tg-press">
            <div className="tg-press__source">
              <article className="tg-source" aria-labelledby="acuan-judul">
                <p className="m-0 tg-label">Acuan, di wp-admin</p>
                <h3 id="acuan-judul" className="sr-only">
                  Acuan
                </h3>
                <dl className="tg-source__fields">
                  <div>
                    <dt>Judul</dt>
                    <dd>
                      {SAMPLE.id.before}
                      {SAMPLE.id.mark}
                      {SAMPLE.id.after}
                    </dd>
                  </div>
                  <div>
                    <dt>Sorotan Judul</dt>
                    <dd>
                      <Mark>{SAMPLE.id.mark}</Mark>
                    </dd>
                  </div>
                </dl>
                <p className="tg-source__rule">
                  Wajib sebelum terbit. Tanpa sorotan, Terbitkan menyimpan tulisan sebagai draf, termasuk dari sunting cepat
                  dan jadwal.
                </p>
                <p className="tg-note">Ilustrasi, bukan tangkapan layar. Judul contoh.</p>
              </article>
            </div>

            <ol className="tg-press__prints">
              <li className="tg-print" data-scene="enter">
                <h3 className="tg-print__name">
                  <span aria-hidden className="tg-print__no">01</span> Halaman tulisan
                </h3>
                <div className="tg-sheet">
                  <p className="m-0 tg-kicker text-electric">{SAMPLE.rubric}</p>
                  <p className="m-0 mt-2 tg-display text-[clamp(22px,2.6vw,30px)] leading-[1.18] tracking-[-0.015em]">
                    <Headline parts={SAMPLE.id} />
                  </p>
                  <p className="m-0 mt-3 tg-serif text-[17px] leading-[1.55] text-ink/75">{SAMPLE.dek}</p>
                  <p className="tg-note">Contoh</p>
                </div>
              </li>

              <li className="tg-print" data-scene="enter">
                <h3 className="tg-print__name">
                  <span aria-hidden className="tg-print__no">02</span> Versi bahasa Inggris di /en
                </h3>
                <div className="tg-sheet" lang="en">
                  <p className="m-0 tg-kicker text-electric">Geopolitics</p>
                  <p className="m-0 mt-2 tg-display text-[clamp(22px,2.6vw,30px)] leading-[1.18] tracking-[-0.015em]">
                    <Headline parts={SAMPLE.en} />
                  </p>
                  <p className="m-0 mt-3 tg-code">
                    &lt;link rel=&quot;alternate&quot; hreflang=&quot;en&quot;&gt;
                  </p>
                  <p className="tg-note" lang="id">
                    Contoh
                  </p>
                </div>
                <p className="m-0 mt-3 text-[15px] leading-[1.55] text-ink/75">
                  Tiap bahasa punya rute, canonical, dan hreflang sendiri, jadi mesin pencari tahu mana yang untuk siapa.
                </p>
              </li>

              <li className="tg-print" data-scene="enter">
                <h3 className="tg-print__name">
                  <span aria-hidden className="tg-print__no">03</span> Kartu pratinjau saat dibagikan
                </h3>
                <div className="tg-share">
                  <div className="tg-share__image" role="img" aria-label="Gambar kartu pratinjau: bidang foto dengan lapisan navy dan nama The Global Review di sudut kiri bawah">
                    <span>THE GLOBAL REVIEW</span>
                  </div>
                  <div className="tg-share__text">
                    <p className="m-0 font-bold leading-[1.3]">
                      {SAMPLE.id.before}
                      {SAMPLE.id.mark}
                      {SAMPLE.id.after}
                    </p>
                    <p className="m-0 mt-1 text-[13px] text-ink/70">theglobal-review.com</p>
                  </div>
                  <p className="tg-note">Ilustrasi, judul contoh</p>
                </div>
                <p className="m-0 mt-3 text-[15px] leading-[1.55] text-ink/75">
                  Server menggambar kartu 1200×630 dari foto artikel, lapisan, dan logo, sehingga tautan di grup WhatsApp
                  selalu tampil besar. Judulnya tidak digambar ulang, karena aplikasi sudah menuliskannya di bawah gambar.
                </p>
              </li>

              <li className="tg-print" data-scene="enter">
                <h3 className="tg-print__name">
                  <span aria-hidden className="tg-print__no">04</span> Arsip yang tersimpan di alamatnya
                </h3>
                <div className="tg-sheet">
                  <p className="m-0 tg-code tg-url">theglobal-review.com/category/geopolitik?waktu=tahun&amp;urut=lama&amp;page=2</p>
                  <ul className="m-0 mt-4 p-0 list-none tg-archive">
                    {ARCHIVE.map((row, i) => (
                      <li key={i}>{typeof row === 'string' ? row : <Headline parts={row} />}</li>
                    ))}
                  </ul>
                  <p className="tg-note">Contoh</p>
                </div>
                <p className="m-0 mt-3 text-[15px] leading-[1.55] text-ink/75">
                  Saringan, urutan, dan halaman ikut tersimpan di URL, jadi hasilnya bisa dijadikan bookmark. Alamat tulisan
                  lama tidak berubah saat domain dialihkan ke situs baru pada 24 Agustus 2026.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {cover && (
        <section aria-labelledby="beranda-judul" className="py-[clamp(72px,9vw,120px)] border-t border-paper-200">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
            <p className="m-0 tg-kicker text-electric">Hasilnya</p>
            <h2 id="beranda-judul" className="m-0 mt-3 tg-display text-[clamp(28px,4vw,48px)] leading-[1.1] tracking-[-0.025em] text-balance">
              Beranda yang tayang hari ini.
            </h2>
            <figure className="m-0 mt-10" data-scene="enter">
              <DeviceFrame kind="browser" className="tg-shot">
                <MediaImg media={cover} sizes="(min-width: 1180px) 1120px, 92vw" />
              </DeviceFrame>
              <figcaption className="mt-3 text-[13px] leading-[1.5] text-ink/70">
                Tangkapan situs produksi, 14 Oktober 2026. Sorotan di isu utama dipilih redaksi.
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      <section aria-labelledby="redaksi-judul" className="py-[clamp(72px,9vw,120px)] border-t border-paper-200 tg-paper">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-8 md:gap-16">
          <h2 id="redaksi-judul" className="m-0 tg-display text-[clamp(26px,3.4vw,40px)] leading-[1.12] tracking-[-0.02em] text-balance">
            Yang didapat redaksi, tanpa alat kedua.
          </h2>
          <div className="space-y-5 tg-serif text-[19px] leading-[1.6] text-pretty">
            <p className="m-0">
              Halaman Statistik ada di dalam wp-admin, ditarik dari Google Search Console dan Chrome UX Report lewat cron
              harian, dengan peringatan bila datanya berhenti diperbarui. Tanpa pelacak pihak ketiga dan tanpa biaya bulanan.
            </p>
            <p className="m-0 text-ink/80">
              Podcast, galeri, jajak pendapat, profil pengurus dan redaksi, serta pesan dari formulir kontak juga dikelola
              dari tempat yang sama.
            </p>
          </div>
        </div>
      </section>

      <TourChapter project={project} />
      <Sources metrics={metrics} demoNote={project.showcase?.demoNote} />
      <StoryEnhancer rootId={rootId} />
    </main>
  );
}
