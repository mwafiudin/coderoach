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
import { plexSans } from '../fonts';
import './fifofun.css';

/** The four checks reconcile() runs on every import (src/lib/statement in the FiFoFun repo). */
const CHECKS = [
  'Total uang masuk dari semua baris sama dengan total masuk di kepala e-Statement.',
  'Total uang keluar dari semua baris sama dengan total keluarnya.',
  'Saldo awal ditambah masuk dikurangi keluar sama dengan saldo akhir.',
  'Rantai saldo per baris: tiap baris diperiksa terhadap saldo yang dicetak bank pada baris sebelumnya, jadi satu baris yang hilang hanya memutus satu titik, dan satu saldo yang salah terbaca memutus dua.',
];

/**
 * Screens that show the bank's name are left out here (docs/konsep/fifofun.md, GK correction 1);
 * only these show.
 */
const CLEAN_SCREENS = ['fifofun-anggaran', 'fifofun-ringkasan-3-bulan'];

/**
 * FiFoFun's own page (ADR 0013), concept "Posisi pasti" (docs/konsep/fifofun.md): your own notes
 * are dead reckoning, drifting a little with every entry; the balance the bank prints is a star
 * fix that pins the position, and plans are drawn from the fix. IBM Plex Sans, Apple system
 * colours, and teal for whatever has been checked, as in the app. Without motion the chart is
 * drawn in full.
 */
export async function FiFoFunPage({ project }: { project: Project }) {
  const rootId = `story-${project.slug}`;
  const links = await linkViews(project.links ?? []);
  const metrics = project.metrics ?? [];
  const features = (project.features ?? []).filter((f) => {
    const shot = asMedia(f.screen);
    return shot && CLEAN_SCREENS.some((name) => shot.filename?.startsWith(name));
  });
  const eyebrow = [KIND_LABELS[project.kind], industryLabel(project.industry), project.publishedYear].filter(Boolean);
  const summary = [
    ['Masalah', project.summary?.problem],
    ['Solusi', project.summary?.solution],
    ['Hasil', project.summary?.result],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <main id={rootId} className={`story bk-ff ${plexSans.variable}`}>
      <section className="pt-6 sm:pt-12 pb-16 sm:pb-24">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8">
          <div className="hidden sm:block mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/work' }, { label: project.client }]} />
          </div>
          <p className="m-0 ff-caption">
            <Meta parts={eyebrow} />
          </p>
          <h1 className="m-0 mt-3 text-[clamp(52px,10vw,124px)] font-semibold tracking-[-0.035em] leading-[0.98]">{project.client}</h1>
          <p className="m-0 mt-5 max-w-[30ch] text-[clamp(20px,2.4vw,28px)] font-medium leading-[1.3] text-pretty">{project.tagline}</p>
          <div className="mt-6 flex flex-wrap items-start gap-x-6 gap-y-3">
            {project.showcase?.tour && (
              <a href="#tur" className="h-11 inline-flex items-center text-[17px] font-semibold ff-teal hover:underline underline-offset-4">
                Tonton turnya
              </a>
            )}
            <LinkChips links={links} />
          </div>
          {summary.length > 0 && (
            <dl className="m-0 mt-14 ff-group">
              {summary.map(([label, text]) => (
                <div key={label} className="ff-row">
                  <dt className="ff-caption">{label}</dt>
                  <dd className="m-0 mt-1 text-[17px] leading-[1.5] text-pretty">{text}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <section aria-labelledby="posisi-judul" className="ff-scene" data-scene="read">
        <div className="ff-scene__stage">
          <div className="max-w-[1080px] mx-auto px-5 sm:px-8 w-full">
            <p className="m-0 ff-caption ff-teal">Posisi pasti</p>
            <h2 id="posisi-judul" className="m-0 mt-3 max-w-[24ch] text-[clamp(30px,4.2vw,50px)] font-semibold tracking-[-0.03em] leading-[1.08] text-balance">
              Catatan sendiri melenceng pelan-pelan. Saldo cetakan bank memakunya.
            </h2>
            <p className="m-0 mt-5 max-w-[58ch] text-[17px] leading-[1.6] ff-muted text-pretty">
              Seperti pelaut yang menghitung posisi dari arah dan kecepatan, setiap transaksi yang diketik sendiri memindahkan
              angka, dan salah kecil menumpuk tanpa ada yang tahu. Saldo yang dicetak bank adalah bintang yang dipakai untuk
              memastikan posisi. Rencana baru digambar dari titik itu.
            </p>

            <figure className="m-0 ff-chart">
              <svg viewBox="0 56 640 92" role="img" aria-label="Peta ilustrasi: garis putus-putus catatan sendiri menjauh dari posisi sebenarnya, lalu dua titik pasti dari saldo cetakan bank menariknya kembali">
                <path className="ff-true" d="M10 120 C 150 118, 300 124, 630 120" />
                <path className="ff-drift" d="M10 120 C 70 112, 140 92, 210 74 L 210 120 C 280 112, 360 96, 430 82 L 430 120 C 500 114, 570 104, 630 96" />
                {[210, 430].map((x, i) => (
                  <g key={x} className="ff-fix" style={{ '--t': 0.33 + i * 0.33 } as React.CSSProperties}>
                    <circle cx={x} cy="120" r="11" />
                    <path d={`M${x} 106 V134 M${x - 14} 120 H${x + 14}`} />
                  </g>
                ))}
              </svg>
              <figcaption>
                <ul className="ff-legend">
                  <li>
                    <span aria-hidden className="ff-legend__drift" /> Catatan sendiri, hanya perkiraan
                  </li>
                  <li>
                    <span aria-hidden className="ff-legend__fix" /> Saldo cetakan bank, posisi pasti
                  </li>
                  <li>
                    <span aria-hidden className="ff-legend__true" /> Posisi sebenarnya
                  </li>
                </ul>
                <p className="m-0 mt-2 text-[14px] ff-muted">Ilustrasi, bukan data. Bintangnya hanya ada untuk rekening bank.</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section aria-labelledby="gerbang-judul" className="py-[clamp(72px,9vw,120px)] border-t border-paper-200">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-14">
          <div>
            <h2 id="gerbang-judul" className="m-0 text-[clamp(26px,3.4vw,40px)] font-semibold tracking-[-0.025em] leading-[1.12] text-balance">
              Sebelum dipakai, setiap impor harus lolos empat pemeriksaan.
            </h2>
            <p className="m-0 mt-4 max-w-[46ch] text-[17px] leading-[1.6] ff-muted text-pretty">
              Kalau satu saja tidak cocok, tidak ada satu transaksi pun yang disimpan, dan barisnya ditunjuk. Angka yang salah di
              catatan keuangan lebih merugikan daripada impor yang gagal, karena angka yang salah akan dipercaya.
            </p>
          </div>
          <ol className="m-0 ff-group ff-checks" role="list">
            {CHECKS.map((c, i) => (
              <li key={i} className="ff-row" data-scene="enter">
                <span aria-hidden className="ff-checks__no">{i + 1}</span>
                <span>{c}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="dua-judul" className="py-[clamp(72px,9vw,120px)] border-t border-paper-200">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8">
          <h2 id="dua-judul" className="m-0 max-w-[26ch] text-[clamp(26px,3.4vw,40px)] font-semibold tracking-[-0.025em] leading-[1.12] text-balance">
            Uang yang dipastikan bank dan uang yang hanya perkiraan, tidak dicampur.
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="ff-group ff-group--fix">
              <p className="ff-row ff-group__head">Dipastikan bank</p>
              <p className="ff-row m-0">
                Rekening bank. Saldo hitungan app ditaruh di samping saldo cetakan bank, satu-satunya angka di halaman ringkasan
                yang dicek ke sumber di luar app.
              </p>
            </div>
            <div className="ff-group ff-group--est">
              <p className="ff-row ff-group__head">Hanya perkiraan</p>
              <p className="ff-row m-0">
                Dompet digital dan uang tunai. e-Statement hanya melihat top-up ke dompet, bukan belanjanya. Bila saldo yang dilihat
                pemiliknya berbeda, selisihnya dicatat sebagai transaksi penyesuaian, bukan dihapus diam-diam.
              </p>
            </div>
          </div>

          {features.length > 0 && (
            <ol className="m-0 mt-16 p-0 list-none">
              {features.map((f, i) => {
                const shot = asMedia(f.screen);
                return (
                  <li key={f.id ?? i} className="ff-feature" data-scene="enter">
                    <div>
                      <h3 className="m-0 text-[clamp(22px,2.4vw,28px)] font-semibold tracking-[-0.02em] leading-[1.2] text-balance">{f.title}</h3>
                      {f.body && <p className="m-0 mt-3 max-w-[52ch] text-[17px] leading-[1.6] ff-muted text-pretty">{f.body}</p>}
                    </div>
                    {shot && (
                      <figure className="m-0 ff-feature__shot">
                        <DeviceFrame kind="browser">
                          <MediaImg media={shot} sizes="(min-width: 1024px) 640px, 92vw" />
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
