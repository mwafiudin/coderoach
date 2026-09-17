'use client';

import { useEffect } from 'react';

/** Opens the print dialog; with `auto`, once on load after fonts are ready. */
export function PrintButton({ label, auto }: { label: string; auto: boolean }) {
  useEffect(() => {
    if (!auto) return;
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) window.print();
    });
    return () => {
      cancelled = true;
    };
  }, [auto]);

  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="h-11 px-5 rounded-md bg-electric text-paper text-[14px] font-semibold hover:bg-[#2562E0] transition-colors"
    >
      {label}
    </button>
  );
}
