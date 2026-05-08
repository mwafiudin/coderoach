type Variant = 'neutral' | 'electric' | 'success' | 'warning' | 'error' | 'dark';

const STYLES: Record<Variant, string> = {
  neutral: 'bg-mist-400/30 text-ink',
  electric: 'bg-electric/[0.10] text-electric border border-electric/30',
  success: 'bg-success/[0.18] text-[#5DD79A]',
  warning: 'bg-warning/[0.18] text-warning',
  error: 'bg-error/[0.18] text-error',
  dark: 'bg-paper/[0.08] text-paper',
};

export function Badge({
  children,
  variant = 'neutral',
  className = '',
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={`h-6 px-2.5 rounded-full inline-flex items-center font-mono text-[11px] font-medium uppercase tracking-wider whitespace-nowrap ${STYLES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
