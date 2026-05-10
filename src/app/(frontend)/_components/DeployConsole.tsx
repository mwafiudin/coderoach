'use client';

import { useEffect, useState } from 'react';

type Line = {
  prompt?: string;
  text: string;
  status?: 'pending' | 'ok' | 'info';
  delay: number; // ms after open before this line appears
};

const buildLines = (email: string, scope: string): Line[] => [
  { prompt: '$', text: 'init brief.session', status: 'info', delay: 0 },
  { text: `→ env=production · scope=${scope || 'discovery'}`, status: 'info', delay: 220 },
  { prompt: '$', text: `validate brief.email <${email || 'pending'}>`, status: 'info', delay: 440 },
  { text: '✓ schema_ok', status: 'ok', delay: 700 },
  { prompt: '$', text: 'POST /api/submissions', status: 'info', delay: 950 },
  { text: '↳ encrypting payload · routing to ops queue', status: 'info', delay: 1200 },
  { text: '✓ 200 OK · brief delivered to senior team', status: 'ok', delay: 1500 },
];

export function DeployConsole({
  open,
  email,
  scope,
}: {
  open: boolean;
  email: string;
  scope: string;
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const lines = buildLines(email, scope);

  useEffect(() => {
    if (!open) {
      setVisibleCount(0);
      setElapsed(0);
      return;
    }
    const start = performance.now();
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((line, i) => {
      timeouts.push(setTimeout(() => setVisibleCount(i + 1), line.delay));
    });
    const tickr = setInterval(() => setElapsed(performance.now() - start), 60);
    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(tickr);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const elapsedSec = (elapsed / 1000).toFixed(2);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Mengirim brief"
      className="fixed inset-0 z-50 flex items-center justify-center px-6 animate-[fadeIn_180ms_ease-out]"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/55 backdrop-blur-md" />

      {/* Terminal card */}
      <div
        className="relative w-full max-w-[480px] bg-ink border border-shadow-700 rounded-xl shadow-[0_24px_60px_-20px_rgba(8,9,10,0.6)] overflow-hidden font-mono text-paper text-[13px] leading-[1.7] tabular animate-[scaleIn_220ms_ease-out]"
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-shadow-800 border-b border-shadow-700">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-mist-500 tabular">
            deploy_brief.sh
          </span>
          <span className="text-[10px] tabular text-mist-500">
            {elapsedSec}s
          </span>
        </div>

        {/* Output */}
        <div className="px-4 py-4 min-h-[200px]">
          {lines.slice(0, visibleCount).map((l, i) => {
            const isLatest = i === visibleCount - 1;
            const color =
              l.status === 'ok'
                ? 'text-[#5DD79A]'
                : l.status === 'info'
                  ? 'text-paper'
                  : 'text-mist-500';
            return (
              <div key={i} className={`${color} flex gap-2`}>
                {l.prompt && <span className="text-electric flex-shrink-0">{l.prompt}</span>}
                <span className="break-all">
                  {l.text}
                  {isLatest && (
                    <span
                      aria-hidden
                      className="inline-block w-[7px] h-[14px] -mb-[2px] ml-1 bg-electric align-middle animate-pulse"
                    />
                  )}
                </span>
              </div>
            );
          })}

          {/* Idle cursor while waiting between lines */}
          {visibleCount === 0 && (
            <div className="flex gap-2 text-mist-500">
              <span className="text-electric">$</span>
              <span
                aria-hidden
                className="inline-block w-[7px] h-[14px] mt-[3px] bg-electric animate-pulse"
              />
            </div>
          )}
        </div>

        {/* Footer status bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-shadow-700 bg-ink/80">
          <div className="flex items-center gap-2 text-[10px] tabular text-mist-500">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5DD79A] animate-pulse" />
            <span>streaming</span>
          </div>
          <span className="text-[10px] tabular text-mist-500">
            {visibleCount} / {lines.length} steps
          </span>
        </div>
      </div>
    </div>
  );
}
