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
import { archivo } from '../fonts';
import './akarkita.css';

/**
 * What four relatives call Rahmat (made up), who has an older sister and a younger brother. Every
 * term is the one AkarKita's own data gives (seed-data/terms.sunda.ts and terms.minang.ts in its
 * repo, read 30 Oct 2026); the note says which rule picked it.
 */
const ROWS: Array<{ asker: string; sunda: [string, string]; minang: [string, string] }> = [
  {
    asker: 'Anak kakak perempuannya',
    sunda: ['Emang', 'adik laki-laki orang tua'],
    minang: ['Mamak', 'saudara laki-laki ibu'],
  },
  {
    asker: 'Anak adik laki-lakinya',
    sunda: ['Uwa', 'kakak orang tua, laki-laki atau perempuan'],
    minang: ['Pak tuo', 'kakak laki-laki ayah'],
  },
  { asker: 'Adik laki-lakinya', sunda: ['Lanceuk', 'saudara yang lebih tua'], minang: ['Uda', 'saudara laki-laki yang lebih tua'] },
  { asker: 'Anaknya', sunda: ['Bapa', 'ayah'], minang: ['Apak', 'ayah'] },
];

/**
 * AkarKita's own page (ADR 0013), concept "Kain silsilah" (docs/konsep/akarkita.md): one man woven
 * into a cloth whose weft is who is asking and whose warp is the custom, with the term he is called
 * at each crossing. Tenun Nusantara from the app: pale blue-grey ground, indigo, a gold thread,
 * custom colours only on the labelled column heads, Archivo opened wide for display. Without motion
 * the cloth is simply whole.
 */
export async function AkarKitaPage({ project }: { project: Project }) {
  const rootId = `story-${project.slug}`;
  const links = await linkViews(project.links ?? []);
  const metrics = project.metrics ?? [];
  const tree = asMedia(project.showcase?.screen) ?? asMedia(project.coverImage);
  const phone = asMedia(project.showcase?.screenPhone);
  const eyebrow = [KIND_LABELS[project.kind], industryLabel(project.industry), project.publishedYear].filter(Boolean);
  const summary = [
    ['Masalah', project.summary?.problem],
    ['Solusi', project.summary?.solution],
    ['Hasil', project.summary?.result],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <main id={rootId} className={`story bk-ak ${archivo.variable}`}>
      <section className="pt-6 sm:pt-12 pb-16 sm:pb-24">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
          <div className="hidden sm:block mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/work' }, { label: project.client }]} />
          </div>
          <p className="m-0 ak-label">
            <Meta parts={eyebrow} />
          </p>
          <h1 className="m-0 mt-3 ak-display text-[clamp(52px,10vw,128px)] leading-[0.95]">{project.client}</h1>
          <p className="m-0 mt-5 max-w-[30ch] text-[clamp(20px,2.4vw,28px)] font-medium leading-[1.35] text-pretty">{project.tagline}</p>
          <div className="mt-6 flex flex-wrap items-start gap-x-6 gap-y-3">
            <LinkChips links={links} />
          </div>
          {summary.length > 0 && (
            <dl className="m-0 mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 border-t border-paper-200 pt-8">
              {summary.map(([label, text]) => (
                <div key={label}>
                  <dt className="ak-label ak-nila">{label}</dt>
                  <dd className="m-0 mt-2 text-[17px] leading-[1.6] text-pretty">{text}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <section aria-labelledby="kain-judul" className="ak-scene">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
          <p className="m-0 ak-label ak-nila">Kain silsilah</p>
          <h2 id="kain-judul" className="m-0 mt-3 max-w-[22ch] ak-display text-[clamp(30px,4.4vw,52px)] leading-[1.08] text-balance">
            Rahmat dipanggil apa? Tergantung siapa yang bertanya, dan adat mana yang dipakai.
          </h2>
          <p className="m-0 mt-5 max-w-[56ch] text-[17px] leading-[1.6] ak-muted text-pretty">
            Rahmat punya seorang kakak perempuan dan seorang adik laki-laki. Benang pakan adalah orang yang bertanya,
            benang lungsin adalah adatnya, dan sebutannya ada di persilangan.
          </p>

          <table className="ak-cloth" role="table">
            <caption className="sr-only">Sebutan untuk Rahmat menurut penanya dan adat, keluarga contoh</caption>
            <thead>
              <tr role="row">
                <th scope="col" role="columnheader">
                  Yang bertanya
                </th>
                <th scope="col" role="columnheader" className="ak-col ak-col--sunda">
                  Sunda <span><span lang="su">Pancakaki</span>, garis ayah dan ibu</span>
                </th>
                <th scope="col" role="columnheader" className="ak-col ak-col--minang">
                  Minangkabau <span>Suku dari garis ibu</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.asker} role="row" className="ak-weft" data-scene="enter">
                  <th scope="row" role="rowheader">
                    {r.asker}
                  </th>
                  <td role="cell">
                    <span className="ak-term" lang="su">
                      {r.sunda[0]}
                    </span>
                    <span className="ak-why">{r.sunda[1]}</span>
                  </td>
                  <td role="cell">
                    <span className="ak-term" lang="min">
                      {r.minang[0]}
                    </span>
                    <span className="ak-why">{r.minang[1]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="m-0 mt-4 text-[14px] ak-muted">Keluarga contoh. Istilah dari data AkarKita sendiri.</p>

          <div className="ak-rules">
            <p className="m-0">
              <strong>Sunda menimbang umur.</strong> Kakak orang tua, dari sisi mana pun, adalah{' '}
              <span lang="su">Uwa</span>; adik laki-lakinya <span lang="su">Emang</span>.
            </p>
            <p className="m-0">
              <strong>
                Untuk saudara laki-laki ibu, tua atau muda tetap <span lang="min">Mamak</span>.
              </strong> Sapaan urutannya, seperti{' '}
              <span lang="min">Mak dang</span> atau <span lang="min">Mak etek</span>, bervariasi per nagari. Dari sudut <span lang="min">Mamak</span>,
              anak saudara perempuannya adalah <span lang="min">Kamanakan</span>; <span lang="min">Bako</span> adalah saudara
              perempuan ayah, atau rumah asal ayah.
            </p>
            <p className="m-0 ak-muted">
              Istilah, aturan pewarisan suku, dan peringatan pernikahan sesuku disimpan sebagai data, jadi adat lain bisa
              ditambahkan tanpa mengubah kode.
            </p>
          </div>
        </div>
      </section>

      {tree && (
        <section aria-labelledby="pohon-judul" className="py-[clamp(72px,9vw,120px)] border-t border-paper-200">
          <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
            <h2 id="pohon-judul" className="m-0 ak-display text-[clamp(28px,4vw,46px)] leading-[1.1] text-balance">
              Kain yang sama, dilihat utuh.
            </h2>
            <p className="m-0 mt-4 max-w-[54ch] text-[17px] leading-[1.6] ak-muted text-pretty">
              Pohonnya digambar di canvas sendiri, dengan geser, zum, dan cubit, dan berubah bentuk saat diperkecil: dari orang per
              orang menjadi kelompok keluarga.
            </p>
            <div className="ak-shots" data-scene="enter">
              <figure className="m-0 ak-shots__wide">
                <DeviceFrame kind="browser">
                  <MediaImg media={tree} sizes="(min-width: 1024px) 760px, 92vw" />
                </DeviceFrame>
              </figure>
              {phone && (
                <figure className="m-0 ak-shots__phone">
                  <DeviceFrame kind="phone">
                    <MediaImg media={phone} sizes="240px" />
                  </DeviceFrame>
                </figure>
              )}
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="waris-judul" className="py-[clamp(72px,9vw,120px)] border-t border-paper-200 ak-surface">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-8 md:gap-16">
          <h2 id="waris-judul" className="m-0 ak-display text-[clamp(26px,3.4vw,40px)] leading-[1.12] text-balance">
            Warisan dengan pecahan eksak.
          </h2>
          <div className="space-y-5 text-[17px] leading-[1.6] text-pretty">
            <p className="m-0">
              Simulator faraid menghitung bagian ahli waris dengan pecahan, bukan desimal yang dibulatkan, dan membedakan harta
              pusaka tinggi Minang dari harta pencaharian. Sifatnya edukatif, bukan fatwa.
            </p>
            <p className="m-0 ak-muted">
              Aplikasinya bisa dibuka tanpa sinyal, foto dikompres di perangkat sebelum diunggah, dan dipakai sungguhan oleh satu
              keluarga besar.
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
