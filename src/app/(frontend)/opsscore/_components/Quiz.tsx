'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/lib/icons';
import { captureAttribution } from '@/lib/opsscore/attribution';
import { INSTRUMENT_VERSION, productPath } from '@/lib/opsscore/config';
import { AREA_FEEDBACK, PROFILE_COPY, QUIZ_COPY } from '@/lib/opsscore/copy';
import {
  SECTION_LABELS,
  buildSteps,
  closesSection,
  progressSections,
  stepKey,
  type SectionId,
  type Step,
} from '@/lib/opsscore/flow';
import {
  PROFILE_OPTIONS,
  isProfileAnswered,
  sanitizeProfile,
  type Profile,
  type ProfileField,
} from '@/lib/opsscore/profile';
import { QUESTION_BY_ID, promptFor, type AreaId, type Option } from '@/lib/opsscore/questions';
import { areaScore, bandFor, isAnswered, sanitizeAnswers, type Answers } from '@/lib/opsscore/scoring';
import { track } from '@/lib/opsscore/track';
import { AnimatedCount } from '../../_components/ui/AnimatedCount';
import { ScoreBar } from './ScoreBar';

const STORAGE_KEY = `opsscore.quiz.v${INSTRUMENT_VERSION}`;
const LAST_RESULT_KEY = 'opsscore.lastResult';
const ADVANCE_DELAY_MS = 250;
/** The scoring console stays up this long, so its lines can play out on fast connections. */
const CONSOLE_MIN_MS = 1600;
const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';

type Screen = 'loading' | 'intro' | 'resume' | 'step' | 'finishing' | 'error';
type Saved = { sessionId: string | null; answers: Answers; profile: Profile; step: string };

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
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

const firstName = (name?: string) => (name ?? '').trim().split(/\s+/)[0] ?? '';

const optionsFor = (step: Step): Option[] | null =>
  step.kind === 'question'
    ? QUESTION_BY_ID[step.id].options
    : step.kind === 'profile'
      ? (PROFILE_OPTIONS[step.field] ?? null)
      : null;

function isStepDone(step: Step, answers: Answers, profile: Profile) {
  if (step.kind === 'question') return isAnswered(QUESTION_BY_ID[step.id], answers[step.id]);
  if (step.kind === 'profile') return isProfileAnswered(step.field, profile);
  return true;
}

function profilePrompt(field: ProfileField, profile: Profile) {
  const brand = profile.brand?.trim() || undefined;
  switch (field) {
    case 'name':
      return PROFILE_COPY.name.prompt;
    case 'brand':
      return PROFILE_COPY.brand.prompt;
    case 'industry':
      return PROFILE_COPY.industry.prompt(brand);
    case 'revenue':
      return PROFILE_COPY.revenue.prompt(brand);
    case 'employees':
      return PROFILE_COPY.employees.prompt(brand);
  }
}

export function Quiz() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>('loading');
  const [answers, setAnswers] = useState<Answers>({});
  const [profile, setProfile] = useState<Profile>({});
  const [current, setCurrent] = useState('');
  const [direction, setDirection] = useState<1 | -1>(1);
  const [lastResult, setLastResult] = useState<string | null>(null);

  // Refs for timers, animations, and async calls that must see the latest values.
  const answersRef = useRef(answers);
  const profileRef = useRef(profile);
  const currentRef = useRef(current);
  const sessionIdRef = useRef<string | null>(null);
  const sessionPromise = useRef<Promise<string | null> | null>(null);
  const advanceTimer = useRef<number | null>(null);
  const exitAnimation = useRef<Animation | null>(null);
  const transitioning = useRef(false);
  const unsaved = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);
  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  const steps = useMemo(() => buildSteps(answers), [answers]);
  const index = steps.findIndex((s) => stepKey(s) === current);
  const step: Step | undefined = steps[index];
  const sections = useMemo(() => progressSections(answers), [answers]);

  // Restore saved progress once. Ads may link here directly, so attribution is captured here too.
  useEffect(() => {
    captureAttribution();
    const saved = readStorage<Saved>(STORAGE_KEY);
    setLastResult(readStorage<string>(LAST_RESULT_KEY));
    const savedAnswers = sanitizeAnswers(saved?.answers);
    const savedProfile = sanitizeProfile(saved?.profile);
    if (saved && (Object.keys(savedAnswers).length || Object.keys(savedProfile).length)) {
      sessionIdRef.current = saved.sessionId;
      answersRef.current = savedAnswers;
      profileRef.current = savedProfile;
      setAnswers(savedAnswers);
      setProfile(savedProfile);
      setCurrent(saved.step);
      setScreen('resume');
    } else {
      setScreen('intro');
    }
  }, []);

  // Local autosave on every change while answering.
  useEffect(() => {
    if (screen !== 'step') return;
    writeStorage(STORAGE_KEY, { sessionId: sessionIdRef.current, answers, profile, step: current } satisfies Saved);
  }, [screen, answers, profile, current]);

  // Enter: slide the new screen in and stagger its options; focus the input or the heading.
  useEffect(() => {
    const panel = panelRef.current;
    exitAnimation.current?.cancel();
    exitAnimation.current = null;
    if (panel && !prefersReducedMotion()) {
      panel.animate(
        [
          { opacity: 0, transform: `translateX(${direction * 24}px)` },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 180, easing: EASE_OUT },
      );
      panel.querySelectorAll<HTMLElement>('[data-option]').forEach((option, i) => {
        option.animate(
          [
            { opacity: 0, transform: 'translateY(6px)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 180, delay: 40 + i * 25, easing: EASE_OUT, fill: 'backwards' },
        );
      });
    }
    const input = panel?.querySelector<HTMLInputElement>('input[data-autofocus]');
    if (input) input.focus({ preventScroll: true });
    else headingRef.current?.focus({ preventScroll: true });
    // Direction is set together with the step; animating on it alone would replay the slide.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, screen]);

  useEffect(
    () => () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    },
    [],
  );

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

  /** Silent server save of answers and profile. Failed saves are retried at the next section or on tab hide. */
  const save = useCallback(
    async (keepalive = false) => {
      const id = keepalive ? sessionIdRef.current : await ensureSession();
      if (!id) return;
      unsaved.current = false;
      try {
        const res = await fetch(`/api/opsscore/sessions/${id}`, {
          method: 'PUT',
          headers: JSON_HEADERS,
          body: JSON.stringify({ answers: answersRef.current, profile: profileRef.current }),
          keepalive,
        });
        if (!res.ok) unsaved.current = true;
      } catch {
        unsaved.current = true;
      }
    },
    [ensureSession],
  );

  // Leaving mid-section (tab switch, app switch, close) still saves what was answered.
  useEffect(() => {
    const flush = () => {
      if (unsaved.current) void save(true);
    };
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flush();
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', flush);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', flush);
    };
  }, [save]);

  /** Exit: slide the current screen out, then apply the change; the enter effect takes over. */
  const transition = useCallback(async (dir: 1 | -1, apply: () => void) => {
    if (transitioning.current) return;
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    const panel = panelRef.current;
    if (panel && !prefersReducedMotion()) {
      transitioning.current = true;
      const exit = panel.animate(
        [
          { opacity: 1, transform: 'none' },
          { opacity: 0, transform: `translateX(${-dir * 24}px)` },
        ],
        { duration: 110, easing: 'cubic-bezier(0.4, 0, 1, 1)', fill: 'forwards' },
      );
      exitAnimation.current = exit;
      await exit.finished.catch(() => undefined);
      transitioning.current = false;
    }
    setDirection(dir);
    apply();
    // If nothing re-rendered, never leave the panel hidden.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        exitAnimation.current?.cancel();
        exitAnimation.current = null;
      }),
    );
  }, []);

  const finish = useCallback(async () => {
    setDirection(1);
    setScreen('finishing');
    const minVisible = new Promise<void>((resolve) =>
      window.setTimeout(resolve, prefersReducedMotion() ? 0 : CONSOLE_MIN_MS),
    );
    const id = await ensureSession();
    if (id) {
      try {
        const [res] = await Promise.all([
          fetch(`/api/opsscore/sessions/${id}/complete`, {
            method: 'POST',
            headers: JSON_HEADERS,
            body: JSON.stringify({ answers: answersRef.current, profile: profileRef.current }),
          }),
          minVisible,
        ]);
        const body = await res.json().catch(() => ({}));
        if (res.ok && body.ok) {
          unsaved.current = false;
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
    const list = buildSteps(answersRef.current);
    const i = list.findIndex((s) => stepKey(s) === currentRef.current);
    const here = list[i];
    if (!here || !isStepDone(here, answersRef.current, profileRef.current)) return;
    const next = list[i + 1];
    if (!next) {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
      void finish();
      return;
    }
    if (closesSection(list, i)) void save();
    if (next.kind === 'feedback') {
      const scored = progressSections(answersRef.current).filter((s) => s.id !== 'kenalan');
      track('assessment_area_done', {
        area: next.section,
        index: scored.findIndex((s) => s.id === next.section) + 1,
      });
    }
    void transition(1, () => setCurrent(stepKey(next)));
  }, [finish, save, transition]);

  const goBack = useCallback(() => {
    const list = buildSteps(answersRef.current);
    const i = list.findIndex((s) => stepKey(s) === currentRef.current);
    for (let j = i - 1; j >= 0; j--) {
      if (list[j].kind !== 'feedback') {
        const key = stepKey(list[j]);
        void transition(-1, () => setCurrent(key));
        return;
      }
    }
    void transition(-1, () => setScreen('intro'));
  }, [transition]);

  const choose = useCallback(
    (target: Step, optionId: string) => {
      if (transitioning.current) return;
      if ('vibrate' in navigator) navigator.vibrate(8);
      unsaved.current = true;

      if (target.kind === 'profile') {
        const updated = { ...profileRef.current, [target.field]: optionId };
        profileRef.current = updated;
        setProfile(updated);
      } else if (target.kind === 'question') {
        const q = QUESTION_BY_ID[target.id];
        if (q.type === 'multi') {
          const picked = Array.isArray(answersRef.current[q.id]) ? (answersRef.current[q.id] as string[]) : [];
          let next: string[];
          if (picked.includes(optionId)) next = picked.filter((id) => id !== optionId);
          else if (q.exclusive?.includes(optionId)) next = [optionId];
          else next = [...picked.filter((id) => !q.exclusive?.includes(id)), optionId];
          const updated = { ...answersRef.current };
          if (next.length) updated[q.id] = next;
          else delete updated[q.id];
          answersRef.current = updated;
          setAnswers(updated);
          return;
        }
        const updated = { ...answersRef.current, [q.id]: optionId };
        answersRef.current = updated;
        setAnswers(updated);
        if (q.type === 'volume') return;
      } else {
        return;
      }

      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
      advanceTimer.current = window.setTimeout(goNext, ADVANCE_DELAY_MS);
    },
    [goNext],
  );

  const typeProfile = useCallback((field: ProfileField, value: string) => {
    unsaved.current = true;
    const updated = { ...profileRef.current, [field]: value };
    profileRef.current = updated;
    setProfile(updated);
  }, []);

  const start = useCallback(() => {
    void transition(1, () => {
      removeStorage(STORAGE_KEY);
      sessionIdRef.current = null;
      sessionPromise.current = null;
      answersRef.current = {};
      profileRef.current = {};
      setAnswers({});
      setProfile({});
      setCurrent(stepKey(buildSteps({})[0]));
      setScreen('step');
      void ensureSession().then((id) => track('assessment_start', { session_id: id }));
    });
  }, [ensureSession, transition]);

  // Intro after "Kembali" on the first screen: keep what was already filled in.
  const begin = useCallback(() => {
    if (!Object.keys(answersRef.current).length && !Object.keys(sanitizeProfile(profileRef.current)).length) {
      start();
      return;
    }
    void transition(1, () => {
      setCurrent(stepKey(buildSteps(answersRef.current)[0]));
      setScreen('step');
    });
  }, [start, transition]);

  const resume = useCallback(() => {
    const list = buildSteps(answersRef.current);
    const valid = list.some((s) => stepKey(s) === currentRef.current);
    void transition(1, () => {
      if (!valid) {
        const firstOpen = list.find((s) => !isStepDone(s, answersRef.current, profileRef.current));
        setCurrent(stepKey(firstOpen ?? list[0]));
      }
      setScreen('step');
    });
  }, [transition]);

  // Keyboard: 1–9 picks an option, Enter continues, Esc goes back. Typing in a field is left alone.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (screen !== 'step' || !step || e.metaKey || e.ctrlKey || e.altKey) return;
      if ((e.target as HTMLElement | null)?.closest('input, textarea, select')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        goBack();
        return;
      }
      if (e.key === 'Enter' || (step.kind === 'feedback' && e.key === ' ')) {
        e.preventDefault();
        goNext();
        return;
      }
      const options = optionsFor(step);
      const n = Number(e.key);
      if (options && Number.isInteger(n) && n >= 1 && n <= options.length) {
        e.preventDefault();
        choose(step, options[n - 1].id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [screen, step, goBack, goNext, choose]);

  /* ---------------------------------------------------------------- */
  /* Progress                                                          */
  /* ---------------------------------------------------------------- */

  const activeSection: SectionId | null = step
    ? step.section
    : screen === 'finishing'
      ? (sections[sections.length - 1]?.id ?? null)
      : null;
  const activeIndex = activeSection ? sections.findIndex((s) => s.id === activeSection) : -1;
  const showProgress = (screen === 'step' || screen === 'finishing') && activeIndex >= 0;
  const inSection = step ? steps.filter((s) => s.section === step.section && s.kind !== 'feedback') : [];
  const doneInSection =
    step?.kind === 'feedback' ? inSection.length : inSection.findIndex((s) => stepKey(s) === current);
  const activeFill =
    screen === 'finishing' ? 1 : inSection.length ? Math.max(0.08, doneInSection / inSection.length) : 0.08;

  /* ---------------------------------------------------------------- */
  /* Screens                                                           */
  /* ---------------------------------------------------------------- */

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
    const saved = steps.find((s) => stepKey(s) === current);
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
          <PrimaryButton onClick={resume}>{QUIZ_COPY.resume(SECTION_LABELS[saved?.section ?? 'kenalan'])}</PrimaryButton>
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
  } else if (screen === 'step' && step) {
    const marker = `${SECTION_LABELS[step.section]} · ${QUIZ_COPY.questionCount(
      Math.min(doneInSection + 1, inSection.length),
      inSection.length,
    )}`;
    if (step.kind === 'feedback') {
      const nextSection = steps.slice(index + 1).find((s) => s.kind !== 'feedback')?.section;
      content = (
        <FeedbackScreen
          area={step.section}
          score={areaScore(step.section, answers) ?? 0}
          nextLabel={nextSection ? QUIZ_COPY.nextArea(SECTION_LABELS[nextSection]) : QUIZ_COPY.seeResult}
          headingRef={headingRef}
          onBack={goBack}
          onNext={goNext}
        />
      );
    } else if (step.kind === 'profile' && !PROFILE_OPTIONS[step.field]) {
      const field = step.field;
      content = (
        <TextScreen
          field={field}
          value={profile[field] ?? ''}
          prompt={profilePrompt(field, profile)}
          greeting={field === 'brand' && profile.name ? PROFILE_COPY.brand.greeting(firstName(profile.name)) : undefined}
          marker={marker}
          headingRef={headingRef}
          onChange={(value) => typeProfile(field, value)}
          onBack={goBack}
          onNext={goNext}
        />
      );
    } else if (step.kind === 'profile') {
      const value = profile[step.field];
      content = (
        <ChoiceScreen
          id={stepKey(step)}
          marker={marker}
          prompt={profilePrompt(step.field, profile)}
          hint={step.field === 'revenue' ? PROFILE_COPY.revenue.hint : undefined}
          options={PROFILE_OPTIONS[step.field]!}
          layout="grid"
          isSelected={(id) => value === id}
          answered={isProfileAnswered(step.field, profile)}
          needsNext={false}
          multi={false}
          headingRef={headingRef}
          onChoose={(id) => choose(step, id)}
          onBack={goBack}
          onNext={goNext}
        />
      );
    } else {
      const q = QUESTION_BY_ID[step.id];
      const answer = answers[q.id];
      const multi = q.type === 'multi';
      content = (
        <ChoiceScreen
          id={stepKey(step)}
          marker={marker}
          prompt={promptFor(q, profile.industry)}
          hint={multi ? QUIZ_COPY.multiHint : undefined}
          options={q.options}
          layout="list"
          isSelected={(id) => (multi ? Array.isArray(answer) && answer.includes(id) : answer === id)}
          answered={isAnswered(q, answer)}
          needsNext={multi || q.type === 'volume'}
          multi={multi}
          headingRef={headingRef}
          onChoose={(id) => choose(step, id)}
          onBack={goBack}
          onNext={goNext}
        />
      );
    }
  } else if (screen === 'finishing') {
    const scoredSections = sections.filter((s) => s.id !== 'kenalan').length;
    const answered = steps.filter((s) => s.kind === 'question').length;
    content = <ScoringConsole answered={answered} areas={scoredSections} />;
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
          <BackButton
            onClick={() => {
              setScreen('step');
              goBack();
            }}
          />
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
              <span
                key={activeIndex}
                className="ops-fade-up font-mono text-[11px] uppercase tracking-wider text-mist-600 tabular"
              >
                {QUIZ_COPY.sectionCount(activeIndex + 1, sections.length)}
              </span>
            )}
          </div>
          {showProgress && (
            <ol
              aria-label={QUIZ_COPY.progressLabel}
              className="list-none p-0 m-0 pb-3 grid gap-1"
              style={{ gridTemplateColumns: `repeat(${sections.length}, minmax(0, 1fr))` }}
            >
              {sections.map((section, i) => {
                const done = i < activeIndex;
                const fill = done ? 1 : i === activeIndex ? activeFill : 0;
                return (
                  <li key={section.id} aria-current={i === activeIndex ? 'step' : undefined} className="min-w-0">
                    <span
                      key={`${section.id}-${done ? 'done' : 'open'}`}
                      aria-hidden
                      className={`block h-1 rounded-full bg-paper-200 overflow-hidden ${
                        done && i === activeIndex - 1 ? 'ops-pulse' : ''
                      }`}
                    >
                      <span
                        className={`block h-full rounded-full origin-left transition-transform duration-300 ease-out ${
                          done ? 'bg-ink' : 'bg-electric'
                        }`}
                        style={{ transform: `scaleX(${fill})` }}
                      />
                    </span>
                    <span
                      className={`max-md:sr-only block mt-1.5 text-[10px] leading-tight truncate transition-colors duration-200 ${
                        i === activeIndex ? 'text-ink font-semibold' : 'text-mist-600'
                      }`}
                    >
                      {section.label}
                    </span>
                  </li>
                );
              })}
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

function Marker({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[11px] uppercase tracking-wider text-mist-600 tabular m-0">[ {children} ]</p>;
}

function TextScreen({
  field,
  value,
  prompt,
  greeting,
  marker,
  headingRef,
  onChange,
  onBack,
  onNext,
}: {
  field: ProfileField;
  value: string;
  prompt: string;
  greeting?: string;
  marker: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const valid = isProfileAnswered(field, { [field]: value });
  const inputId = `profile-${field}`;
  const placeholder = field === 'name' ? PROFILE_COPY.name.placeholder : PROFILE_COPY.brand.placeholder;

  return (
    <>
      <Marker>{marker}</Marker>
      {greeting && (
        <p
          className="ops-fade-up mt-4 mb-0 text-[20px] sm:text-[24px] font-semibold tracking-[-0.01em] text-electric"
          style={{ '--ops-delay': '80ms' } as CSSProperties}
        >
          {greeting}
        </p>
      )}
      <h1
        ref={headingRef}
        tabIndex={-1}
        className={`${greeting ? 'mt-1' : 'mt-2'} text-[26px] sm:text-[36px] leading-[1.15] tracking-[-0.02em] font-bold text-balance outline-none`}
      >
        <label htmlFor={inputId}>{prompt}</label>
      </h1>
      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
      >
        <input
          id={inputId}
          data-autofocus
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            // Implicit form submission is not dependable across keyboards; handle Enter directly.
            if (e.key === 'Enter') {
              e.preventDefault();
              onNext();
            }
          }}
          placeholder={placeholder}
          autoComplete={field === 'name' ? 'name' : 'organization'}
          autoCapitalize="words"
          enterKeyHint="next"
          maxLength={field === 'name' ? 80 : 120}
          className="block w-full h-14 px-4 rounded-md border border-paper-200 bg-paper-50 text-[18px] text-ink placeholder:text-mist-500 outline-none transition-[border-color,box-shadow] duration-200 focus:border-electric focus:shadow-[0_0_0_3px_rgba(44,112,254,0.14)]"
        />
      </form>
      <div className="mt-auto pt-4 flex items-center justify-between gap-3">
        <BackButton onClick={onBack} />
        <NextButton ready={valid} onClick={onNext} />
      </div>
    </>
  );
}

function ChoiceScreen({
  id,
  marker,
  prompt,
  hint,
  options,
  layout,
  isSelected,
  answered,
  needsNext,
  multi,
  headingRef,
  onChoose,
  onBack,
  onNext,
}: {
  id: string;
  marker: string;
  prompt: string;
  hint?: string;
  options: Option[];
  layout: 'list' | 'grid';
  isSelected: (id: string) => boolean;
  answered: boolean;
  needsNext: boolean;
  multi: boolean;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onChoose: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const headingId = `h-${id.replace(':', '-')}`;
  return (
    <>
      <Marker>{marker}</Marker>
      <h1
        id={headingId}
        ref={headingRef}
        tabIndex={-1}
        className="mt-2 text-[20px] sm:text-[28px] leading-[1.25] tracking-[-0.015em] font-bold text-balance outline-none"
      >
        {prompt}
      </h1>
      {hint && <p className="mt-1.5 mb-0 text-[13px] text-mist-600">{hint}</p>}
      <div
        role={multi ? 'group' : 'radiogroup'}
        aria-labelledby={headingId}
        className={`mt-4 sm:mt-6 ${layout === 'grid' ? 'grid grid-cols-2 gap-2' : 'flex flex-col gap-2'}`}
      >
        {options.map((option, i) => {
          const selected = isSelected(option.id);
          return (
            <button
              key={option.id}
              data-option
              type="button"
              role={multi ? 'checkbox' : 'radio'}
              aria-checked={selected}
              onClick={() => onChoose(option.id)}
              className={`relative w-full min-h-[48px] px-3 py-1.5 rounded-md border text-left flex items-center gap-3 transition-[border-color,background-color,box-shadow,transform] duration-150 active:scale-[0.98] ${
                selected
                  ? 'border-electric bg-electric/[0.08] shadow-[0_0_0_3px_rgba(44,112,254,0.14)]'
                  : 'border-paper-200 bg-paper-50 hover:border-mist-400'
              }`}
            >
              {option.icon ? (
                <span
                  data-icon={option.icon}
                  className={`ops-icon ${
                    selected ? 'is-on text-electric border-electric/30 bg-paper-50' : 'text-shadow-700 border-paper-200 bg-paper-100'
                  } w-8 h-8 rounded-md grid place-items-center shrink-0 border transition-colors duration-150`}
                >
                  <Icon name={option.icon} size={18} />
                </span>
              ) : layout === 'list' ? (
                <span
                  aria-hidden
                  className={`w-4 h-4 shrink-0 border grid place-items-center transition-colors duration-150 ${
                    multi ? 'rounded-[4px]' : 'rounded-full'
                  } ${selected ? 'border-electric bg-electric' : 'border-mist-400 bg-paper-50'}`}
                >
                  {selected && !multi && <span className="w-1.5 h-1.5 rounded-full bg-paper-50" />}
                  {selected && multi && <CheckIcon size={10} className="text-paper-50" />}
                </span>
              ) : null}
              <span className="flex-1 min-w-0 text-[15px] leading-[1.3] font-medium">{option.label}</span>
              {selected && !multi ? (
                <span className="ops-pop w-5 h-5 shrink-0 rounded-full bg-electric text-paper grid place-items-center" aria-hidden>
                  <CheckIcon size={11} />
                </span>
              ) : (
                layout === 'list' && <kbd className="max-sm:hidden font-mono text-[11px] text-mist-500 tabular">{i + 1}</kbd>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-auto pt-4 flex items-center justify-between gap-3">
        <BackButton onClick={onBack} />
        {needsNext && <NextButton ready={answered} onClick={onNext} />}
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
      <Marker>{QUIZ_COPY.feedbackMarker}</Marker>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="mt-2 text-[28px] sm:text-[40px] leading-[1.08] tracking-[-0.025em] font-bold outline-none"
      >
        {SECTION_LABELS[area]}
      </h1>
      <div className="mt-6 flex items-baseline gap-2">
        <span className="text-[64px] sm:text-[80px] font-bold leading-none tracking-[-0.04em] tabular">
          <AnimatedCount value={String(score)} duration={700} />
        </span>
        <span className="text-[15px] text-mist-600 tabular">/100</span>
      </div>
      <ScoreBar value={score} className="mt-4" animate />
      <p
        className="ops-fade-up mt-6 mb-0 text-[18px] sm:text-[21px] leading-[1.45] text-pretty"
        style={{ '--ops-delay': '450ms' } as CSSProperties}
      >
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

/** Log lines play out while the result is computed, in the style of the site's deploy console. */
function ScoringConsole({ answered, areas }: { answered: number; areas: number }) {
  const lines = [
    { prefix: '$', tone: 'text-electric', text: QUIZ_COPY.console.command, at: 0 },
    { prefix: '→', tone: 'text-mist-500', text: QUIZ_COPY.console.read(answered), at: 250 },
    { prefix: '→', tone: 'text-mist-500', text: QUIZ_COPY.console.areas(areas), at: 550 },
    { prefix: '✓', tone: 'text-success', text: QUIZ_COPY.console.phase, at: 850 },
    { prefix: '→', tone: 'text-mist-500', text: QUIZ_COPY.console.priorities, at: 1100 },
    { prefix: '✓', tone: 'text-success', text: QUIZ_COPY.console.done, at: 1350 },
  ];
  const [shown, setShown] = useState(1);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(lines.length);
      return;
    }
    const timers = lines.slice(1).map((line, i) => window.setTimeout(() => setShown(i + 2), line.at));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
    // The lines are fixed for the lifetime of this screen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-1 grid place-items-center py-6" role="status" aria-label={QUIZ_COPY.scoring}>
      <div className="w-full max-w-[420px] bg-ink text-paper rounded-xl border border-shadow-700 shadow-[0_24px_60px_-24px_rgba(8,9,10,0.55)] overflow-hidden font-mono text-[13px] leading-[1.9] tabular">
        <div className="flex items-center justify-between gap-3 px-4 h-10 border-b border-shadow-700 text-[11px] uppercase tracking-wider text-mist-500">
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" aria-hidden />
            {QUIZ_COPY.brand}
          </span>
          <span>{QUIZ_COPY.scoring}</span>
        </div>
        <ol className="list-none m-0 px-4 py-4 min-h-[200px]">
          {lines.slice(0, shown).map((line) => (
            <li key={line.text} className="ops-line-in">
              <span className={`${line.tone} mr-2`}>{line.prefix}</span>
              {line.text}
            </li>
          ))}
        </ol>
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
      className="h-[52px] px-[22px] rounded-md bg-electric text-paper text-[15px] font-semibold inline-flex items-center justify-center gap-2 hover:bg-[#2562E0] active:scale-[0.98] transition-[background-color,transform]"
    >
      {children}
      <Arrow />
    </button>
  );
}

/** Lights up once the screen has an answer. */
function NextButton({ ready, onClick }: { ready: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-disabled={!ready}
      className={`h-12 px-5 rounded-md text-[15px] font-semibold inline-flex items-center gap-2 transition-[background-color,color,box-shadow,transform] duration-200 ${
        ready
          ? 'bg-electric text-paper shadow-[0_8px_24px_-10px_rgba(44,112,254,0.7)] hover:bg-[#2562E0] active:scale-[0.98]'
          : 'bg-paper-200 text-mist-600 cursor-not-allowed'
      }`}
    >
      {QUIZ_COPY.next}
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

function CheckIcon({ size, className = '' }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
