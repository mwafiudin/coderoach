type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-wider text-mist-600 flex items-center gap-2 flex-wrap tabular">
      {items.map((c, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="contents">
            {i > 0 && <span className="text-mist-400">/</span>}
            {c.href && !isLast ? (
              <a href={c.href} className="hover:text-electric transition-colors">
                {c.label}
              </a>
            ) : (
              <span className={isLast ? 'text-ink' : ''}>{c.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
