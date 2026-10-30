import { Check } from '@phosphor-icons/react/dist/ssr/Check';
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
import { nunito, ptSans } from '../fonts';
import './locascore.css';

/**
 * Everything on the sheet comes from the cover screenshot (MOCK_MODE, outlet name made up), so the
 * sheet and the real screen below it agree. Factor values only: that build's weights differ from
 * lib/scoring.ts on main, so no weights or point contributions are drawn (docs/konsep/locascore.md).
 */
const SITE = { name: 'Calon Outlet Gajah Mada', coords: '-7.43620, 112.70650' };

const FACTORS: Array<[string, number]> = [
  ['Demografi', 69],
  ['Traffic', 100],
  ['Ekosistem', 95],
  ['Demand', 93],
  ['Kualitas tapak', 70],
  ['Kompetitor', 15],
];

/**
 * What the surveyor wrote down that afternoon, and the line on the sheet that answers it. A hunch
 * the data bears out gets a tick; only the wrong one is struck.
 */
const HUNCHES: Array<{ said: string; answer: string; holds: boolean }> = [
  { said: '"Ramai kok"', answer: 'Traffic 100, diperkirakan dari kelas jalan OSM di sekitar titik', holds: true },
  { said: '"Dekat sekolah"', answer: 'Sekolah salah satu dari 14 kategori yang dihitung; ekosistem 95', holds: true },
  { said: '"Kompetitornya cuma satu"', answer: 'Ternyata 18 kompetitor langsung dalam radius', holds: false },
];

/**
 * The sketch: a pin, rings, three road classes, and the points found around it. Positions are an
 * illustration; the count of competitor squares is the screenshot's 18.
 */
const COMPETITORS: Array<[number, number]> = [
  [118, 92], [206, 84], [232, 140], [96, 196], [214, 228], [150, 252], [70, 128], [262, 196], [184, 112],
  [128, 218], [248, 98], [80, 240], [190, 270], [272, 150], [56, 176], [140, 64], [236, 254], [104, 156],
];
const OTHERS: Array<[number, number, string]> = [
  [176, 196, 'S'], [134, 128, 'S'], [204, 176, 'B'], [110, 254, 'P'], [252, 222, 'K'], [92, 104, 'F'], [222, 112, 'S'],
];
const LEGEND = [
  ['■', 'Kompetitor'],
  ['S', 'Sekolah'],
  ['B', 'Bank'],
  ['P', 'Pasar modern'],
  ['K', 'Faskes'],
  ['F', 'Fasilitas publik'],
];

/**
 * LocaScore's own page (ADR 0013), concept "Lembar Ukur Tapak" (docs/konsep/locascore.md): what a
 * site visit guesses in one afternoon is measured on one sheet, point by point, and ends in a
 * verdict badge. Navy, Nunito numbers, PT Sans text, colour only on the verdict, as in the app.
 * Without JS or with reduced motion the sheet is simply filled in.
 */
export async function LocaScorePage({ project }: { project: Project }) {
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
  const points = COMPETITORS.length + OTHERS.length;
  // Fill order on the held stage: the points on the sketch, the table rows, then the hunches get their tick or strike.
  const at = (t: number) => ({ '--t': t.toFixed(3) }) as React.CSSProperties;

  return (
    <main id={rootId} className={`story bk-locascore ${nunito.variable} ${ptSans.variable}`}>
      <section className="pt-6 sm:pt-12 pb-16 sm:pb-24">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
          <div className="hidden sm:block mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/work' }, { label: project.client }]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-start">
            <div>
              <p className="m-0 lc-label text-ink/70">
                <Meta parts={eyebrow} />
              </p>
              <h1 className="m-0 mt-3 lc-display text-[clamp(56px,11vw,144px)] leading-[0.95] tracking-[-0.04em] text-[color:var(--lc-navy)]">
                {project.client}
              </h1>
              <p className="m-0 mt-5 max-w-[26ch] lc-display text-[clamp(22px,2.8vw,34px)] font-bold leading-[1.2] tracking-[-0.02em] text-pretty">
                {project.tagline}
              </p>
              <div className="mt-6 flex flex-wrap items-start gap-x-6 gap-y-3">
                <LinkChips links={links} />
              </div>
            </div>
            {/* The top of the sheet the scene below fills in. */}
            <div aria-hidden className="lc-stub hidden md:block">
              <p className="lc-display">Lembar Ukur Tapak</p>
              <p className="lc-mono">No. LS-CONTOH-001</p>
              <p className="lc-stub__line">Masukan: satu tautan Google Maps</p>
            </div>
          </div>
          {summary.length > 0 && (
            <dl className="m-0 mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 border-t border-paper-200 pt-8">
              {summary.map(([label, text]) => (
                <div key={label}>
                  <dt className="lc-label text-electric">{label}</dt>
                  <dd className="m-0 mt-2 text-[17px] leading-[1.6] text-pretty">{text}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <section aria-labelledby="ukur-judul" className="lc-scene" data-scene="read">
        <div className="lc-scene__stage">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,560px)] gap-10 lg:gap-16 items-center">
            <div>
              <p className="m-0 lc-label text-electric">Satu titik, satu lembar</p>
              <h2 id="ukur-judul" className="m-0 mt-3 lc-display text-[clamp(32px,4.6vw,56px)] leading-[1.05] tracking-[-0.03em] text-balance">
                Yang ditaksir dalam satu sore, diukur.
              </h2>
              <p className="m-0 mt-5 max-w-[46ch] text-[17px] leading-[1.6] text-ink/75 text-pretty">
                Surveyor menempelkan satu tautan Google Maps. Dari koordinat itu LocaScore mencatat titik di sekitarnya,
                membaca kelas jalan, dan menarik demografi sampai kelurahan. Setiap kesan dari kunjungan sore itu
                mendapat jawaban di lembar yang sama.
              </p>
            </div>

            <article className="lc-sheet" aria-label="Lembar ukur tapak, data contoh">
              <header className="lc-sheet__head">
                <p className="m-0 lc-display text-[18px] tracking-[0.02em]">Lembar Ukur Tapak</p>
                <p className="m-0 lc-mono">No. LS-CONTOH-001</p>
                <p className="m-0 lc-sheet__demo">Data contoh</p>
              </header>

              <div className="lc-sheet__block">
                <h3 className="lc-sheet__title">Kesan survei</h3>
                <ul className="lc-hunches">
                  {HUNCHES.map(({ said, answer, holds }, i) => (
                    <li key={said} style={at(0.62 + i * 0.07)}>
                      {holds ? (
                        <span className="lc-hunch lc-hunch--holds">
                          <Check aria-hidden weight="bold" className="lc-tick" />
                          {said}
                          <span className="sr-only">, terbukti</span>
                        </span>
                      ) : (
                        <s className="lc-hunch lc-hunch--wrong">{said}</s>
                      )}
                      <span className="lc-answer">{answer}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lc-sheet__block lc-sheet__input lc-fill" style={at(0)}>
                <h3 className="lc-sheet__title">Masukan</h3>
                <p className="m-0 font-bold">{SITE.name}</p>
                <p className="m-0 lc-mono lc-coords">maps.app.goo.gl/… ke {SITE.coords}</p>
              </div>

              <div className="lc-sheet__block">
                <h3 className="lc-sheet__title">Sketsa sekitar titik</h3>
                <figure className="m-0 lc-sketch">
                  <svg viewBox="0 0 320 320" role="img" aria-label={`Sketsa ilustrasi: titik lokasi di tengah tiga cincin radius, jalan arteri, kolektor, dan lokal, ${COMPETITORS.length} kotak kompetitor, dan titik sekolah, bank, pasar modern, faskes, serta fasilitas publik`}>
                    <g className="lc-roads">
                      <path d="M0 176 C 90 168, 200 182, 320 170" className="lc-road lc-road--arteri" />
                      <path d="M150 0 C 156 100, 146 220, 168 320" className="lc-road lc-road--kolektor" />
                      <path d="M30 40 L 290 290" className="lc-road lc-road--lokal" />
                      <path d="M40 290 C 120 230, 210 120, 300 60" className="lc-road lc-road--lokal" />
                    </g>
                    {[56, 104, 148].map((r) => (
                      <circle key={r} cx="160" cy="160" r={r} className="lc-ring" />
                    ))}
                    {COMPETITORS.map(([x, y], i) => (
                      <rect key={`k${i}`} x={x - 4} y={y - 4} width="8" height="8" className="lc-pt lc-pt--comp" style={at(0.06 + (i / points) * 0.3)} />
                    ))}
                    {OTHERS.map(([x, y, c], i) => (
                      <g key={`o${i}`} className="lc-pt" style={at(0.06 + ((COMPETITORS.length + i) / points) * 0.3)}>
                        <circle cx={x} cy={y} r="10" className="lc-pt__ring" />
                        <text x={x} y={y + 4} textAnchor="middle" className="lc-pt__code">
                          {c}
                        </text>
                      </g>
                    ))}
                    <g className="lc-pin">
                      <circle cx="160" cy="160" r="11" />
                      <circle cx="160" cy="160" r="4" className="lc-pin__dot" />
                    </g>
                  </svg>
                  <figcaption>
                    <ul className="lc-legend">
                      {LEGEND.map(([mark, name]) => (
                        <li key={name}>
                          <span aria-hidden className="lc-legend__mark">{mark}</span>
                          {name}
                        </li>
                      ))}
                    </ul>
                    <p className="m-0 mt-2 text-[12px] text-ink/70">Posisi titik ilustrasi. Jalan dari tebal ke tipis: arteri, kolektor, lokal.</p>
                  </figcaption>
                </figure>
              </div>

              <div className="lc-sheet__block">
                <table className="lc-table">
                  <caption className="lc-sheet__title">Tabel ukur, nilai 0 sampai 100</caption>
                  <thead className="sr-only">
                    <tr>
                      <th scope="col">Faktor</th>
                      <th scope="col">Nilai</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FACTORS.map(([name, value], i) => (
                      <tr key={name} className="lc-fill" style={at(0.38 + i * 0.035)}>
                        <th scope="row">{name}</th>
                        <td>
                          <span className="lc-cell">
                            <span aria-hidden className="lc-bar" style={{ '--v': value / 100 } as React.CSSProperties} />
                            <span className="lc-value">{value}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div role="group" className="lc-verdict" aria-label="Putusan: GO, skor 82, balik modal 15,8 bulan, keyakinan rendah, data contoh">
                  <p className="lc-verdict__tier">GO</p>
                  <div>
                    <p className="m-0 lc-display text-[28px] leading-none text-[color:var(--lc-navy)] tabular">
                      82<span className="text-[14px] font-bold text-ink/70">/100</span>
                    </p>
                    <p className="m-0 mt-1 text-[14px] leading-[1.45]">Balik modal 15,8 bulan, di bawah batas 18 bulan. Keyakinan rendah.</p>
                  </div>
                </div>
              </div>

            </article>
          </div>
        </div>
      </section>

      {cover && (
        <section aria-labelledby="layar-judul" className="py-[clamp(72px,9vw,120px)] border-t border-paper-200">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
            <p className="m-0 lc-label text-electric">Di aplikasinya</p>
            <h2 id="layar-judul" className="m-0 mt-3 lc-display text-[clamp(30px,4.2vw,52px)] leading-[1.05] tracking-[-0.03em] text-balance">
              Putusan dulu, datanya menyusul.
            </h2>
            <p className="m-0 mt-4 max-w-[56ch] text-[17px] leading-[1.6] text-ink/75 text-pretty">
              Lembar yang sama di LocaScore: kesimpulan kelayakan di atas, lalu skor per faktor, detail kategori,
              finansial, dan data mentahnya. Setiap angka boleh dikoreksi surveyor sebelum skornya dikunci.
            </p>
            <figure className="m-0 mt-12" data-scene="enter">
              <DeviceFrame kind="browser" className="lc-shot">
                <MediaImg media={cover} sizes="(min-width: 1180px) 1120px, 92vw" />
              </DeviceFrame>
              <figcaption className="mt-3 text-[13px] leading-[1.5] text-ink/70">
                Tangkapan LocaScore dalam mode data tiruan; nama outlet rekaan.
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      <section aria-labelledby="kalibrasi-judul" className="py-[clamp(72px,9vw,120px)] border-t border-paper-200 bg-paper-50">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 md:gap-16">
          <h2 id="kalibrasi-judul" className="m-0 lc-display text-[clamp(28px,3.6vw,44px)] leading-[1.08] tracking-[-0.03em] text-balance">
            Belajar dari outlet yang sudah berjalan.
          </h2>
          <div className="space-y-5 text-[17px] leading-[1.6] text-pretty">
            <p className="m-0">
              Bobot skornya dikalibrasi terhadap outlet yang sudah beroperasi. Masukkan performa aktualnya, dan seluruh
              lokasi yang pernah dinilai dihitung ulang dengan bobot baru.
            </p>
            <p className="m-0 text-ink/75">
              Hasilnya keluar sebagai laporan PDF untuk investor dan tautan publik yang bisa dibuka tanpa akun. Setiap
              panggilan Google Places ada biayanya, jadi pemakaiannya dipantau di halaman sendiri.
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
