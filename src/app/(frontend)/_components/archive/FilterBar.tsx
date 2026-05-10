'use client';

type Option = { value: string; label: string; count?: number };
type Variant = 'segmented' | 'chips';

export function FilterBar({
  label,
  options,
  active,
  onChange,
  variant = 'chips',
}: {
  label: string;
  options: Option[];
  active: string;
  onChange: (value: string) => void;
  variant?: Variant;
}) {
  if (variant === 'segmented') {
    return (
      <div className="flex items-center gap-4 flex-wrap">
        {label && (
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600 shrink-0">
            {label}
          </span>
        )}
        <div className="inline-flex items-center bg-paper-100 border border-paper-200 rounded-full p-1 gap-0.5">
          {options.map((opt) => {
            const isActive = opt.value === active;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange(opt.value)}
                aria-pressed={isActive}
                className={`h-8 px-4 rounded-full font-mono text-[11px] font-medium tracking-wider uppercase cursor-pointer transition-all active:scale-[0.97] tabular flex items-center whitespace-nowrap
                  ${
                    isActive
                      ? 'bg-ink text-paper shadow-[0_2px_6px_-2px_rgba(8,9,10,0.3)]'
                      : 'text-mist-600 hover:text-ink'
                  }`}
              >
                {opt.label}
                {opt.count !== undefined && (
                  <span
                    className={`ml-1.5 tabular ${isActive ? 'text-mist-400' : 'text-mist-500'}`}
                  >
                    {opt.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // chips variant (secondary filter — smaller, lighter, electric-tinted active)
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {label && (
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mist-500 shrink-0 mr-1">
          {label}
        </span>
      )}
      {options.map((opt) => {
        const isActive = opt.value === active;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={isActive}
            className={`h-7 px-2.5 rounded-md font-mono text-[10px] font-medium tracking-wider uppercase cursor-pointer transition-colors active:scale-[0.97] tabular flex items-center whitespace-nowrap
              ${
                isActive
                  ? 'bg-electric/[0.08] text-electric border border-electric/30'
                  : 'bg-transparent text-mist-500 border border-transparent hover:text-ink hover:bg-paper-100'
              }`}
          >
            {opt.label}
            {opt.count !== undefined && (
              <span className={`ml-1 ${isActive ? 'text-electric/60' : 'text-mist-400'}`}>
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
