type TopBarData = {
  enabled?: boolean | null;
  tag?: string | null;
  message?: string | null;
  link?: { label?: string | null; href?: string | null } | null;
};

export function TopBar({ data }: { data: TopBarData | null }) {
  if (!data?.enabled || !data.message) return null;
  return (
    <div className="bg-electric text-paper text-center font-mono text-xs font-medium tracking-wide py-3 px-6 relative z-[5] tabular">
      {data.tag && <span className="opacity-90">{data.tag}</span>}
      {data.tag && <span className="opacity-60 px-3">·</span>}
      <span>{data.message}</span>
      {data.link?.href && (
        <>
          <span className="opacity-60 px-3">·</span>
          <a href={data.link.href} className="font-semibold underline underline-offset-[3px]">
            {data.link.label}
          </a>
        </>
      )}
    </div>
  );
}
