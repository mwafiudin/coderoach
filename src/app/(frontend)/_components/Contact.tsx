'use client';

import { useEffect, useState } from 'react';

type ContactData = {
  sectionMarker?: string | null;
  heading?: { line1?: string | null; line2Accent?: string | null } | null;
  lede?: string | null;
  scopes?: Array<{ scope: string }> | null;
  formLabels?: {
    email?: string | null;
    scope?: string | null;
    brief?: string | null;
    submit?: string | null;
    emailFallback?: string | null;
  } | null;
  successHeading?: string | null;
};

const formatStamp = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${y}-${m}-${day} · ${hh}:${mm} WIB`;
};

export function Contact({ data }: { data: ContactData | null }) {
  const [email, setEmail] = useState('');
  const [brief, setBrief] = useState('');
  const [scope, setScope] = useState('');
  const [focused, setFocused] = useState<'email' | 'scope' | 'brief' | null>(null);
  const [sent, setSent] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const emailValid = /\S+@\S+\.\S+/.test(email);
  const completion =
    (emailValid ? 40 : 0) +
    (scope ? 20 : 0) +
    (brief.length >= 80 ? 40 : Math.floor((Math.min(brief.length, 80) / 80) * 40));

  return (
    <section
      id="contact"
      data-theme="dark"
      className="relative overflow-hidden pt-[120px] pb-24 isolate"
    >
      <div className="absolute inset-0 -z-[2] bg-ink pointer-events-none" />
      {/* Hero bg — atmospheric halftone image, anchored right */}
      <div
        className="absolute inset-0 -z-[1] bg-no-repeat pointer-events-none opacity-[0.28]"
        style={{
          backgroundImage: 'url(/assets/texture-halftone-dark.png)',
          backgroundPosition: 'right -4% center',
          backgroundSize: '85% auto',
        }}
      />
      {/* Vignette — radial darken so image stays atmospheric, not overwhelming */}
      <div
        aria-hidden
        className="absolute inset-0 -z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,9,10,0.55)_60%,rgba(8,9,10,0.95)_100%)]"
      />
      {/* Top fade — softens entry from FAQ section above */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-40 -z-[1] pointer-events-none bg-gradient-to-b from-ink to-transparent"
      />
      {/* Bottom fade — blends into solid ink before footer */}
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-0 h-56 -z-[1] pointer-events-none bg-gradient-to-b from-transparent to-ink"
      />

      <div className="max-w-[1180px] mx-auto px-8 relative z-[1] text-paper">
        <div className="max-w-[760px] mx-auto mb-16 text-center reveal">
          <span className="font-mono text-xs font-medium tracking-wider uppercase inline-flex items-center gap-2 flex-wrap text-mist-500 tabular justify-center">
            [ CONTACT ]
          </span>
          {data?.heading && (
            <h2 className="text-[clamp(48px,6vw,72px)] leading-[1.02] tracking-[-0.025em] font-bold mt-[18px] mb-6 text-balance">
              {data.heading.line1}
              <br />
              <span className="text-electric">{data.heading.line2Accent}</span>
            </h2>
          )}
          {data?.lede && (
            <p className="text-[17px] leading-[1.55] text-mist-500 m-0 mx-auto max-w-[620px] text-pretty">
              {data.lede}
            </p>
          )}
        </div>

        {sent ? (
          <SentState email={email} successHeading={data?.successHeading} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-start reveal">
            {/* Left — conversational prose form (with subtle electric rail for visual anchor) */}
            <form
              className="relative flex flex-col gap-9 lg:pl-8"
              onSubmit={(e) => {
                e.preventDefault();
                if (emailValid) setSent(true);
              }}
            >
              {/* Vertical accent rail */}
              <span
                aria-hidden
                className="hidden lg:block absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-electric/30 to-transparent"
              />
              {/* Brief — the main shipping ask */}
              <div className="flex flex-col gap-2">
                <label htmlFor="brief" className="text-[15px] leading-[1.6] text-mist-400 font-medium">
                  Hi <span className="text-paper">👋</span> — I'm shipping
                </label>
                <textarea
                  id="brief"
                  rows={3}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  onFocus={() => setFocused('brief')}
                  onBlur={() => setFocused(null)}
                  placeholder="a real-time fleet dispatch console for 3,000 drivers…"
                  className="block w-full text-[22px] leading-[1.4] bg-transparent border-0 border-b border-shadow-700 focus:border-electric outline-none resize-none transition-colors text-paper placeholder:text-mist-600 py-2 px-0 caret-electric font-medium tracking-[-0.01em]"
                />
              </div>

              {/* Scope — inline chips */}
              {data?.scopes && data.scopes.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  <span className="text-[15px] leading-[1.6] text-mist-400 font-medium">
                    Most likely it's a <span className="text-mist-600">…</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {data.scopes.map((s) => (
                      <button
                        key={s.scope}
                        type="button"
                        onClick={() => {
                          setScope(s.scope);
                          setFocused('scope');
                        }}
                        className={`h-[38px] px-4 rounded-full border font-mono text-xs font-medium tracking-wider uppercase cursor-pointer active:scale-[0.97] transition-[color,border-color,background,transform]
                          ${
                            scope === s.scope
                              ? 'text-electric border-electric bg-electric/[0.10]'
                              : 'text-mist-500 border-shadow-700 bg-transparent hover:text-paper hover:border-mist-600'
                          }`}
                      >
                        {s.scope}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Email — inline with prompt text */}
              <div className="flex items-baseline gap-3 flex-wrap">
                <label htmlFor="email" className="text-[15px] leading-[1.6] text-mist-400 font-medium shrink-0">
                  Reach me at
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="ops@yourcompany.id"
                  className="flex-1 min-w-[200px] text-[22px] leading-[1.3] bg-transparent border-0 border-b border-shadow-700 focus:border-electric outline-none transition-colors text-paper placeholder:text-mist-600 py-2 px-0 caret-electric font-medium tracking-[-0.01em]"
                />
              </div>

              {/* Submit */}
              <div className="flex items-center gap-4 flex-wrap pt-4">
                <button
                  type="submit"
                  disabled={!emailValid}
                  className="h-[52px] px-[22px] rounded-md bg-electric text-paper text-[15px] font-semibold inline-flex items-center hover:bg-[#2562E0] active:scale-[0.98] transition-[background,transform] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-electric"
                >
                  {data?.formLabels?.submit ?? 'Send the brief →'}
                </button>
                <span className="font-mono text-xs tracking-wide text-mist-600">
                  // or write to{' '}
                  <a
                    href={`mailto:${data?.formLabels?.emailFallback}`}
                    className="text-mist-400 border-b border-current pb-px hover:text-electric"
                  >
                    {data?.formLabels?.emailFallback}
                  </a>
                </span>
              </div>
            </form>

            {/* Right — live brief preview (operator console) */}
            <BriefPreview
              email={email}
              scope={scope}
              brief={brief}
              focused={focused}
              completion={completion}
              now={now}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function BriefPreview({
  email,
  scope,
  brief,
  focused,
  completion,
  now,
}: {
  email: string;
  scope: string;
  brief: string;
  focused: 'email' | 'scope' | 'brief' | null;
  completion: number;
  now: Date | null;
}) {
  const hasAny = email.length > 0 || scope.length > 0 || brief.length > 0;
  return (
    <div className="lg:sticky lg:top-24 relative">
      {/* Postal stamp at top-right corner — small detail giving the letter character */}
      <div
        aria-hidden
        className="absolute -top-3 right-6 z-[2] h-12 w-12 rounded-sm bg-electric text-paper flex items-center justify-center font-mono text-[10px] font-bold tracking-wider uppercase rotate-[6deg] shadow-[0_4px_12px_-4px_rgba(44,112,254,0.6)]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(244,247,245,0.06) 0 2px, transparent 2px 4px)',
        }}
      >
        DRAFT
      </div>

      {/* The letter — paper-light against the dark section */}
      <div className="relative bg-paper text-shadow-900 rounded-[3px] px-9 py-9 shadow-[0_30px_60px_-25px_rgba(8,9,10,0.7),0_8px_24px_-8px_rgba(8,9,10,0.5)] overflow-hidden">
        {/* Subtle paper grain — top edge soft shading */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-12 pointer-events-none bg-gradient-to-b from-shadow-900/[0.03] to-transparent"
        />

        {/* Letterhead */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" aria-hidden />
            <span className="text-shadow-700 text-[10px] tracking-[0.18em] uppercase font-semibold">
              Draft to coderoach studio
            </span>
          </div>
          <span className="text-shadow-700/60 text-[10px] tracking-wider tabular">
            {now ? formatStamp(now) : '—'}
          </span>
        </div>

        {/* Header — letterhead key/value */}
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[14px] mb-6">
          <LetterRow label="To" value="coderoach.studio" muted={false} />
          <LetterRow
            label="From"
            value={email || 'awaiting…'}
            muted={!email}
            active={focused === 'email'}
          />
          <LetterRow
            label="Re"
            value={scope || 'awaiting scope…'}
            muted={!scope}
            active={focused === 'scope'}
            accent={!!scope}
          />
        </dl>

        <div className="border-t border-shadow-200 mb-6" />

        {/* Letter body */}
        <div className="min-h-[180px] mb-7">
          {brief ? (
            <p className="text-shadow-900 text-[15.5px] leading-[1.65] whitespace-pre-wrap m-0 break-words">
              {brief}
              {focused === 'brief' && (
                <span
                  aria-hidden
                  className="inline-block w-[2px] h-[1.1em] bg-electric align-[-2px] ml-0.5 animate-pulse"
                />
              )}
            </p>
          ) : (
            <p className="text-mist-500 italic text-[15px] leading-[1.65] m-0">
              Your brief will appear here, written as the studio will read it.
            </p>
          )}
        </div>

        {/* Sign-off + status */}
        <div className="flex items-end justify-between gap-4 flex-wrap pt-5 border-t border-shadow-200">
          <div>
            <p className="text-shadow-700 text-[12px] m-0 mb-1 tracking-[0.04em]">
              — sent from <span className="text-shadow-900 font-medium">{email || '…'}</span>
            </p>
            <p className="text-mist-500 text-[10px] uppercase tracking-[0.18em] m-0">
              {hasAny ? 'reply within 24h' : 'awaiting input'}
            </p>
          </div>
          <div className="flex items-center gap-2.5 min-w-[140px]">
            <div className="relative flex-1 h-[3px] rounded-full bg-shadow-200 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-electric transition-[width] duration-300 ease-out"
                style={{ width: `${completion}%` }}
              />
            </div>
            <span className="text-shadow-700 text-[10px] tabular tracking-wider w-9 text-right">
              {completion}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LetterRow({
  label,
  value,
  muted,
  active,
  accent,
}: {
  label: string;
  value: string;
  muted: boolean;
  active?: boolean;
  accent?: boolean;
}) {
  return (
    <>
      <dt
        className={`text-[10px] uppercase tracking-[0.18em] font-semibold pt-1 transition-colors ${
          active ? 'text-electric' : 'text-shadow-700'
        }`}
      >
        {label}
      </dt>
      <dd
        className={`m-0 leading-[1.4] truncate ${
          muted
            ? 'text-mist-500 italic'
            : accent
            ? 'text-electric font-medium'
            : 'text-shadow-900 font-medium'
        }`}
      >
        {value}
      </dd>
    </>
  );
}

function SentState({ email, successHeading }: { email: string; successHeading?: string | null }) {
  return (
    <div className="max-w-[720px] mx-auto bg-shadow-900 border border-shadow-700 rounded-2xl p-10 text-center">
      <span className="h-6 px-2.5 rounded-full inline-flex items-center font-mono text-[11px] font-medium uppercase tracking-wider bg-success/[0.18] text-[#5DD79A] mb-4">
        [ 200 OK · RECEIVED ]
      </span>
      <h3 className="text-[32px] font-bold tracking-[-0.02em] my-4 text-paper">
        {successHeading}
      </h3>
      <p className="text-[15px] leading-[1.55] text-mist-500 m-0">
        Sent from <span className="text-paper font-mono text-sm">{email}</span>.<br />
        You'll hear back from a senior at the studio within 48 hours.
      </p>
    </div>
  );
}
