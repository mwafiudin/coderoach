type Props = {
  marker: string;
  category: string;
  /** @deprecated description removed from homepage section markers per design */
  description?: string;
  heading: string;
  lede?: string;
  className?: string;
};

export function SectionHead({ marker, category, heading, lede, className = '' }: Props) {
  return (
    <div className={`reveal-stagger ${className}`}>
      <span className="font-mono text-xs font-medium tracking-wider text-mist-600 uppercase inline-flex items-center gap-2 flex-wrap tabular">
        {marker} <span className="text-mist-400">·</span> {category}
      </span>
      <h2 className="text-[clamp(40px,5vw,64px)] leading-none tracking-[-0.02em] font-bold mt-[18px] max-w-[880px]">
        {heading}
      </h2>
      {lede && (
        <p className="mt-6 text-[18px] leading-[1.5] text-mist-600 max-w-[620px]">{lede}</p>
      )}
    </div>
  );
}
