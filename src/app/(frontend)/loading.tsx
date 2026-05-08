import { OctagonMark } from './_components/ui/OctagonMark';

export default function Loading() {
  return (
    <div className="min-h-screen grid place-items-center bg-paper-100">
      <div className="flex flex-col items-center gap-3">
        <span className="text-electric animate-octagon-spin">
          <OctagonMark size={28} />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600">
          Loading
        </span>
      </div>
    </div>
  );
}
