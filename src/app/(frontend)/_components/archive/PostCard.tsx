import { Badge } from '../ui/Badge';
import { PayloadImage } from '../ui/PayloadImage';

type Post = {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  category: 'engineering' | 'operating' | 'studio' | 'notes';
  author?: { name?: string | null } | string | number | null;
  publishedAt?: string | null;
  readingTime?: number | null;
  coverImage?: any;
  featured?: boolean | null;
};

const CATEGORY_VARIANTS = {
  engineering: 'electric',
  operating: 'success',
  studio: 'warning',
  notes: 'neutral',
} as const;

const CATEGORY_LABELS = {
  engineering: 'Engineering',
  operating: 'Operating',
  studio: 'Studio',
  notes: 'Notes',
} as const;

function formatDate(iso?: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const authorName = typeof post.author === 'object' && post.author !== null ? post.author.name : null;

  return (
    <a
      href={`/notes/${post.slug}`}
      className={`group relative flex flex-col bg-paper-50 border border-paper-200 rounded-2xl overflow-hidden hover:border-shadow-800 transition-all hover:-translate-y-0.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]
        ${featured ? 'lg:flex-row lg:col-span-2 lg:gap-0' : ''}`}
    >
      <div
        className={`relative bg-paper-100 border-paper-200 overflow-hidden
          ${featured ? 'lg:w-1/2 aspect-[16/10] lg:aspect-auto border-b lg:border-b-0 lg:border-r' : 'aspect-[16/10] border-b'}`}
      >
        {post.coverImage?.url ? (
          <PayloadImage
            media={post.coverImage}
            variant="card"
            alt={post.coverImage.alt || post.title}
            sizesAttr={featured ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            fill
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover opacity-30"
            style={{
              backgroundImage: 'url(/assets/bg-grid-clean.png)',
            }}
          />
        )}
        <div className="absolute top-4 left-4">
          <Badge variant={CATEGORY_VARIANTS[post.category]}>
            [ {CATEGORY_LABELS[post.category].toUpperCase()} ]
          </Badge>
        </div>
      </div>
      <div className={`p-6 flex flex-col gap-3 flex-1 ${featured ? 'lg:p-10 lg:gap-5 lg:justify-center' : ''}`}>
        <h3
          className={`font-bold tracking-[-0.015em] m-0 leading-tight group-hover:text-electric transition-colors
            ${featured ? 'text-[32px] lg:text-[40px]' : 'text-[22px]'}`}
        >
          {post.title}
        </h3>
        <p className={`leading-[1.55] text-mist-600 m-0 flex-1 ${featured ? 'text-[16px]' : 'text-[14px]'}`}>
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 flex-wrap pt-3 border-t border-paper-200/60 mt-auto font-mono text-[11px] tracking-wider uppercase text-mist-600 tabular">
          {authorName && <span>{authorName}</span>}
          {authorName && <span className="text-mist-400">·</span>}
          {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          {post.readingTime && (
            <>
              <span className="text-mist-400">·</span>
              <span>{post.readingTime} min read</span>
            </>
          )}
        </div>
      </div>
    </a>
  );
}
