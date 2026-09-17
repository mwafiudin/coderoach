'use client';

import { useState } from 'react';
import { ADMIN_COPY } from '@/lib/opsscore/copy';

/** Follow-up status, saved straight from the table row through Payload's REST API. */
export function OpsScoreStatus({ id, value, apiRoute = '/api' }: { id: number; value: string; apiRoute?: string }) {
  const [status, setStatus] = useState(value);
  const [state, setState] = useState<'idle' | 'saving' | 'error'>('idle');

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const previous = status;
    const next = e.target.value;
    setStatus(next);
    setState('saving');
    try {
      const res = await fetch(`${apiRoute}/assessment-leads/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ followupStatus: next }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('idle');
    } catch {
      setStatus(previous);
      setState('error');
    }
  };

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <select
        value={status}
        onChange={onChange}
        disabled={state === 'saving'}
        aria-label={ADMIN_COPY.columns.status}
        style={{
          font: 'inherit',
          padding: '4px 6px',
          borderRadius: 4,
          border: '1px solid var(--theme-elevation-150, #ddd)',
          background: 'var(--theme-input-bg, var(--theme-elevation-0, #fff))',
          color: 'var(--theme-text, inherit)',
        }}
      >
        {Object.entries(ADMIN_COPY.followup).map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </select>
      {state === 'saving' && <small style={{ opacity: 0.7 }}>{ADMIN_COPY.statusSaving}</small>}
      {state === 'error' && <small style={{ color: 'var(--theme-error-500, #c13439)' }}>{ADMIN_COPY.statusError}</small>}
    </span>
  );
}
