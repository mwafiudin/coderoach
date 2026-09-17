import type { CSSProperties } from 'react';

/** `animate` fills the bar from the left on mount; `index` staggers bars in a list. */
export function ScoreBar({
  value,
  className = '',
  animate = false,
  index = 0,
  tone = 'light',
}: {
  value: number;
  className?: string;
  animate?: boolean;
  index?: number;
  tone?: 'light' | 'dark';
}) {
  return (
    <div
      className={`relative h-2 rounded-full overflow-hidden ${tone === 'dark' ? 'bg-shadow-700' : 'bg-paper-200'} ${className}`}
      aria-hidden
    >
      <div
        className={`absolute inset-y-0 left-0 rounded-full bg-electric ${animate ? 'ops-bar-fill' : ''}`}
        style={{ width: `${Math.max(0, Math.min(100, value))}%`, '--ops-i': index } as CSSProperties}
      />
    </div>
  );
}
