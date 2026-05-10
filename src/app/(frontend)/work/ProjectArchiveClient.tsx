'use client';

import { useState, useMemo } from 'react';
import { ProjectCard } from '../_components/archive/ProjectCard';
import { FilterBar } from '../_components/archive/FilterBar';
import { Breadcrumbs } from '../_components/detail/Breadcrumbs';

type Project = {
  id: string | number;
  slug: string;
  kind: 'client' | 'studio';
  client: string;
  tagline: string;
  meta?: string | null;
  industry?: string | null;
  publishedYear?: string | null;
  pills?: Array<{ pill: string }> | null;
  excerpt?: string | null;
  coverImage?: any;
};

export function ProjectArchiveClient({ projects }: { projects: Project[] }) {
  const [kindFilter, setKindFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');

  // Build filter options dynamically based on data
  const kindOptions = useMemo(() => {
    const total = projects.length;
    const client = projects.filter((p) => p.kind === 'client').length;
    const studio = projects.filter((p) => p.kind === 'studio').length;
    return [
      { value: 'all', label: 'All', count: total },
      { value: 'client', label: 'Client cases', count: client },
      { value: 'studio', label: 'Studio products', count: studio },
    ];
  }, [projects]);

  const industryOptions = useMemo(() => {
    const counts = projects.reduce<Record<string, number>>((acc, p) => {
      const k = p.industry || 'other';
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {});
    const labels: Record<string, string> = {
      fb: 'F&B',
      logistics: 'Logistics',
      finance: 'Finance',
      agency: 'Agency',
      vc: 'VC',
      manufacturing: 'Manufacturing',
      other: 'Other',
    };
    return [
      { value: 'all', label: 'All industries' },
      ...Object.keys(counts)
        .sort()
        .map((k) => ({ value: k, label: labels[k] || k, count: counts[k] })),
    ];
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (kindFilter !== 'all' && p.kind !== kindFilter) return false;
      if (industryFilter !== 'all' && p.industry !== industryFilter) return false;
      return true;
    });
  }, [projects, kindFilter, industryFilter]);

  return (
    <main>
      {/* Hero — left-aligned (different from homepage centered) */}
      <section className="pt-16 pb-12 border-b border-paper-200">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="mb-8">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Work' }]} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-end mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-mist-600 inline-flex items-center gap-2 tabular">
                [ 02 / 06 ] <span className="text-mist-400">·</span> Work archive
              </span>
              <h1 className="text-[clamp(40px,5vw,72px)] leading-[1.02] tracking-[-0.025em] font-bold mt-5 max-w-[18ch] text-balance">
                40+ collaborations, six industries.
              </h1>
            </div>
            <p className="text-[18px] leading-[1.55] text-mist-600 max-w-[420px] lg:justify-self-end text-pretty">
              Setiap proyek live dengan pola yang sama: tim engineer senior, dokumentasi handoff
              yang lengkap, dan transfer ownership di akhir. Filter di bawah untuk menemukan proyek
              yang dekat dengan masalah Anda.
            </p>
          </div>

          {/* Filters — segmented control (primary) + chips (secondary) */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 pt-6 border-t border-paper-200">
            <FilterBar
              variant="segmented"
              label="Kategori"
              options={kindOptions}
              active={kindFilter}
              onChange={setKindFilter}
            />
            <div className="hidden lg:block w-px h-6 bg-paper-200" aria-hidden />
            <FilterBar
              variant="chips"
              label="Industri"
              options={industryOptions}
              active={industryFilter}
              onChange={setIndustryFilter}
            />
          </div>
        </div>
      </section>

      {/* Grid — magazine layout: feature first card, mix card sizes */}
      <section className="py-16">
        <div className="max-w-[1180px] mx-auto px-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger items-stretch" style={{ gridAutoFlow: 'dense' }}>
              {filtered.map((p, i) => {
                // Magazine pattern: index 0 = feature 2-col (lg), index 5 = wide 2-col, others default.
                const span = i === 0 ? 'md:col-span-2 lg:col-span-2' : i === 5 ? 'md:col-span-2 lg:col-span-2' : '';
                const variant = i === 0 ? 'feature' : i === 5 ? 'wide' : 'default';
                return (
                  <div key={p.id} className={`${span} h-full`}>
                    <ProjectCard project={p} variant={variant} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-32 text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600 mb-3 block">
                Empty
              </span>
              <p className="text-[24px] font-bold tracking-tight text-ink mb-2">
                No work matches that filter yet.
              </p>
              <p className="text-mist-600">
                Try a different filter or{' '}
                <a href="#contact" className="text-electric underline underline-offset-2">
                  start a conversation
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA — blueprint card (light mode mirror of /studio CTA) */}
      <section className="py-20 bg-paper-50 border-t border-paper-200">
        <div className="max-w-[1180px] mx-auto px-8">
          <div
            className="relative overflow-hidden rounded-2xl p-10 lg:p-14 bg-paper border border-paper-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_24px_-12px_rgba(8,9,10,0.08)] flex flex-col lg:flex-row lg:items-center justify-between gap-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(8,9,10,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(8,9,10,0.04) 1px, transparent 1px)
              `,
              backgroundSize: '36px 36px',
              backgroundPosition: '-1px -1px',
            }}
          >
            {/* Blueprint corner crosshairs */}
            <div aria-hidden className="absolute top-3 left-3 w-3 h-3 border-l border-t border-ink/15" />
            <div aria-hidden className="absolute top-3 right-3 w-3 h-3 border-r border-t border-ink/15" />
            <div aria-hidden className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-ink/15" />
            <div aria-hidden className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-ink/15" />

            <div className="relative max-w-[680px]">
              {/* Live status indicator */}
              <div className="inline-flex items-center gap-2 mb-5 font-mono text-[10px] uppercase tracking-[0.2em] tabular text-mist-600">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-[#5DD79A] animate-ping opacity-75" />
                  <span className="relative w-2 h-2 rounded-full bg-[#5DD79A]" />
                </span>
                <span>OPEN · ALL INDUSTRIES WELCOME</span>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600 block mb-3">
                Don't see your industry?
              </span>
              <p className="text-[clamp(28px,3.2vw,40px)] font-bold tracking-[-0.02em] leading-[1.15] text-ink text-balance m-0">
                Tell us what you're shipping.
              </p>
            </div>

            <a
              href="/#contact"
              className="relative h-12 px-5 rounded-md bg-electric text-paper text-sm font-semibold inline-flex items-center hover:bg-[#2562E0] active:scale-[0.98] transition-[background,transform] flex-shrink-0 shadow-[0_8px_24px_-8px_rgba(44,112,254,0.4)]"
            >
              Start a 48-hour discovery →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
