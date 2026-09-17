export function ScoreBar({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`relative h-2 rounded-full bg-paper-200 overflow-hidden ${className}`} aria-hidden>
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-electric transition-[width] duration-300 ease-out"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
