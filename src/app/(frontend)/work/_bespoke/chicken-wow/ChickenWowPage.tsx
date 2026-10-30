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
import { nunitoBody, poppins } from '../fonts';
import './chicken-wow.css';

/**
 * Labels on the glass. The new ones are lines chickenwow.id itself carries (screenshots of
 * 14 Oct 2026) or the outlet count from its meta description; the old ones are made up and say so.
 */
const LABELS: Array<{ old: string; next: string; kind: 'pill' | 'button' | 'tag' }> = [
  { old: 'Menu: tanya admin', next: 'Sambal Nendang', kind: 'pill' },
  { old: 'Harga: lihat di foto', next: 'Mulai 10K', kind: 'button' },
  { old: 'Gerai: daftar di HTML', next: '13 gerai di Jawa Timur', kind: 'tag' },
];

/** Made-up outlets and distances: the real page sorts the client's list by the reader's own location. */
const OUTLETS: Array<[string, number]> = [
  ['Gerai contoh A', 6.8],
  ['Gerai contoh B', 1.2],
  ['Gerai contoh C', 3.5],
  ['Gerai contoh D', 0.6],
];
const km = (d: number) => `${d.toLocaleString('id-ID')} km`;

/**
 * Chicken Wow's own page (ADR 0013), concept "Label di kaca" (docs/konsep/chicken-wow.md): like the
 * price labels an owner writes on the shop window, the menu and outlet list are now changed by the
 * team itself from a panel, and the link in the bio sorts outlets by distance. Navy with a fine
 * grid, the red pill, the big yellow button, and heavy Poppins come from chickenwow.id. Without
 * motion the old labels sit struck through above the new ones.
 */
export async function ChickenWowPage({ project }: { project: Project }) {
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
  const nearest = [...OUTLETS].sort((a, b) => a[1] - b[1]);
  const at = (t: number) => ({ '--t': t.toFixed(3) }) as React.CSSProperties;

  return (
    <main id={rootId} className={`story bk-cw ${poppins.variable} ${nunitoBody.variable}`}>
      <section className="cw-hero pt-6 sm:pt-12 pb-16 sm:pb-24">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
          <div className="hidden sm:block mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/work' }, { label: project.client }]} />
          </div>
          <p className="m-0 cw-kicker">
            <Meta parts={eyebrow} />
          </p>
          <h1 className="m-0 mt-4 cw-display text-[clamp(52px,11vw,148px)] leading-[0.92] uppercase">
            Chicken <span className="cw-yellow">Wow</span>
          </h1>
          <p className="m-0 mt-6 max-w-[30ch] cw-display text-[clamp(20px,2.4vw,28px)] font-bold leading-[1.3] text-pretty">
            {project.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-start gap-x-6 gap-y-3">
            <LinkChips links={links} />
          </div>
          {summary.length > 0 && (
            <dl className="m-0 mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 border-t border-white/20 pt-8">
              {summary.map(([label, text]) => (
                <div key={label}>
                  <dt className="cw-kicker cw-yellow">{label}</dt>
                  <dd className="m-0 mt-2 text-[17px] leading-[1.6] text-pretty">{text}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <section aria-labelledby="kaca-judul" className="cw-scene" data-scene="read">
        <div className="cw-scene__stage">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,520px)] gap-10 lg:gap-16 items-center">
            <div>
              <p className="m-0 cw-kicker cw-red">Label di kaca</p>
              <h2 id="kaca-judul" className="m-0 mt-3 cw-display text-[clamp(30px,4.4vw,54px)] leading-[1.08] text-balance">
                Ibarat label harga di kaca etalase, yang menulis pemiliknya sendiri.
              </h2>
              <p className="m-0 mt-5 max-w-[48ch] text-[17px] leading-[1.6] text-pretty cw-muted">
                Dulu, mengganti menu atau menambah gerai berarti mengubah kode situs. Sekarang tim Chicken Wow mengisinya di
                panel, dan panel menerbitkan menu.json serta outlets.json yang langsung dibaca situsnya.
              </p>
            </div>

            <figure className="m-0 cw-window">
              <div className="cw-window__glass">
                <ul className="cw-labels">
                  {LABELS.map((l, i) => (
                    <li key={l.next} className="cw-label" style={at(0.15 + i * 0.25)}>
                      <s className="cw-label__old">
                        <span className="sr-only">Dulu: </span>
                        {l.old} <span className="cw-label__tag">contoh</span>
                      </s>
                      <span className={`cw-label__new cw-label__new--${l.kind}`}>
                        <span className="sr-only">Sekarang: </span>
                        {l.next}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="cw-window__file">menu.json, outlets.json</p>
              </div>
              <figcaption className="mt-3 text-[13px] leading-[1.5] cw-muted">
                Ilustrasi kaca etalase: label lama dicoret, label baru di sebelahnya. Label baru adalah kalimat dari chickenwow.id; jumlah gerai dari deskripsi situsnya, 14 Oktober 2026.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section aria-labelledby="gerai-judul" className="cw-nearby py-[clamp(72px,9vw,120px)]">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
          <p className="m-0 cw-kicker cw-red">Dari bio ke gerai</p>
          <h2 id="gerai-judul" className="m-0 mt-3 max-w-[22ch] cw-display text-[clamp(28px,4vw,48px)] leading-[1.1] text-balance">
            Pengikut mendarat di situs sendiri, di gerai terdekat.
          </h2>
          <p className="m-0 mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-pretty">
            Tautan di bio Instagram dan TikTok dulu mengarah ke Linktree. Penggantinya, chickenwow.id/info, membaca lokasi
            ponsel pengunjung lalu mengurutkan gerai dari yang paling dekat.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[760px]">
            <div className="cw-list">
              <p className="cw-list__head">Urutan daftar</p>
              <ol>
                {OUTLETS.map(([name]) => (
                  <li key={name}>{name}</li>
                ))}
              </ol>
            </div>
            <div className="cw-list cw-list--near" data-scene="enter">
              <p className="cw-list__head">Setelah lokasi ponsel diizinkan</p>
              <ol>
                {nearest.map(([name, d], i) => (
                  <li key={name} style={{ '--i': i } as React.CSSProperties}>
                    <span>{name}</span>
                    <span className="cw-km">{km(d)}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <p className="m-0 mt-4 text-[13px] cw-faint">Nama gerai dan jarak contoh.</p>
        </div>
      </section>

      {cover && (
        <section aria-labelledby="beranda-judul" className="py-[clamp(72px,9vw,120px)] cw-cream">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
            <h2 id="beranda-judul" className="m-0 cw-display text-[clamp(28px,4vw,48px)] leading-[1.1] text-balance">
              Situs yang tayang.
            </h2>
            <figure className="m-0 mt-10" data-scene="enter">
              <DeviceFrame kind="browser" className="cw-shot">
                <MediaImg media={cover} sizes="(min-width: 1180px) 1120px, 92vw" />
              </DeviceFrame>
              <figcaption className="mt-3 text-[13px] leading-[1.5] cw-faint">Tangkapan chickenwow.id, 14 Oktober 2026.</figcaption>
            </figure>
          </div>
        </section>
      )}

      <section aria-labelledby="dapur-judul" className="py-[clamp(72px,9vw,120px)] cw-band">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-8 md:gap-16">
          <h2 id="dapur-judul" className="m-0 cw-display text-[clamp(26px,3.4vw,40px)] leading-[1.12] text-balance">
            Yang dikerjakan di dapurnya.
          </h2>
          <ul className="m-0 p-0 list-none cw-facts">
            <li>Halaman Menu, Kemitraan, Lokasi, dan Karier yang dulu berujung 404 kini ada, dan semuanya membaca berkas data.</li>
            <li>38 gambar dikonversi ke WebP, sehingga aset turun dari 20,3 MB menjadi 9,4 MB.</li>
            <li>Panel Laravel dan Filament dibangun multi-tenant: satu aplikasi untuk beberapa klien, tiap situs batas tenantnya.</li>
            <li>Deploy lewat Git di cPanel, setelah FTP ternyata diblokir firewall penyedia hosting. CI menguji tiga kali deploy berturut-turut sebelum server menarik rilis.</li>
          </ul>
        </div>
      </section>

      <TourChapter project={project} />
      <Sources metrics={metrics} demoNote={project.showcase?.demoNote} />
      <StoryEnhancer rootId={rootId} />
    </main>
  );
}
