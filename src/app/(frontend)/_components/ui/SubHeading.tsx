/**
 * Lightweight section sub-heading — replaces overused `// LABEL` mono treatments.
 * Uppercase Satoshi caps with optional thin rule below. Less code-y than mono.
 */
type Props = {
  children: React.ReactNode;
  /** Add a thin horizontal rule below (default true). */
  rule?: boolean;
  /** Variant: light (default) for paper bg, dark for ink bg. */
  tone?: 'light' | 'dark';
  className?: string;
  as?: 'h2' | 'h3' | 'div';
};

export function SubHeading({ children, rule = true, tone = 'light', className = '', as: As = 'div' }: Props) {
  const color = tone === 'dark' ? 'text-mist-500' : 'text-mist-600';
  const ruleColor = tone === 'dark' ? 'border-shadow-700' : 'border-paper-200';
  return (
    <As className={`flex items-center gap-3 ${className}`}>
      <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${color}`}>
        {children}
      </span>
      {rule && <span className={`flex-1 h-px ${ruleColor.replace('border-', 'bg-')}`} />}
    </As>
  );
}
