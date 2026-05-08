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
                Forty engagements, six industries.
              </h1>
            </div>
            <p className="text-[18px] leading-[1.55] text-mist-600 max-w-[420px] lg:justify-self-end text-pretty">
              Each one ships with the same shape: a small senior team, no juniors hidden in bios, full handoff docs.
              Filter to find work close to your problem.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 pt-6 border-t border-paper-200">
            <FilterBar
              label="Kind"
              options={kindOptions}
              active={kindFilter}
              onChange={setKindFilter}
            />
            <FilterBar
              label="Industry"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger" style={{ gridAutoFlow: 'dense' }}>
              {filtered.map((p, i) => {
                // Magazine pattern: index 0 = feature 2-col (lg), index 5 = wide 2-col, others default.
                const span = i === 0 ? 'md:col-span-2 lg:col-span-2' : i === 5 ? 'md:col-span-2 lg:col-span-2' : '';
                const variant = i === 0 ? 'feature' : i === 5 ? 'wide' : 'default';
                return (
                  <div key={p.id} className={span}>
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

      {/* Footer CTA strip */}
      <section className="py-20 bg-paper-50 border-t border-paper-200">
        <div className="max-w-[1180px] mx-auto px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600">
              Don't see your industry?
            </span>
            <p className="text-[24px] font-bold tracking-[-0.015em] mt-2">
              Tell us what you're shipping.
            </p>
          </div>
          <a
            href="/#contact"
            className="h-12 px-5 rounded-md bg-electric text-paper text-sm font-semibold inline-flex items-center hover:bg-[#2562E0] transition-colors"
          >
            Start a 48-hour discovery →
          </a>
        </div>
      </section>
    </main>
  );
}
