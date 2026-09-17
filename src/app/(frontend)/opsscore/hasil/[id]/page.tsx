import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import config from '@payload-config';
import { SectionShell } from '../../../_components/detail/SectionShell';
import { AnimatedCount } from '../../../_components/ui/AnimatedCount';
import { LEADS, findSession } from '@/lib/opsscore/api';
import { productPath } from '@/lib/opsscore/config';
import { GATE_COPY, PHASE_COPY, RESULT_COPY } from '@/lib/opsscore/copy';
import type { Scores } from '@/lib/opsscore/scoring';
import { AreaScoreList } from '../../_components/AreaScoreList';
import { GateForm } from '../../_components/GateForm';
import { PhaseLadder } from '../../_components/PhaseLadder';
import { Report } from '../../_components/Report';
import { CompleteTracker } from '../../_components/Trackers';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: RESULT_COPY.metaTitle,
  robots: { index: false, follow: false },
};

export default async function OpsScoreResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = await getPayload({ config });
  const session = await findSession(payload, id);
  if (!session) notFound();

  if (session.status === 'started' || !session.scores) {
    return (
      <SectionShell>
        <main className="min-h-[60vh] grid place-items-center py-20">
          <div className="max-w-[640px] mx-auto px-8 text-center">
            <span className="font-mono text-xs uppercase tracking-wider text-mist-600 tabular">{RESULT_COPY.marker}</span>
            <h1 className="text-[clamp(36px,5vw,56px)] font-bold tracking-[-0.025em] leading-[1.05] mt-4 mb-4">
              {RESULT_COPY.incompleteTitle}
            </h1>
            <p className="text-[18px] leading-[1.55] text-mist-600 mb-8">{RESULT_COPY.incompleteBody}</p>
            <a
              href={productPath('/mulai')}
              className="h-[52px] px-[22px] rounded-md bg-electric text-paper text-[15px] font-semibold inline-flex items-center hover:bg-[#2562E0] transition-colors"
            >
              {RESULT_COPY.continueQuiz}
            </a>
          </div>
        </main>
      </SectionShell>
    );
  }

  const scores = session.scores as Scores;
  const phase = PHASE_COPY[scores.phase];
  const { docs } = await payload.find({
    collection: LEADS,
    where: { session: { equals: session.id } },
    select: { brand: true, revenueBand: true },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const lead = docs[0];

  return (
    <SectionShell>
      <CompleteTracker sessionId={session.id} phase={scores.phase} total={scores.total} />
      <main>
        <section className="relative overflow-hidden pt-12 lg:pt-16 pb-14 lg:pb-20 border-b border-paper-200">
          <div
            aria-hidden
            className="absolute inset-0 opacity-40 pointer-events-none bg-cover bg-center"
            style={{ backgroundImage: 'url(/assets/bg-grid-clean.png)' }}
          />
          <div className="relative max-w-[1180px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span className="font-mono text-xs font-medium tracking-wider text-mist-600 uppercase tabular">
                {RESULT_COPY.marker}
              </span>
              <p className="mt-8 mb-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600">
                {RESULT_COPY.scoreLabelFor(lead?.brand)}
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[104px] sm:text-[128px] font-bold leading-[0.9] tracking-[-0.045em] tabular">
                  <AnimatedCount value={String(scores.total)} duration={900} />
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
              <PhaseLadder phase={scores.phase} className="mt-8 max-w-[520px]" animate />
            </div>
            <div className="lg:pt-14">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600 m-0">
                {RESULT_COPY.areasTitle}
              </h2>
              <AreaScoreList areas={scores.areas} className="mt-6" animate />
              {scores.areas.stock === undefined && (
                <p className="mt-5 mb-0 text-[13px] leading-[1.5] text-mist-600">{RESULT_COPY.stockSkipped}</p>
              )}
            </div>
          </div>
        </section>

        {session.status === 'gated' ? (
          <Report sessionId={session.id} shareSlug={session.shareSlug} scores={scores} />
        ) : (
          <section className="py-16 lg:py-24 bg-paper-50 border-b border-paper-200">
            <div className="max-w-[1180px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-20">
              <div>
                <span className="font-mono text-xs font-medium tracking-wider text-mist-600 uppercase tabular">
                  {GATE_COPY.marker}
                </span>
                <h2 className="text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-[-0.025em] font-bold mt-4 mb-0">
                  {GATE_COPY.title}
                </h2>
                <p className="mt-4 mb-0 text-[17px] leading-[1.55] text-mist-600 max-w-[460px] text-pretty">
                  {GATE_COPY.intro}
                </p>
              </div>
              <GateForm sessionId={session.id} phase={scores.phase} revenueBand={lead?.revenueBand} />
            </div>
          </section>
        )}
      </main>
    </SectionShell>
  );
}
