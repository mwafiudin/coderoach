'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/lib/icons';
import { captureAttribution } from '@/lib/opsscore/attribution';
import { INSTRUMENT_VERSION, productPath } from '@/lib/opsscore/config';
import { AREA_FEEDBACK, QUIZ_COPY } from '@/lib/opsscore/copy';
import { buildSteps, progressAreas, stepKey, type Step } from '@/lib/opsscore/flow';
import { AREA_LABELS, QUESTION_BY_ID, type AreaId, type Question } from '@/lib/opsscore/questions';
import { areaScore, bandFor, isAnswered, sanitizeAnswers, type Answers } from '@/lib/opsscore/scoring';
import { track } from '@/lib/opsscore/track';
import { ScoreBar } from './ScoreBar';

const STORAGE_KEY = `opsscore.quiz.v${INSTRUMENT_VERSION}`;
const LAST_RESULT_KEY = 'opsscore.lastResult';
const ADVANCE_DELAY_MS = 250;

type Screen = 'loading' | 'intro' | 'resume' | 'step' | 'finishing' | 'error';
type Saved = { sessionId: string | null; answers: Answers; step: string };

// localStorage can throw (private mode, blocked storage); the quiz still works without it.
function readStorage<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
function writeStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
function removeStorage(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {}
}

const JSON_HEADERS = { 'Content-Type': 'application/json' };

async function createSession(): Promise<string | null> {
  const referrer = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : undefined;
  try {
    const res = await fetch('/api/opsscore/sessions', {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify({ attribution: { referrer } }),
    });
    const body = await res.json().catch(() => ({}));
    return res.ok && body.ok ? (body.id as string) : null;
  } catch {
    return null;
  }
}

const areaOfKey = (key: string): AreaId | null => {
  const [kind, id = ''] = key.split(':');
  if (kind === 'f') return Object.prototype.hasOwnProperty.call(AREA_LABELS, id) ? (id as AreaId) : null;
  return Object.prototype.hasOwnProperty.call(QUESTION_BY_ID, id) ? QUESTION_BY_ID[id].area : null;
};

export function Quiz() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>('loading');
  const [answers, setAnswers] = useState<Answers>({});
  const [current, setCurrent] = useState('');
  const [direction, setDirection] = useState<1 | -1>(1);
  const [lastResult, setLastResult] = useState<string | null>(null);

  // Refs for timers and async calls that must see the latest values.
  const answersRef = useRef(answers);
  const currentRef = useRef(current);
  const sessionIdRef = useRef<string | null>(null);
  const sessionPromise = useRef<Promise<string | null> | null>(null);
  const advanceTimer = useRef<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  const steps = useMemo(() => buildSteps(answers), [answers]);
  const index = steps.findIndex((s) => stepKey(s) === current);
  const step: Step | undefined = steps[index];
  const areas = useMemo(() => progressAreas(answers), [answers]);

  // Restore saved progress once. Ads may link here directly, so attribution is captured here too.
  useEffect(() => {
    captureAttribution();
    const saved = readStorage<Saved>(STORAGE_KEY);
    setLastResult(readStorage<string>(LAST_RESULT_KEY));
    const savedAnswers = sanitizeAnswers(saved?.answers);
    if (saved && Object.keys(savedAnswers).length > 0) {
      sessionIdRef.current = saved.sessionId;
      setAnswers(savedAnswers);
      setCurrent(saved.step);
      setScreen('resume');
    } else {
      setScreen('intro');
    }
  }, []);

  // Autosave every change while answering.
  useEffect(() => {
    if (screen !== 'step') return;
    writeStorage(STORAGE_KEY, { sessionId: sessionIdRef.current, answers, step: current } satisfies Saved);
  }, [screen, answers, current]);

  // Slide the new screen in; skipped for reduced motion. Focus the heading for screen readers.
  useEffect(() => {
    const panel = panelRef.current;
    if (panel && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      panel.animate(
        [
          { opacity: 0, transform: `translateX(${direction * 16}px)` },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 220, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      );
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [current, screen, direction]);

  useEffect(() => () => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
  }, []);

  const ensureSession = useCallback((): Promise<string | null> => {
    if (sessionIdRef.current) return Promise.resolve(sessionIdRef.current);
    if (!sessionPromise.current) {
      sessionPromise.current = createSession().then((id) => {
        sessionIdRef.current = id;
        if (!id) sessionPromise.current = null;
        return id;
      });
    }
    return sessionPromise.current;
  }, []);

  const syncAnswers = useCallback(async () => {
    const id = await ensureSession();
    if (!id) return;
    fetch(`/api/opsscore/sessions/${id}`, {
      method: 'PUT',
      headers: JSON_HEADERS,
      body: JSON.stringify({ answers: answersRef.current }),
      keepalive: true,
    }).catch(() => {});
  }, [ensureSession]);

  const finish = useCallback(async () => {
    setScreen('finishing');
    const id = await ensureSession();
    if (id) {
      try {
        const res = await fetch(`/api/opsscore/sessions/${id}/complete`, {
          method: 'POST',
          headers: JSON_HEADERS,
          body: JSON.stringify({ answers: answersRef.current }),
        });
        const body = await res.json().catch(() => ({}));
        if (res.ok && body.ok) {
          removeStorage(STORAGE_KEY);
          writeStorage(LAST_RESULT_KEY, id);
          router.push(productPath(`/hasil/${id}`));
          return;
        }
        if (res.status === 422 && Array.isArray(body.missing) && body.missing.length) {
          setDirection(-1);
          setCurrent(`q:${body.missing[0]}`);
          setScreen('step');
          return;
        }
        if (res.status === 404) {
          // Session is gone (e.g. cleaned up); the retry starts a new one with the same answers.
          sessionIdRef.current = null;
          sessionPromise.current = null;
        }
      } catch {}
    }
    setScreen('error');
  }, [ensureSession, router]);

  const goNext = useCallback(() => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    const list = buildSteps(answersRef.current);
    const i = list.findIndex((s) => stepKey(s) === currentRef.current);
    const here = list[i];
    if (!here) return;
    if (here.kind === 'question' && !isAnswered(QUESTION_BY_ID[here.id], answersRef.current[here.id])) return;
    const next = list[i + 1];
    if (!next) {
      void finish();
      return;
    }
    if (next.kind === 'feedback') {
      void syncAnswers();
      const areaIndex = progressAreas(answersRef.current).findIndex((a) => a.id === next.area) + 1;
      track('assessment_area_done', { area: next.area, index: areaIndex });
    }
    setDirection(1);
    setCurrent(stepKey(next));
  }, [finish, syncAnswers]);

  const goBack = useCallback(() => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    const list = buildSteps(answersRef.current);
    const i = list.findIndex((s) => stepKey(s) === currentRef.current);
    for (let j = i - 1; j >= 0; j--) {
      if (list[j].kind === 'question') {
        setDirection(-1);
        setCurrent(stepKey(list[j]));
        return;
      }
    }
    setDirection(-1);
    setScreen('intro');
  }, []);

  const select = useCallback(
    (q: Question, optionId: string) => {
      if (q.type === 'multi') {
        setAnswers((prev) => {
          const picked = Array.isArray(prev[q.id]) ? (prev[q.id] as string[]) : [];
          let next: string[];
          if (picked.includes(optionId)) next = picked.filter((id) => id !== optionId);
          else if (q.exclusive?.includes(optionId)) next = [optionId];
          else next = [...picked.filter((id) => !q.exclusive?.includes(id)), optionId];
          const updated = { ...prev };
          if (next.length) updated[q.id] = next;
          else delete updated[q.id];
          return updated;
        });
        return;
      }
      const updated = { ...answersRef.current, [q.id]: optionId };
      answersRef.current = updated;
      setAnswers(updated);
      if (q.type === 'volume') return;
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
      advanceTimer.current = window.setTimeout(goNext, ADVANCE_DELAY_MS);
    },
    [goNext],
  );

  const start = useCallback(() => {
    removeStorage(STORAGE_KEY);
    sessionIdRef.current = null;
    sessionPromise.current = null;
    answersRef.current = {};
    setAnswers({});
    setDirection(1);
    setCurrent(stepKey(buildSteps({})[0]));
    setScreen('step');
    void ensureSession().then((id) => track('assessment_start', { session_id: id }));
  }, [ensureSession]);

  // Intro after "Kembali" on the first question: keep what was already answered.
  const begin = useCallback(() => {
    if (Object.keys(answersRef.current).length === 0) {
      start();
      return;
    }
    setDirection(1);
    setCurrent(stepKey(buildSteps(answersRef.current)[0]));
    setScreen('step');
  }, [start]);

  const resume = useCallback(() => {
    const list = buildSteps(answersRef.current);
    const valid = list.some((s) => stepKey(s) === currentRef.current);
    if (!valid) {
      const firstOpen = list.find(
        (s) => s.kind === 'question' && !isAnswered(QUESTION_BY_ID[s.id], answersRef.current[s.id]),
      );
      setCurrent(stepKey(firstOpen ?? list[0]));
    }
    setDirection(1);
    setScreen('step');
  }, []);

  // Keyboard: 1–9 picks an option, Enter continues, Esc goes back.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (screen !== 'step' || !step || e.metaKey || e.ctrlKey || e.altKey) return;
      if ((e.target as HTMLElement | null)?.closest('input, textarea, select')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        goBack();
        return;
      }
      if (step.kind === 'feedback') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goNext();
        }
        return;
      }
      const q = QUESTION_BY_ID[step.id];
      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= q.options.length) {
        e.preventDefault();
        select(q, q.options[n - 1].id);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [screen, step, goBack, goNext, select]);

  const activeArea = step ? step.area : screen === 'finishing' ? areas[areas.length - 1]?.id : null;
  const activeIndex = activeArea ? areas.findIndex((a) => a.id === activeArea) : -1;
  const showProgress = (screen === 'step' || screen === 'finishing') && activeIndex >= 0;

  let content: React.ReactNode = null;
  if (screen === 'intro') {
    content = (
      <div className="flex-1 flex flex-col justify-center py-6">
        <span className="font-mono text-xs font-medium tracking-wider text-mist-600 uppercase tabular">
          {QUIZ_COPY.introMarker}
        </span>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-5 text-[30px] sm:text-[44px] leading-[1.08] tracking-[-0.025em] font-bold text-balance outline-none"
        >
          {QUIZ_COPY.instruction}
        </h1>
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <PrimaryButton onClick={begin}>{QUIZ_COPY.start}</PrimaryButton>
          {lastResult && (
            <a
              href={productPath(`/hasil/${lastResult}`)}
              className="h-[52px] px-[22px] rounded-md bg-transparent text-ink border border-mist-400 text-[15px] font-semibold inline-flex items-center justify-center hover:bg-ink/[0.04] transition-colors"
            >
              {QUIZ_COPY.lastResult}
            </a>
          )}
        </div>
      </div>
    );
  } else if (screen === 'resume') {
    const area = areaOfKey(current);
    content = (
      <div className="flex-1 flex flex-col justify-center py-6">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-[30px] sm:text-[44px] leading-[1.08] tracking-[-0.025em] font-bold text-balance outline-none"
        >
          {QUIZ_COPY.resumeTitle}
        </h1>
        <p className="mt-4 text-[17px] leading-[1.55] text-mist-600">{QUIZ_COPY.resumeBody}</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <PrimaryButton onClick={resume}>
            {QUIZ_COPY.resume(AREA_LABELS[area ?? 'sales'])}
          </PrimaryButton>
          <button
            type="button"
            onClick={start}
            className="h-[52px] px-[22px] rounded-md bg-transparent text-ink border border-mist-400 text-[15px] font-semibold inline-flex items-center justify-center hover:bg-ink/[0.04] transition-colors"
          >
            {QUIZ_COPY.restart}
          </button>
        </div>
      </div>
    );
  } else if (screen === 'step' && step?.kind === 'question') {
    const q = QUESTION_BY_ID[step.id];
    const inArea = steps.filter((s) => s.kind === 'question' && s.area === step.area);
    const position = inArea.findIndex((s) => stepKey(s) === current) + 1;
    content = (
      <QuestionScreen
        question={q}
        answer={answers[q.id]}
        marker={`${AREA_LABELS[q.area]} · ${QUIZ_COPY.questionCount(position, inArea.length)}`}
        headingRef={headingRef}
        onSelect={(optionId) => select(q, optionId)}
        onBack={goBack}
        onNext={goNext}
      />
    );
  } else if (screen === 'step' && step?.kind === 'feedback') {
    const nextArea = steps.slice(index + 1).find((s) => s.kind === 'question')?.area;
    content = (
      <FeedbackScreen
        area={step.area}
        score={areaScore(step.area, answers) ?? 0}
        nextLabel={nextArea ? QUIZ_COPY.nextArea(AREA_LABELS[nextArea]) : QUIZ_COPY.seeResult}
        headingRef={headingRef}
        onBack={goBack}
        onNext={goNext}
      />
    );
  } else if (screen === 'finishing') {
    content = (
      <div className="flex-1 grid place-items-center" role="status">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600">
          {QUIZ_COPY.scoring}
        </span>
      </div>
    );
  } else if (screen === 'error') {
    content = (
      <div className="flex-1 flex flex-col justify-center py-6" role="alert">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-[28px] sm:text-[40px] leading-[1.1] tracking-[-0.02em] font-bold outline-none"
        >
          {QUIZ_COPY.errorTitle}
        </h1>
        <p className="mt-4 text-[17px] leading-[1.55] text-mist-600">{QUIZ_COPY.errorBody}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <PrimaryButton onClick={() => void finish()}>{QUIZ_COPY.retry}</PrimaryButton>
          <BackButton onClick={() => { setScreen('step'); goBack(); }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper-100 text-ink">
      <header className="border-b border-paper-200">
        <div className="max-w-[640px] mx-auto px-5 sm:px-8">
          <div className="h-14 flex items-center justify-between gap-4">
            <a href={productPath()} className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/coderoach_logo.svg" alt="" className="h-6 w-auto" />
              <span className="text-[14px] font-semibold tracking-[-0.01em]">{QUIZ_COPY.brand}</span>
            </a>
            {showProgress && (
              <span className="font-mono text-[11px] uppercase tracking-wider text-mist-600 tabular">
                {QUIZ_COPY.areaCount(activeIndex + 1, areas.length)}
              </span>
            )}
          </div>
          {showProgress && (
            <ol
              aria-label={QUIZ_COPY.progressLabel}
              className="list-none p-0 m-0 pb-3 grid gap-1"
              style={{ gridTemplateColumns: `repeat(${areas.length}, minmax(0, 1fr))` }}
            >
              {areas.map((a, i) => (
                <li key={a.id} aria-current={i === activeIndex ? 'step' : undefined} className="min-w-0">
                  <span
                    aria-hidden
                    className={`block h-1 rounded-full transition-colors duration-200 ${
                      i < activeIndex ? 'bg-ink' : i === activeIndex ? 'bg-electric' : 'bg-paper-200'
                    }`}
                  />
                  <span
                    className={`max-md:sr-only block mt-1.5 text-[10px] leading-tight truncate ${
                      i === activeIndex ? 'text-ink font-semibold' : 'text-mist-600'
                    }`}
                  >
                    {a.label}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </header>
      <main className="flex-1 flex w-full max-w-[640px] mx-auto px-5 sm:px-8 pt-5 pb-5 sm:pt-10 sm:pb-8">
        <div ref={panelRef} className="flex-1 flex flex-col">
          {content}
        </div>
      </main>
    </div>
  );
}

function QuestionScreen({
  question,
  answer,
  marker,
  headingRef,
  onSelect,
  onBack,
  onNext,
}: {
  question: Question;
  answer: Answers[string] | undefined;
  marker: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onSelect: (optionId: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const multi = question.type === 'multi';
  const needsNext = multi || question.type === 'volume';
  const answered = isAnswered(question, answer);
  const headingId = `q-${question.id}`;

  return (
    <>
      <p className="font-mono text-[11px] uppercase tracking-wider text-mist-600 tabular m-0">[ {marker} ]</p>
      <h1
        id={headingId}
        ref={headingRef}
        tabIndex={-1}
        className="mt-2 text-[20px] sm:text-[28px] leading-[1.25] tracking-[-0.015em] font-bold text-balance outline-none"
      >
        {question.prompt}
      </h1>
      {multi && <p className="mt-1.5 text-[13px] text-mist-600 m-0">{QUIZ_COPY.multiHint}</p>}
      <div
        role={multi ? 'group' : 'radiogroup'}
        aria-labelledby={headingId}
        className="mt-4 sm:mt-6 flex flex-col gap-2"
      >
        {question.options.map((option, i) => {
          const selected = multi
            ? Array.isArray(answer) && answer.includes(option.id)
            : answer === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role={multi ? 'checkbox' : 'radio'}
              aria-checked={selected}
              onClick={() => onSelect(option.id)}
              className={`w-full min-h-[48px] px-3 py-1.5 rounded-md border text-left flex items-center gap-3 transition-colors duration-150 active:scale-[0.99] ${
                selected
                  ? 'border-electric bg-electric/[0.08]'
                  : 'border-paper-200 bg-paper-50 hover:border-mist-400'
              }`}
            >
              {option.icon ? (
                <span
                  className={`w-8 h-8 rounded-md grid place-items-center shrink-0 border ${
                    selected ? 'text-electric border-electric/30 bg-paper-50' : 'text-shadow-700 border-paper-200 bg-paper-100'
                  }`}
                >
                  <Icon name={option.icon} size={18} />
                </span>
              ) : (
                <span
                  aria-hidden
                  className={`w-4 h-4 shrink-0 border grid place-items-center ${multi ? 'rounded-[4px]' : 'rounded-full'} ${
                    selected ? 'border-electric bg-electric' : 'border-mist-400 bg-paper-50'
                  }`}
                >
                  {selected &&
                    (multi ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-paper-50">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-paper-50" />
                    ))}
                </span>
              )}
              <span className="flex-1 text-[15px] leading-[1.3] font-medium">{option.label}</span>
              <kbd className="max-sm:hidden font-mono text-[11px] text-mist-500 tabular">{i + 1}</kbd>
            </button>
          );
        })}
      </div>
      <div className="mt-auto pt-4 flex items-center justify-between gap-3">
        <BackButton onClick={onBack} />
        {needsNext && (
          <button
            type="button"
            onClick={onNext}
            disabled={!answered}
            className="h-12 px-5 rounded-md bg-electric text-paper text-[15px] font-semibold inline-flex items-center gap-2 hover:bg-[#2562E0] transition-colors disabled:opacity-40 disabled:hover:bg-electric disabled:cursor-not-allowed"
          >
            {QUIZ_COPY.next}
            <Arrow />
          </button>
        )}
      </div>
    </>
  );
}

function FeedbackScreen({
  area,
  score,
  nextLabel,
  headingRef,
  onBack,
  onNext,
}: {
  area: AreaId;
  score: number;
  nextLabel: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    // Tapping anywhere continues (brief §7); the explicit buttons stay for keyboard and screen readers.
    <div className="flex-1 flex flex-col cursor-pointer" onClick={onNext}>
      <p className="font-mono text-[11px] uppercase tracking-wider text-mist-600 tabular m-0">
        [ {QUIZ_COPY.feedbackMarker} ]
      </p>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="mt-2 text-[28px] sm:text-[40px] leading-[1.08] tracking-[-0.025em] font-bold outline-none"
      >
        {AREA_LABELS[area]}
      </h1>
      <div className="mt-6 flex items-baseline gap-2">
        <span className="text-[64px] sm:text-[80px] font-bold leading-none tracking-[-0.04em] tabular">{score}</span>
        <span className="text-[15px] text-mist-600 tabular">/100</span>
      </div>
      <ScoreBar value={score} className="mt-4" />
      <p className="mt-6 text-[18px] sm:text-[21px] leading-[1.45] text-pretty m-0">
        {AREA_FEEDBACK[area][bandFor(score)]}
      </p>
      <div className="mt-auto pt-6 flex flex-col gap-3">
        <PrimaryButton
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        >
          {nextLabel}
        </PrimaryButton>
        <div className="flex items-center justify-between gap-3">
          <BackButton
            onClick={(e) => {
              e.stopPropagation();
              onBack();
            }}
          />
          <span className="text-[12px] text-mist-600">{QUIZ_COPY.tapHint}</span>
        </div>
      </div>
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-[52px] px-[22px] rounded-md bg-electric text-paper text-[15px] font-semibold inline-flex items-center justify-center gap-2 hover:bg-[#2562E0] transition-colors"
    >
      {children}
      <Arrow />
    </button>
  );
}

function BackButton({ onClick }: { onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-12 -ml-2 px-2 rounded-md text-[14px] font-semibold text-mist-600 hover:text-ink inline-flex items-center gap-1.5 transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M19 12H5M11 19l-7-7 7-7" />
      </svg>
      {QUIZ_COPY.back}
    </button>
  );
}

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
