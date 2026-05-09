import { PayloadImage } from '../ui/PayloadImage';

type Author = {
  name?: string | null;
  role?: string | null;
  avatar?: any;
};

const initials = (name?: string | null) =>
  (name || '??')
    .split(/\s+/)
    .map((p) => p[0]?.toUpperCase() || '')
    .slice(0, 2)
    .join('');

export function AuthorChip({ author }: { author: Author | null | undefined }) {
  if (!author) return null;
  return (
    <div className="inline-flex items-center gap-3">
      {author.avatar?.url ? (
        <PayloadImage
          media={author.avatar}
          variant="thumbnail"
          alt={author.avatar.alt || author.name || ''}
          width={36}
          height={36}
          className="w-9 h-9 rounded-full object-cover bg-paper-200"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-electric to-[#5DD79A] grid place-items-center text-paper text-[12px] font-bold tracking-wide">
          {initials(author.name)}
        </div>
      )}
      <div className="flex flex-col gap-0.5 leading-tight">
        <span className="text-sm font-semibold text-ink">{author.name}</span>
        {author.role && (
          <span className="font-mono text-[11px] uppercase tracking-wider text-mist-600 tabular">
            {author.role}
          </span>
        )}
      </div>
    </div>
  );
}
