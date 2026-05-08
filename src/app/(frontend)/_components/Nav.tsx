'use client';
import { useState } from 'react';

type NavData = {
  navStatus?: { label?: string | null } | null;
  navCta?: { label?: string | null; href?: string | null } | null;
};

export function Nav({ data }: { data: NavData | null }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="sticky top-0 z-10 bg-paper-100/85 backdrop-blur-md border-b border-paper-200">
      <div className="max-w-[1180px] mx-auto px-8 h-[72px] flex items-center justify-between gap-8">
        <a href="/" aria-label="Coderoach Studio — home" className="flex items-center gap-[10px]">
          <img src="/assets/coderoach_logo.svg" alt="" className="h-8 w-auto" />
          <span className="flex flex-col leading-none tracking-[-0.02em] gap-[2px] text-ink">
            <span className="font-sans text-[14px] font-semibold">coderoach</span>
            <span className="font-sans text-[14px] font-normal">studio</span>
          </span>
        </a>
        <div className={`flex gap-7 items-center ${open ? '' : 'max-md:hidden'}`}>
          <a href="/#services" className="text-sm font-medium hover:text-electric">Services</a>
          <a href="/work" className="text-sm font-medium hover:text-electric">Work</a>
          <a href="/#process" className="text-sm font-medium hover:text-electric">Process</a>
          <a href="/studio" className="text-sm font-medium hover:text-electric">Studio</a>
          <a href="/notes" className="text-sm font-medium hover:text-electric">Notes</a>
          <a href="/#faq" className="text-sm font-medium hover:text-electric">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          {data?.navCta?.href && (
            <a
              href={data.navCta.href}
              className="h-9 px-3.5 rounded-md bg-electric text-paper text-[13px] font-semibold inline-flex items-center justify-center hover:bg-[#2562E0] transition-colors"
            >
              {data.navCta.label}
            </a>
          )}
          <button
            className="md:hidden flex flex-col gap-1 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span className="w-5 h-0.5 bg-ink" />
            <span className="w-5 h-0.5 bg-ink" />
            <span className="w-5 h-0.5 bg-ink" />
          </button>
        </div>
      </div>
    </div>
  );
}
