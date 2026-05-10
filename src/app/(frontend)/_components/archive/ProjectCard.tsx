import { Badge } from '../ui/Badge';
import { PayloadImage } from '../ui/PayloadImage';

type Project = {
  id: string | number;
  slug: string;
  kind: 'client' | 'studio';
  client: string;
  tagline: string;
  meta?: string | null;
  industry?: string | null;
  publishedYear?: string | null;
  pills?: Array<{ pill: string }> | null;
  excerpt?: string | null;
  coverImage?: any;
};

type Variant = 'default' | 'feature' | 'wide';

const INDUSTRY_LABELS: Record<string, string> = {
  fb: 'F&B',
  logistics: 'Logistics',
  finance: 'Finance',
  agency: 'Agency',
  vc: 'VC',
  manufacturing: 'Manufacturing',
  other: 'Other',
};

export function ProjectCard({ project, variant = 'default' }: { project: Project; variant?: Variant }) {
  const aspect =
    variant === 'feature' ? 'aspect-[3/2]' : variant === 'wide' ? 'aspect-[2/1]' : 'aspect-[16/10]';
  const titleSize = variant === 'feature' ? 'text-[32px] lg:text-[36px]' : 'text-[22px]';
  const padding = variant === 'feature' ? 'p-8 lg:p-10 gap-4' : 'p-6 gap-3';
  const layout = variant === 'feature' ? 'lg:flex-row lg:gap-0' : '';
  const imgSizeClass =
    variant === 'feature' ? 'lg:w-[55%] lg:aspect-auto lg:border-b-0 lg:border-r' : '';
  return (
    <a
      href={`/work/${project.slug}`}
      className={`group relative h-full flex flex-col bg-paper-50 border border-paper-200 rounded-2xl overflow-hidden hover:border-shadow-800 transition-all hover:-translate-y-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] ${layout}`}
      data-spotlight
    >
      <div
        className={`${aspect} bg-paper-100 border-b border-paper-200 relative overflow-hidden ${imgSizeClass}`}
      >
        {project.coverImage?.url ? (
          <PayloadImage
            media={project.coverImage}
            variant="card"
            alt={project.coverImage.alt || project.client}
            sizesAttr={variant === 'feature' ? '(min-width: 1024px) 55vw, 100vw' : '(min-width: 1024px) 33vw, 100vw'}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            fill
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-mono text-mist-400 text-xs tracking-wider uppercase tabular">
              [ {project.kind === 'client' ? 'CLIENT CASE' : 'STUDIO PRODUCT'} ]
            </span>
          </div>
        )}
        <div className="absolute top-4 left-4 z-[1]">
          <Badge variant={project.kind === 'studio' ? 'electric' : 'neutral'}>
            {project.kind === 'studio' ? '[ STUDIO ]' : '[ CLIENT ]'}
          </Badge>
        </div>
        {project.publishedYear && (
          <div className="absolute top-4 right-4 z-[1]">
            <span className="font-mono text-[11px] uppercase tracking-wider text-mist-600 bg-paper-50 px-2 py-1 rounded-md tabular">
              {project.publishedYear}
            </span>
          </div>
        )}
      </div>
      <div className={`flex flex-col flex-1 ${padding} ${variant === 'feature' ? 'lg:justify-center' : ''}`}>
        <h3 className={`${titleSize} font-bold tracking-[-0.015em] m-0 leading-tight group-hover:text-electric transition-colors`}>
          {project.client}
        </h3>
        <p className={`${variant === 'feature' ? 'text-[16px]' : 'text-[14px]'} leading-[1.5] text-mist-600 m-0 flex-1`}>
          {project.excerpt || project.tagline}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-paper-200/60 mt-auto flex-wrap gap-2">
          {project.industry && (
            <span className="font-mono text-[11px] uppercase tracking-wider text-mist-600 tabular">
              {INDUSTRY_LABELS[project.industry] || project.industry}
            </span>
          )}
          <span className="font-mono text-[11px] tracking-wider text-mist-500 group-hover:text-electric group-hover:translate-x-1 transition-[color,transform]">
            Read →
          </span>
        </div>
      </div>
    </a>
  );
}
