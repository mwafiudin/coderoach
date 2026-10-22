/**
 * Counts for the /work filters. Each facet is counted within the other one, so a number on a
 * chip is always how many projects you get by clicking it. Counted over the whole catalog, a
 * chip could promise "1" and land on an empty list.
 */
export type Faceted = { pillar: string; industry: string };
export type FacetFilters = { pilar: string; bidang: string };

export function matches(p: Faceted, f: FacetFilters) {
  return (!f.pilar || p.pillar === f.pilar) && (!f.bidang || p.industry === f.bidang);
}

export function facetCounts(projects: Faceted[], f: FacetFilters) {
  const pillar = new Map<string, number>();
  const industry = new Map<string, number>();
  for (const p of projects) {
    if (!pillar.has(p.pillar)) pillar.set(p.pillar, 0);
    if (!industry.has(p.industry)) industry.set(p.industry, 0);
    if (matches(p, { ...f, pilar: '' })) pillar.set(p.pillar, (pillar.get(p.pillar) ?? 0) + 1);
    if (matches(p, { ...f, bidang: '' })) industry.set(p.industry, (industry.get(p.industry) ?? 0) + 1);
  }
  pillar.delete(''); // a project without a service still counts under "Semua", but gets no chip
  return {
    pillar,
    industry,
    allPillars: projects.filter((p) => matches(p, { ...f, pilar: '' })).length,
    allIndustries: projects.filter((p) => matches(p, { ...f, bidang: '' })).length,
  };
}
