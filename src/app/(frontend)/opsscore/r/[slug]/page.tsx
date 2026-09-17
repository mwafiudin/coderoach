import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getPayload } from 'payload';
import config from '@payload-config';
import { SectionShell } from '../../../_components/detail/SectionShell';
import { SESSIONS } from '@/lib/opsscore/api';
import { SHARE_CTA_QUERY, ogImagePath, productPath } from '@/lib/opsscore/config';
import { PHASE_COPY, RESULT_COPY, SHARE_COPY } from '@/lib/opsscore/copy';
import type { Scores } from '@/lib/opsscore/scoring';
import { AreaScoreList } from '../../_components/AreaScoreList';
import { PhaseLadder } from '../../_components/PhaseLadder';

export const dynamic = 'force-dynamic';

const SLUG = /^[a-z2-9]{8}$/;

/** Public page: reads scores only. Contact details live in assessment-leads and are never touched here. */
const findSharedScores = cache(async (slug: string): Promise<Scores | null> => {
  if (!SLUG.test(slug)) return null;
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: SESSIONS,
    where: { shareSlug: { equals: slug } },
    select: { scores: true },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  return (docs[0]?.scores as Scores | undefined) ?? null;
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const scores = await findSharedScores(slug);
  if (!scores) return { robots: { index: false, follow: false } };
  const phase = PHASE_COPY[scores.phase];
  const title = SHARE_COPY.metaTitle(phase.title);
  const images = [{ url: ogImagePath(scores.phase), width: 1200, height: 630, alt: phase.title }];
  return {
    metadataBase: process.env.NEXT_PUBLIC_SERVER_URL ? new URL(process.env.NEXT_PUBLIC_SERVER_URL) : undefined,
    title,
    description: phase.key,
    alternates: { canonical: productPath(`/r/${slug}`) },
    openGraph: { title, description: phase.key, images },
    twitter: { card: 'summary_large_image', title, description: phase.key, images },
  };
}

export default async function SharedResultPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scores = await findSharedScores(slug);
  if (!scores) notFound();
  const phase = PHASE_COPY[scores.phase];

  return (
    <SectionShell>
      <main>
        <section className="relative overflow-hidden pt-12 lg:pt-16 pb-16 lg:pb-24">
          <div
            aria-hidden
            className="absolute inset-0 opacity-40 pointer-events-none bg-cover bg-center"
            style={{ backgroundImage: 'url(/assets/bg-grid-clean.png)' }}
          />
          <div className="relative max-w-[1180px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span className="font-mono text-xs font-medium tracking-wider text-mist-600 uppercase tabular">
                {SHARE_COPY.marker}
              </span>
              <p className="mt-8 mb-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600">
                {SHARE_COPY.scoreLabel}
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[104px] sm:text-[128px] font-bold leading-[0.9] tracking-[-0.045em] tabular">
                  {scores.total}
                </span>
                <span className="text-[18px] text-mist-600 tabular">{RESULT_COPY.outOf}</span>
              </div>
              <p className="mt-8 mb-0 font-mono text-xs uppercase tracking-wider text-electric tabular">
                {RESULT_COPY.phaseOf(scores.phase)}
              </p>
              <h1 className="text-[clamp(36px,5vw,56px)] leading-[1.02] tracking-[-0.025em] font-bold mt-2 mb-0">
                {phase.title}
              </h1>
              <p className="mt-4 mb-0 text-[18px] leading-[1.55] text-mist-600 max-w-[520px] text-pretty">{phase.key}</p>
              <PhaseLadder phase={scores.phase} className="mt-8 max-w-[520px]" />
              <div className="mt-10 flex flex-col gap-3">
                <a
                  href={productPath(SHARE_CTA_QUERY)}
                  className="self-start h-[52px] px-[22px] rounded-md bg-electric text-paper text-[15px] font-semibold inline-flex items-center gap-2 hover:bg-[#2562E0] transition-colors"
                >
                  {SHARE_COPY.cta}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
                <span className="text-[13px] text-mist-600">{SHARE_COPY.ctaNote}</span>
              </div>
            </div>
            <div className="lg:pt-14">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600 m-0">
                {RESULT_COPY.areasTitle}
              </h2>
              <AreaScoreList areas={scores.areas} className="mt-6" />
            </div>
          </div>
        </section>
      </main>
    </SectionShell>
  );
}
