'use client';

import { useEffect, useState } from 'react';

type Line = {
  prompt?: string;
  text: string;
  status?: 'pending' | 'ok' | 'info';
  delay: number; // ms after open before this line appears
};

const buildLines = (email: string, scope: string): Line[] => {
  const sessionId = `brf_${Math.random().toString(36).slice(2, 8)}`;
  return [
    { prompt: '$', text: 'init brief.session', status: 'info', delay: 0 },
    { text: `→ session=${sessionId} · env=production`, status: 'info', delay: 280 },
    { text: `→ scope=${scope || 'discovery'} · region=ap-se-1`, status: 'info', delay: 520 },
    { prompt: '$', text: `validate brief.email <${email || 'pending'}>`, status: 'info', delay: 820 },
    { text: '→ checking domain mx records...', status: 'info', delay: 1080 },
    { text: '✓ schema_ok · email_verified', status: 'ok', delay: 1340 },
    { prompt: '$', text: 'run sanitize.input', status: 'info', delay: 1620 },
    { text: '→ stripping pii · normalizing whitespace', status: 'info', delay: 1880 },
    { text: '✓ payload_clean (1.2kb)', status: 'ok', delay: 2160 },
    { prompt: '$', text: 'POST /api/submissions', status: 'info', delay: 2480 },
    { text: '↳ encrypting payload · aes-256-gcm', status: 'info', delay: 2780 },
    { text: '↳ routing to ops queue · senior tier', status: 'info', delay: 3060 },
    { text: '✓ 200 OK · brief delivered', status: 'ok', delay: 3340 },
    { text: '✓ senior team notified · est. reply in 48h', status: 'ok', delay: 3620 },
  ];
};

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
