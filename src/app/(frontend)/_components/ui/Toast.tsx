'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

type Tone = 'success' | 'error' | 'warning' | 'info';

type ToastItem = {
  id: number;
  tone: Tone;
  title: string;
  message?: string;
  duration: number;
};

type ToastApi = {
  show: (opts: { tone?: Tone; title: string; message?: string; duration?: number }) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
};

const ToastContext = createContext<ToastApi | null>(null);

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Fallback no-op so components can use safely without provider
    return {
      show: () => {},
      success: () => {},
      error: () => {},
      warning: () => {},
      info: () => {},
    };
  }
  return ctx;
}

const TONE_STYLES: Record<Tone, { dot: string; bar: string; iconColor: string }> = {
  success: { dot: 'bg-[#5DD79A]', bar: 'bg-[#5DD79A]', iconColor: 'text-[#3FAE7A]' },
  error: { dot: 'bg-[#E5484D]', bar: 'bg-[#E5484D]', iconColor: 'text-[#C13439]' },
  warning: { dot: 'bg-[#F5A524]', bar: 'bg-[#F5A524]', iconColor: 'text-[#A47A14]' },
  info: { dot: 'bg-electric', bar: 'bg-electric', iconColor: 'text-electric' },
};

let _id = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    setToasts((cur) => cur.filter((t) => t.id !== id));
    const tm = timers.current.get(id);
    if (tm) {
      clearTimeout(tm);
      timers.current.delete(id);
    }
  }, []);

  const show = useCallback(
    (opts: { tone?: Tone; title: string; message?: string; duration?: number }) => {
      const id = ++_id;
      const item: ToastItem = {
        id,
        tone: opts.tone ?? 'info',
        title: opts.title,
        message: opts.message,
        duration: opts.duration ?? 3800,
      };
      setToasts((cur) => [...cur, item]);
      const tm = setTimeout(() => dismiss(id), item.duration);
      timers.current.set(id, tm);
    },
    [dismiss],
  );

  const api: ToastApi = {
    show,
    success: (title, message) => show({ tone: 'success', title, message }),
    error: (title, message) => show({ tone: 'error', title, message, duration: 5000 }),
    warning: (title, message) => show({ tone: 'warning', title, message }),
    info: (title, message) => show({ tone: 'info', title, message }),
  };

  useEffect(() => () => timers.current.forEach((t) => clearTimeout(t)), []);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-live="polite"
        aria-atomic
        className="fixed top-20 right-4 left-4 sm:left-auto z-[55] flex flex-col gap-2 pointer-events-none"
      >
        {toasts.map((t) => {
          const s = TONE_STYLES[t.tone];
          return (
            <div
              key={t.id}
              role="status"
              className="pointer-events-auto w-full sm:w-[360px] sm:ml-auto bg-paper border border-paper-200 rounded-lg shadow-[0_18px_40px_-16px_rgba(8,9,10,0.25)] overflow-hidden animate-[scaleIn_220ms_var(--ease-out-quint)]"
            >
              <div className="flex items-start gap-3 px-4 py-3">
                <span
                  className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${s.dot} animate-pulse`}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-ink leading-tight">{t.title}</div>
                  {t.message && (
                    <div className="text-[12px] text-mist-600 leading-[1.5] mt-1">{t.message}</div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(t.id)}
                  aria-label="Tutup notifikasi"
                  className="flex-shrink-0 w-6 h-6 rounded-md text-mist-500 hover:text-ink hover:bg-paper-100 transition-colors text-base leading-none"
                >
                  ×
                </button>
              </div>
              <div
                className={`h-0.5 ${s.bar} origin-left`}
                style={{
                  animation: `toastBar ${t.duration}ms linear forwards`,
                }}
              />
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
