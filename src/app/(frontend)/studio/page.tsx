import { getPayload } from 'payload';
import config from '@payload-config';
import type { Metadata } from 'next';
import { SectionShell } from '../_components/detail/SectionShell';
import { Breadcrumbs } from '../_components/detail/Breadcrumbs';
import { ProseRenderer } from '../_components/detail/ProseRenderer';
import { Icon, type IconName } from '@/lib/icons';
import { Badge } from '../_components/ui/Badge';
import { AnimatedCount } from '../_components/ui/AnimatedCount';

export const dynamic = 'force-static';
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Studio — Coderoach',
  description: 'A small senior team in Jakarta. Eleven humans, four years, forty engagements. Built to outlast the brief.',
};

export default async function StudioPage() {
  const payload = await getPayload({ config });

  const [studio, tenets, authors] = await Promise.all([
    payload.findGlobal({ slug: 'studio' }).catch(() => null) as Promise<any>,
    payload
      .find({ collection: 'tenets', sort: 'order', limit: 100 })
      .catch(() => ({ docs: [] })),
    payload.find({ collection: 'authors', limit: 100, depth: 1 }).catch(() => ({ docs: [] })),
  ]);

  return (
    <SectionShell>
      {/* Hero — left-aligned w/ asymmetric whitespace */}
      <section className="pt-12 pb-20 border-b border-paper-200">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Studio' }]} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 items-end">
            <div>
              <span className="font-mono text-xs font-medium tracking-wider text-mist-600 uppercase inline-flex items-center gap-2 tabular">
                [ THE STUDIO ] <span className="text-mist-400">·</span> Who we are
              </span>
              <h1 className="text-[clamp(48px,7vw,88px)] font-bold tracking-[-0.025em] leading-[0.95] mt-6 max-w-[16ch] text-balance">
                {studio?.about?.pageHeading || 'A studio that ships.'}
              </h1>
            </div>
            {(studio?.about?.pageLede || studio?.lede) && (
              <p className="text-[18px] leading-[1.6] text-mist-600 lg:justify-self-end max-w-[460px] text-pretty">
                {studio?.about?.pageLede || studio?.lede}
              </p>
            )}
          </div>

          {/* Stats — bento grid (mixed cell sizes) */}
          {studio?.stats && studio.stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 pt-12 mt-16 border-t border-paper-200">
              {studio.stats.map((s: any, i: number) => {
                // Bento sizing: 1st cell big (2x2), 2nd horizontal (2x1), 3rd & 4th compact
                const span =
                  i === 0
                    ? 'md:col-span-2 md:row-span-2 bg-ink text-paper'
                    : i === 1
                      ? 'md:col-span-2 md:row-span-1 bg-paper-50 border border-paper-200'
                      : 'md:col-span-1 md:row-span-1 bg-paper-50 border border-paper-200';
                const numColor = i === 0 ? 'text-paper' : 'text-ink';
                const labelColor = i === 0 ? 'text-mist-500' : 'text-mist-600';
                const numSize = i === 0 ? 'text-[clamp(72px,9vw,128px)]' : 'text-[clamp(36px,4vw,52px)]';
                return (
                  <div
                    key={i}
                    className={`rounded-2xl p-7 flex flex-col justify-end gap-3 ${span} shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]`}
                  >
                    <div
                      className={`${numSize} font-bold leading-[0.95] tracking-[-0.03em] tabular ${numColor}`}
                    >
                      <AnimatedCount value={s.num} />
                      {s.accent && <span className="text-electric">{s.accent}</span>}
                    </div>
                    <div
                      className={`text-[11px] font-semibold uppercase tracking-[0.18em] leading-[1.5] whitespace-pre-line ${labelColor}`}
                    >
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Mission — single sentence, large */}
      {studio?.about?.mission && (
        <section className="py-20 bg-paper-50 relative">
          <div className="max-w-[880px] mx-auto px-8 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600 mb-6 block">
              Mission
            </span>
            <p className="text-[clamp(28px,3.5vw,40px)] font-semibold tracking-[-0.015em] leading-[1.25] m-0 text-ink text-balance">
              {studio.about.mission}
            </p>
          </div>
        </section>
      )}

      {/* Diagonal halftone divider — slanted band between mission and story */}
      <div
        aria-hidden
        className="relative h-32 overflow-hidden bg-paper-50"
        style={{
          clipPath: 'polygon(0 0, 100% 35%, 100% 100%, 0 65%)',
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(/assets/texture-halftone-streak.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper-50 via-paper-100 to-paper-50" />
      </div>

      {/* Story — long-form */}
      {studio?.about?.story && (
        <section className="py-20">
          <div className="max-w-[1180px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600 lg:sticky lg:top-24 block">
                Our story
              </span>
            </div>
            <div>
              <ProseRenderer data={studio.about.story} />
            </div>
          </div>
        </section>
      )}

      {/* Tenets — full */}
      {tenets?.docs?.length > 0 && (
        <section className="py-20 bg-ink text-paper" data-theme="dark">
          <div className="max-w-[1180px] mx-auto px-8">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-500 mb-12 block">
              Principles
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 reveal-stagger">
              {(tenets.docs as any[]).map((t, i) => (
                <div key={t.id} className="flex flex-col gap-3">
                  <span className="text-mist-400">
                    <Icon name={t.icon as IconName} size={22} />
                  </span>
                  <h3 className="text-[28px] font-bold tracking-[-0.02em] leading-[1.15] m-0 text-paper">
                    {t.title}
                  </h3>
                  <p className="text-[16px] leading-[1.55] text-mist-400 m-0">{t.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team — Authors as team members */}
      {authors?.docs?.length > 0 && (
        <section className="py-20">
          <div className="max-w-[1180px] mx-auto px-8">
            <div className="flex items-baseline justify-between mb-12 flex-wrap gap-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600">
                  Team
                </span>
                <h2 className="text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.02em] leading-tight mt-2">
                  Eleven humans. No juniors hidden.
                </h2>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-500">
                {authors.docs.length} {authors.docs.length === 1 ? 'person' : 'people'} on the page
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(authors.docs as any[]).map((a) => (
                <div
                  key={a.id}
                  className="bg-paper-50 border border-paper-200 rounded-2xl p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {a.avatar?.url ? (
                      <img
                        src={a.avatar.url}
                        alt={a.avatar.alt || a.name}
                        className="w-12 h-12 rounded-full object-cover bg-paper-200"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric to-[#5DD79A] grid place-items-center text-paper text-sm font-bold tracking-wide">
                        {(a.name || '??')
                          .split(/\s+/)
                          .map((p: string) => p[0]?.toUpperCase() || '')
                          .slice(0, 2)
                          .join('')}
                      </div>
                    )}
                    <div className="flex flex-col gap-0.5 leading-tight">
                      <span className="text-[16px] font-bold text-ink">{a.name}</span>
                      {a.role && (
                        <span className="font-mono text-[11px] uppercase tracking-wider text-mist-600 tabular">
                          {a.role}
                        </span>
                      )}
                    </div>
                  </div>
                  {a.bio && <p className="text-[14px] leading-[1.55] text-mist-600 m-0">{a.bio}</p>}
                  {a.socialLinks && a.socialLinks.length > 0 && (
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {a.socialLinks.map((sl: any) => (
                        <a
                          key={sl.platform}
                          href={sl.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[11px] uppercase tracking-wider text-mist-600 hover:text-electric tabular"
                        >
                          {sl.platform} →
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Workspace */}
      {studio?.about?.workspace && (
        <section className="py-20 bg-paper-50 border-y border-paper-200">
          <div className="max-w-[1180px] mx-auto px-8">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600 mb-10 block">
              Workspace
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
              <div className="aspect-[4/3] rounded-2xl bg-paper-100 border border-paper-200 overflow-hidden relative">
                {studio.about.workspace.image?.url ? (
                  <img
                    src={studio.about.workspace.image.url}
                    alt={studio.about.workspace.image.alt || 'Coderoach workspace'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="absolute inset-0 bg-cover opacity-40"
                    style={{ backgroundImage: 'url(/assets/bg-grid-clean.png)' }}
                  />
                )}
              </div>
              <div className="flex flex-col gap-6">
                {studio.about.workspace.address && (
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600 mb-2 block">
                      Address
                    </span>
                    <p className="text-[24px] font-bold tracking-[-0.015em] m-0 leading-tight">
                      {studio.about.workspace.address}
                    </p>
                  </div>
                )}
                {studio.about.workspace.hours && (
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600 mb-2 block">
                      Hours
                    </span>
                    <p className="text-[16px] m-0 text-ink">{studio.about.workspace.hours}</p>
                  </div>
                )}
                {studio.about.workspace.tagline && (
                  <Badge>{studio.about.workspace.tagline}</Badge>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline — alternating zig-zag with center spine */}
      {studio?.about?.timeline && studio.about.timeline.length > 0 && (
        <section className="py-20">
          <div className="max-w-[1180px] mx-auto px-8">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600 mb-16 block">
              Timeline
            </span>
            <div className="relative">
              {/* Center spine — desktop only */}
              <div
                aria-hidden
                className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-paper-200 -translate-x-1/2"
              />
              <div className="flex flex-col gap-12 md:gap-16">
                {(studio.about.timeline as any[]).map((t, i) => {
                  const isRight = i % 2 === 1;
                  return (
                    <div
                      key={i}
                      className={`relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center ${
                        isRight ? 'md:[&>*:first-child]:order-2' : ''
                      }`}
                    >
                      {/* Spine dot */}
                      <div
                        aria-hidden
                        className="hidden md:block absolute left-1/2 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric border-2 border-paper-100 z-[1]"
                      />
                      {/* Content side */}
                      <div className={`${isRight ? 'md:text-left md:pl-12' : 'md:text-right md:pr-12'}`}>
                        <div className="text-[clamp(36px,4vw,56px)] font-bold tracking-[-0.025em] leading-none text-electric tabular mb-2">
                          {t.year}
                        </div>
                        <h3 className="text-[20px] font-bold tracking-[-0.01em] leading-tight m-0 mb-2">
                          {t.title}
                        </h3>
                        {t.description && (
                          <p className="text-[15px] leading-[1.55] text-mist-600 m-0 max-w-[44ch] inline-block">
                            {t.description}
                          </p>
                        )}
                      </div>
                      <div className="hidden md:block" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-ink text-paper" data-theme="dark">
        <div className="max-w-[1180px] mx-auto px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-500">
              Want to work with us?
            </span>
            <p className="text-[28px] font-bold tracking-[-0.015em] mt-3 text-paper text-balance">
              We take a small number of new engagements each quarter.
            </p>
          </div>
          <a
            href="/#contact"
            className="h-12 px-5 rounded-md bg-electric text-paper text-sm font-semibold inline-flex items-center hover:bg-[#2562E0] transition-colors"
          >
            Start a 48-hour discovery →
          </a>
        </div>
      </section>
    </SectionShell>
  );
}
