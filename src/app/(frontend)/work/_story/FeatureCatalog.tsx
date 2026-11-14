import { KATALOG, KATALOG_DIR, type Catalog } from '@/lib/portfolio/katalog';
import { DeviceFrame } from './DeviceFrame';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * The feature catalogue every project page ends with: groups by role or job, one real screen each,
 * the rest of the group behind a native <details> (works without JS, read by screen readers), then
 * where the same pattern fits another business. Colours come from the site tokens, which each
 * bespoke page remaps on its root, so one component sits in light and dark pages alike.
 */
export function FeatureCatalog({ slug, client }: { slug: string; client: string }) {
  const catalog: Catalog | undefined = KATALOG[slug];
  if (!catalog) return null;
  const total = catalog.groups.length;
  return (
    <section aria-labelledby="katalog-judul" className="py-[clamp(72px,9vw,120px)] border-t border-paper-200">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <p className="m-0 font-mono text-[11px] uppercase tracking-wider text-electric">Fitur {client}</p>
        <h2 id="katalog-judul" className="m-0 mt-3 max-w-[22ch] text-[clamp(30px,4.4vw,52px)] font-extrabold tracking-[-0.035em] leading-[1.05] text-balance">
          {catalog.heading}
        </h2>

        <ol className="m-0 mt-12 p-0 list-none">
          {catalog.groups.map((g, i) => {
            const phone = g.shot.frame === 'phone';
            return (
              <li
                key={g.role}
                data-scene="enter"
                className={`grid gap-8 py-12 border-t border-paper-200 lg:gap-14 ${
                  phone ? 'lg:grid-cols-[minmax(0,1fr)_300px]' : 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]'
                } lg:items-start`}
              >
                <div>
                  <p className="m-0 flex flex-wrap gap-x-3 font-mono text-[11px] uppercase tracking-wider text-ink/65">
                    <span aria-hidden>[ {pad(i + 1)} / {pad(total)} ]</span>
                    <span>{g.role}</span>
                  </p>
                  <h3 className="m-0 mt-4 text-[clamp(24px,2.6vw,32px)] font-bold tracking-[-0.025em] leading-[1.15] text-balance">{g.title}</h3>
                  <p className="m-0 mt-3 max-w-[52ch] text-[17px] leading-[1.6] text-ink/70 text-pretty">{g.body}</p>
                  {g.more.length > 0 && (
                    <details className="group mt-6 max-w-[56ch] border-t border-paper-200">
                      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-3 text-[15px] font-semibold text-electric focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric [&::-webkit-details-marker]:hidden">
                        <span>{g.more.length} fitur lain di bagian ini</span>
                        <span aria-hidden className="font-mono text-[18px] leading-none transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <ul className="m-0 p-0 pb-2 list-none">
                        {g.more.map((m) => (
                          <li key={m.name} className="py-3 border-t border-paper-200 first:border-t-0">
                            <p className="m-0 text-[16px] font-semibold leading-[1.4]">{m.name}</p>
                            <p className="m-0 mt-1 text-[15px] leading-[1.55] text-ink/70 text-pretty">{m.body}</p>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
                <figure className={`m-0 ${phone ? 'w-full max-w-[300px] justify-self-center lg:justify-self-end' : 'w-full'}`}>
                  <DeviceFrame kind={phone ? 'phone' : 'browser'}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- a fixed local file, already sized */}
                    <img
                      src={`${KATALOG_DIR}/${g.shot.file}`}
                      alt={g.shot.alt}
                      width={g.shot.width}
                      height={g.shot.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </DeviceFrame>
                </figure>
              </li>
            );
          })}
        </ol>

        {catalog.fitsFor.length > 0 && (
          <div className="mt-6 pt-12 border-t border-paper-200">
            <h3 className="m-0 text-[clamp(22px,2.2vw,28px)] font-bold tracking-[-0.02em] leading-[1.2]">Pola yang sama, untuk usaha lain.</h3>
            <ul className="m-0 mt-8 p-0 list-none grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              {catalog.fitsFor.map((f) => (
                <li key={f.field} className="border-t-2 border-electric pt-4">
                  <p className="m-0 text-[17px] font-semibold leading-[1.35]">{f.field}</p>
                  <p className="m-0 mt-2 text-[15px] leading-[1.55] text-ink/70 text-pretty">{f.example}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
