'use client';

import { useState } from 'react';

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

export function Contact({ data }: { data: ContactData | null }) {
  const [email, setEmail] = useState('');
  const [brief, setBrief] = useState('');
  const [scope, setScope] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" data-theme="dark" className="relative overflow-hidden py-[120px] isolate">
      <div className="absolute inset-0 -z-[2] bg-ink pointer-events-none" />
      <div
        className="absolute inset-0 -z-[1] bg-cover opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/texture-halftone-blue-dot.png)',
          backgroundPosition: 'right center',
        }}
      />
      <div className="max-w-[1180px] mx-auto px-8 relative z-[1] text-paper">
        <div className="max-w-[720px] mx-auto mb-12 text-center reveal">
          <span className="font-mono text-xs font-medium tracking-wider uppercase inline-flex items-center gap-2 flex-wrap text-mist-500 justify-center tabular">
            [ // CONTACT ] <span className="text-mist-400">·</span>{' '}
            <span className="text-electric">{data?.sectionMarker}</span>
          </span>
          {data?.heading && (
            <h2 className="text-[clamp(48px,6vw,72px)] leading-[1.02] tracking-[-0.025em] font-bold mt-[18px] mb-6 text-balance">
              {data.heading.line1}
              <br />
              <span className="text-electric">{data.heading.line2Accent}</span>
            </h2>
          )}
          {data?.lede && (
            <p className="text-[17px] leading-[1.55] text-mist-500 m-0 text-pretty">{data.lede}</p>
          )}
        </div>

        <div className="max-w-[720px] mx-auto bg-shadow-900 border border-shadow-700 rounded-2xl p-10 reveal">
          {sent ? (
            <div className="text-center py-6">
              <span className="h-6 px-2.5 rounded-full inline-flex items-center font-mono text-[11px] font-medium uppercase tracking-wider bg-success/[0.18] text-[#5DD79A] mb-4">
                [ 200 OK · RECEIVED ]
              </span>
              <h3 className="text-[32px] font-bold tracking-[-0.02em] my-4 text-paper">{data?.successHeading}</h3>
              <p className="text-[15px] leading-[1.55] text-mist-500 m-0">
                Sent from <span className="text-paper font-mono text-sm">{email}</span>.<br />
                You'll hear back from a senior at the studio within 48 hours.
              </p>
            </div>
          ) : (
            <form
              className="flex flex-col gap-[22px]"
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSent(true);
              }}
            >
              <div className="flex flex-col gap-2.5">
                <label className="font-mono text-[11px] font-medium tracking-wider text-mist-500 uppercase">
                  {data?.formLabels?.email}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ops@yourcompany.id"
                  className="h-[52px] px-[18px] rounded-md border border-shadow-700 bg-ink-950 text-paper text-base placeholder:text-mist-600 focus:border-electric focus:ring-2 focus:ring-electric/[0.20] focus:outline-none transition-colors"
                />
              </div>

              {data?.scopes && data.scopes.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  <label className="font-mono text-[11px] font-medium tracking-wider text-mist-500 uppercase">
                    {data.formLabels?.scope}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {data.scopes.map((s) => (
                      <button
                        key={s.scope}
                        type="button"
                        onClick={() => setScope(s.scope)}
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

              <div className="flex flex-col gap-2.5">
                <label className="font-mono text-[11px] font-medium tracking-wider text-mist-500 uppercase">
                  {data?.formLabels?.brief}
                </label>
                <textarea
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="A one-paragraph brief is enough. What's the problem, who feels it, and what does shipped look like?"
                  className="min-h-[120px] px-[18px] py-3.5 rounded-md border border-shadow-700 bg-ink-950 text-paper text-base placeholder:text-mist-600 focus:border-electric focus:ring-2 focus:ring-electric/[0.20] focus:outline-none transition-colors resize-y leading-[1.5]"
                />
              </div>

              <div className="flex items-center gap-4 flex-wrap mt-2 pt-[22px] border-t border-shadow-700">
                <button
                  type="submit"
                  className="h-[52px] px-[22px] rounded-md bg-electric text-paper text-[15px] font-semibold inline-flex items-center hover:bg-[#2562E0] active:scale-[0.98] transition-[background,transform]"
                >
                  {data?.formLabels?.submit}
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
          )}
        </div>
      </div>
    </section>
  );
}
