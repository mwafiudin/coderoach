'use client';

import { useEffect } from 'react';

export const JUST_GATED_KEY = 'opsscore.justGated';

/**
 * The gate form is replaced by the report on refresh, so it cannot scroll by itself.
 * It leaves a flag; the freshly mounted report consumes it and scrolls into view.
 */
export function RevealReport({ sessionId }: { sessionId: string }) {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(JUST_GATED_KEY) !== sessionId) return;
      sessionStorage.removeItem(JUST_GATED_KEY);
    } catch {
      return;
    }
    document.getElementById('report')?.scrollIntoView({ behavior: 'smooth' });
  }, [sessionId]);
  return null;
}
