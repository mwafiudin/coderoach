'use client';

type Option = { value: string; label: string; count?: number };

export function FilterBar({
  label,
  options,
  active,
  onChange,
}: {
  label: string;
  options: Option[];
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600 shrink-0">
        {label}
      </span>
      <div className="flex items-center gap-1.5 flex-wrap">
        {options.map((opt) => {
          const isActive = opt.value === active;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`h-8 px-3 rounded-full font-mono text-[11px] font-medium tracking-wider uppercase cursor-pointer transition-colors active:scale-[0.97] tabular
                ${isActive
                  ? 'bg-ink text-paper border border-ink'
                  : 'bg-transparent text-mist-600 border border-paper-200 hover:text-ink hover:border-mist-400'
                }`}
            >
              {opt.label}
              {opt.count !== undefined && (
                <span className={`ml-1.5 ${isActive ? 'text-mist-400' : 'text-mist-500'}`}>{opt.count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
