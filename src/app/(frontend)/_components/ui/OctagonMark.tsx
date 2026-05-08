/**
 * Simplified octagon SVG primitive (8-sided polygon) — used as decorative
 * brand motif in hero watermark, loading spinner, and section dividers.
 * NOT the full Coderoach logo with C-cutout (that's coderoach_logo.svg) —
 * this is an abstracted geometry that pairs with the logo.
 */
type Props = {
  size?: number;
  className?: string;
  filled?: boolean;
  strokeWidth?: number;
};

export function OctagonMark({ size = 24, className = '', filled = false, strokeWidth = 1.5 }: Props) {
  // Regular octagon points centered on 24x24 grid
  const points = '7,2 17,2 22,7 22,17 17,22 7,22 2,17 2,7';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polygon points={points} />
    </svg>
  );
}

/**
 * 3-dot row of mini octagons — section divider element.
 * Pulses to electric on intersection (via `.in` class added by IO observer).
 */
export function OctagonDots({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 reveal ${className}`} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <OctagonMark
          key={i}
          size={10}
          filled
          className="text-mist-400 transition-colors duration-700 [.in_&]:text-electric"
        />
      ))}
    </div>
  );
}
