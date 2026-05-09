import { Badge } from '../../_components/ui/Badge';
import { Breadcrumbs } from '../../_components/detail/Breadcrumbs';
import { ProseRenderer } from '../../_components/detail/ProseRenderer';
import { PayloadImage } from '../../_components/ui/PayloadImage';

type Project = any;

export function ClientCaseDetail({ project }: { project: Project }) {
  return (
    <main>
      {/* Hero — dark cinematic */}
      <section className="relative bg-ink text-paper overflow-hidden isolate" data-theme="dark">
        <div
          aria-hidden
          className="absolute inset-0 -z-[1] bg-cover opacity-[0.18] pointer-events-none"
          style={{ backgroundImage: 'url(/assets/texture-halftone-corner.png)', backgroundPosition: 'right top' }}
        />
        <div className="max-w-[1180px] mx-auto px-8 pt-12 pb-20 relative z-[1]">
          <div className="mb-10">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/work' }, { label: project.client }]} />
          </div>
          <div className="flex gap-2 flex-wrap mb-5">
            {project.featuredDetails?.badgeLabel && <Badge variant="dark">{project.featuredDetails.badgeLabel}</Badge>}
            {project.featuredDetails?.shippedLabel && <Badge variant="success">{project.featuredDetails.shippedLabel}</Badge>}
          </div>
          {(project.featuredDetails?.metaLine || project.meta) && (
            <span className="block font-mono text-[11px] uppercase tracking-wider text-mist-500 mb-4 tabular">
              {project.featuredDetails?.metaLine || project.meta}
            </span>
          )}
          <h1 className="text-[clamp(40px,5.5vw,72px)] font-bold tracking-[-0.025em] leading-[1.05] my-6 max-w-[20ch] text-balance">
            {project.featuredDetails?.headline || `${project.client} — ${project.tagline}`}
          </h1>
          {project.featuredDetails?.description && (
            <p className="text-[19px] leading-[1.55] text-mist-400 max-w-[640px] mb-10 text-pretty">
              {project.featuredDetails.description}
            </p>
          )}
          {project.featuredDetails?.metrics && project.featuredDetails.metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10 pt-10 border-t border-shadow-700 tabular">
              {project.featuredDetails.metrics.map((m: any, i: number) => (
                <div key={i}>
                  <div className="text-[56px] font-bold tracking-[-0.025em] leading-none">
                    {m.num}
                    {m.accent && <span className="text-electric">{m.accent}</span>}
                  </div>
                  <div className="font-mono text-[11px] text-mist-500 tracking-wider mt-2">{m.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Body — split layout: prose + code panel sticky */}
      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16">
          <div>
            {project.richContent ? (
              <ProseRenderer data={project.richContent} />
            ) : (
              <div className="text-mist-600 italic">
                Full case study coming soon. In the meantime,{' '}
                <a href="/#contact" className="text-electric underline underline-offset-2">
                  get in touch
                </a>{' '}
                if you'd like to hear how we shipped this.
              </div>
            )}
          </div>
          <aside className="lg:sticky lg:top-24 self-start space-y-6">
            {project.featuredDetails?.codePanel && (
              <div className="bg-shadow-900 text-paper border border-shadow-700 rounded-lg px-[22px] py-5 font-mono text-[13px] leading-[1.7] overflow-hidden tabular">
                <div className="text-mist-600 mb-2 flex justify-between">
                  <span>{project.featuredDetails.codePanel.tag}</span>
                  <span>{project.featuredDetails.codePanel.path}</span>
                </div>
                {project.featuredDetails.codePanel.lines?.map((l: any, i: number) => (
                  <div key={i} className="flex">
                    <span className="text-mist-600 inline-block w-[22px]">{i + 1}</span>
                    <span dangerouslySetInnerHTML={{ __html: l.line || '' }} />
                  </div>
                ))}
              </div>
            )}
            <div className="border border-paper-200 rounded-lg p-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600 mb-4">
                Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {(project.featuredDetails?.stack || project.pills || []).map((s: any) => (
                  <Badge key={s.tech || s.pill}>{s.tech || s.pill}</Badge>
                ))}
              </div>
            </div>
            {project.testimonial?.quote && (
              <blockquote className="border-l-2 border-electric pl-5 py-3">
                <p className="text-[16px] leading-[1.5] text-ink m-0">"{project.testimonial.quote}"</p>
                <footer className="font-mono text-[11px] uppercase tracking-wider text-mist-600 mt-3 tabular">
                  — {project.testimonial.author}, {project.testimonial.role}
                </footer>
              </blockquote>
            )}
          </aside>
        </div>
      </section>

      {/* Gallery — full bleed if exists */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-12 bg-paper-50 border-y border-paper-200">
          <div className="max-w-[1180px] mx-auto px-8">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600 mb-6">
              Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.gallery.map((g: any, i: number) => (
                <figure key={i} className="rounded-lg overflow-hidden border border-paper-200 bg-paper-100">
                  {g.image?.url && (
                    <PayloadImage
                      media={g.image}
                      variant="card"
                      alt={g.image.alt || ''}
                      sizesAttr="(min-width: 768px) 50vw, 100vw"
                      className="w-full h-auto"
                    />
                  )}
                  {g.caption && (
                    <figcaption className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-mist-600 tabular">
                      {g.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
