/**
 * OpsScore funnel events (brief §8). One name for GA4 and Meta Pixel; the gate submit goes to Meta
 * as the standard Lead event so ads can optimise for it. Calls are no-ops when an ID is not configured.
 */

export type TrackEvent =
  | 'assessment_view'
  | 'assessment_start'
  | 'assessment_area_done'
  | 'assessment_complete'
  | 'assessment_gate_submit'
  | 'assessment_pdf'
  | 'assessment_cta_brief';

type Params = Record<string, string | number | null | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(name: TrackEvent, params: Params = {}) {
  if (typeof window === 'undefined') return;
  const clean = Object.fromEntries(Object.entries(params).filter(([, value]) => value != null && value !== ''));
  window.gtag?.('event', name, clean);
  if (name === 'assessment_gate_submit') window.fbq?.('track', 'Lead', clean);
  else window.fbq?.('trackCustom', name, clean);
  if (process.env.NODE_ENV !== 'production') console.debug('[opsscore] track', name, clean);
}

/** Fires at most once per browser for `key`, e.g. one completion event per session. */
export function trackOnce(key: string, name: TrackEvent, params?: Params) {
  try {
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, '1');
  } catch {}
  track(name, params);
}
