'use client';

import { useEffect } from 'react';
import { captureAttribution } from '@/lib/opsscore/attribution';
import { track, trackOnce, type TrackEvent } from '@/lib/opsscore/track';

/** Landing: store attribution for the session to pick up, then record the view. */
export function LandingTracker() {
  useEffect(() => {
    const { utm_source, utm_medium, utm_campaign } = captureAttribution();
    track('assessment_view', { utm_source, utm_medium, utm_campaign });
  }, []);
  return null;
}

/** Results: one completion event per session, not per reload. */
export function CompleteTracker({ sessionId, phase, total }: { sessionId: string; phase: number; total: number }) {
  useEffect(() => {
    trackOnce(`opsscore.tracked.complete.${sessionId}`, 'assessment_complete', { fase: phase, total });
  }, [sessionId, phase, total]);
  return null;
}

/** A plain link that records an event on click. */
export function TrackedLink({
  event,
  params,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: TrackEvent;
  params: Record<string, string | number>;
}) {
  return <a {...props} onClick={() => track(event, params)} />;
}
