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
import './rencana-ro.css';

/**
 * The four answers as the recorded phone home screen gives them (rencana-ro-dashboard-ponsel.v2, a
 * made-up network): bonus paid, units to buy, where the next member goes, and the repeat orders due.
 * No term from the principal's bonus plan appears here.
 */
const ANSWERS: Array<[string, string]> = [
  ['Bonus yang sudah cair', 'Rp2.550.000'],
  ['Beli berapa unit', '49 unit'],
  ['Taruh di mana', 'Di bawah Hendra Anggrekasih, isi kaki kanan'],
  ['Kapan repeat order', '3 orang dalam 3 hari ke depan'],
];

/** The plan's split (15 left, 34 right, 10rb points a unit) on sample starting points. */
const LEGS: Array<{ leg: 'kiri' | 'kanan'; now: number; add: number }> = [
  { leg: 'kiri', now: 120, add: 150 },
  { leg: 'kanan', now: 90, add: 340 },
];
const MAX = Math.max(...LEGS.map((l) => l.now + l.add));

/**
 * Screens whose recordings still carry the principal's own terms are left out of this page; only
 * these show (docs/konsep/rencana-ro.md, GK correction 3).
 */
const CLEAN_SCREENS = ['rencana-ro-kalender', 'rencana-ro-riwayat-run'];

/**
 * Rencana RO's own page (ADR 0013), concept "Sebelum tutup mingguan" (docs/konsep/rencana-ro.md):
 * one number followed from a dated raw row to the sentence a distributor acts on, with the points
 * bar moving from now to after, then the four weekly answers in large type. Apple-style utility
 * look from the app: system font, raised text sizes for older readers, one blue. Without motion
 * each leg shows both rows, now and after, with their numbers.
 */
export async function RencanaRoPage({ project }: { project: Project }) {
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
    <main id={rootId} className="story bk-ro">
      <section className="pt-6 sm:pt-12 pb-16 sm:pb-24">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8">
          <div className="hidden sm:block mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/work' }, { label: project.client }]} />
          </div>
          <p className="m-0 ro-caption">
            <Meta parts={eyebrow} />
          </p>
          <h1 className="m-0 mt-3 text-[clamp(48px,9vw,112px)] font-bold tracking-[-0.035em] leading-[0.98]">{project.client}</h1>
          <p className="m-0 mt-5 max-w-[30ch] text-[clamp(21px,2.6vw,30px)] font-semibold leading-[1.3] tracking-[-0.01em] text-pretty">
            {project.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-start gap-x-6 gap-y-3">
            {project.showcase?.tour && (
              <a href="#tur" className="h-11 inline-flex items-center text-[17px] font-semibold ro-link hover:underline underline-offset-4">
                Tonton turnya
              </a>
            )}
            <LinkChips links={links} />
          </div>
          {summary.length > 0 && (
            <dl className="m-0 mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
              {summary.map(([label, text]) => (
                <div key={label} className="ro-card">
                  <dt className="ro-caption ro-link">{label}</dt>
                  <dd className="m-0 mt-2 text-[17px] leading-[1.55] text-pretty">{text}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <section aria-labelledby="tutup-judul" className="ro-scene" data-scene="read">
        <div className="ro-scene__stage">
          <div className="max-w-[1080px] mx-auto px-5 sm:px-8 w-full">
            <p className="m-0 ro-caption">Closing Jumat 23 Okt. Data portal per 16 Okt, diambil 20 Okt (contoh)</p>
            <h2 id="tutup-judul" className="m-0 mt-3 max-w-[22ch] text-[clamp(30px,4.4vw,52px)] font-bold tracking-[-0.03em] leading-[1.08] text-balance">
              Satu angka, dari data mentah sampai kalimat yang bisa dijalankan.
            </h2>

            <ol className="ro-steps">
              <li className="ro-card ro-step" style={{ '--t': 0 } as React.CSSProperties}>
                <p className="ro-step__label">Data mentah dari portal</p>
                <p className="ro-mono">bagan jaringan, tabel kaki, buku bonus, masa aktif</p>
                <p className="m-0 mt-2 text-[17px] ro-muted">Disimpan per distributor, lalu disimulasikan di atas pohon jaringannya sendiri.</p>
              </li>
              <li className="ro-card ro-step" style={{ '--t': 0.3 } as React.CSSProperties}>
                <p className="ro-step__label">Saran minggu ini</p>
                <p className="ro-sentence">Beli 49 unit: 15 untuk kaki kiri, 34 untuk kaki kanan.</p>
                <p className="m-0 mt-2 text-[17px] ro-muted">1 unit = 10rb poin, jadi 150rb kiri dan 340rb kanan.</p>
              </li>
              <li className="ro-card ro-step" style={{ '--t': 0.55 } as React.CSSProperties}>
                <p className="ro-step__label">Poin kiri dan kanan</p>
                <div className="ro-bars">
                  {LEGS.map(({ leg, now, add }) => (
                    <div key={leg}>
                      <p className="ro-bar__name">Kaki {leg}</p>
                      <dl className="ro-bar__rows">
                        <div className="ro-bar__row">
                          <dt>Poin sekarang</dt>
                          <dd>
                            <span aria-hidden className="ro-bar__track">
                              <span className="ro-bar__fill ro-bar__fill--now" style={{ '--w': now / MAX } as React.CSSProperties} />
                            </span>
                            {now}rb
                          </dd>
                        </div>
                        <div className="ro-bar__row">
                          <dt>Poin sesudah</dt>
                          <dd>
                            <span aria-hidden className="ro-bar__track">
                              <span
                                className="ro-bar__fill ro-bar__fill--after"
                                style={{ '--w': (now + add) / MAX, '--from': now / (now + add) } as React.CSSProperties}
                              />
                            </span>
                            {now + add}rb
                          </dd>
                        </div>
                      </dl>
                    </div>
                  ))}
                </div>
              </li>
            </ol>
            <p className="m-0 mt-4 text-[17px] ro-muted">Jaringan fiktif; poin awal contoh. Setiap angka di aplikasinya menyebut tanggal datanya.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="jawaban-judul" className="py-[clamp(72px,9vw,120px)] border-t border-paper-200">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8">
          <h2 id="jawaban-judul" className="m-0 max-w-[24ch] text-[clamp(28px,4vw,46px)] font-bold tracking-[-0.03em] leading-[1.1] text-balance">
            Empat jawaban, setiap minggu, di ponsel.
          </h2>
          <dl className="ro-answers" data-scene="enter">
            {ANSWERS.map(([q, a]) => (
              <div key={q} className="ro-card">
                <dt className="ro-step__label">{q}</dt>
                <dd className="m-0 mt-2 ro-answer">{a}</dd>
              </div>
            ))}
          </dl>
          <p className="m-0 mt-4 text-[17px] ro-muted">Dari rekaman beranda ponsel, jaringan fiktif.</p>

          {features.length > 0 && (
            <ol className="m-0 mt-16 p-0 list-none">
              {features.map((f, i) => {
                const shot = asMedia(f.screen);
                return (
                  <li key={f.id ?? i} className="ro-feature" data-scene="enter">
                    <div>
                      <h3 className="m-0 text-[clamp(22px,2.4vw,28px)] font-bold tracking-[-0.02em] leading-[1.2] text-balance">{f.title}</h3>
                      {f.body && <p className="m-0 mt-3 max-w-[52ch] text-[17px] leading-[1.6] ro-muted text-pretty">{f.body}</p>}
                    </div>
                    {shot && (
                      <figure className="m-0 ro-feature__shot">
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
