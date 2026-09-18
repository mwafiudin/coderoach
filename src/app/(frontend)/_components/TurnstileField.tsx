'use client';

import { useEffect, useRef } from 'react';
import { TURNSTILE_SITE_KEY } from '@/lib/turnstile';

/**
 * Invisible unless Cloudflare wants a look at the visitor: `interaction-only` keeps the widget out
 * of the layout for everyone who passes silently. Renders nothing at all while the site key is unset.
 *
 * The token is single use, so a form that fails server-side calls `reset` through the ref it gets here.
 */

type Turnstile = {
  render: (
    el: HTMLElement,
    options: {
      sitekey: string;
      appearance?: 'always' | 'execute' | 'interaction-only';
      theme?: 'light' | 'dark' | 'auto';
      callback?: (token: string) => void;
      'error-callback'?: () => void;
      'expired-callback'?: () => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
let loader: Promise<Turnstile | null> | null = null;

function loadTurnstile() {
  if (loader) return loader;
  loader = new Promise<Turnstile | null>((resolve) => {
    if (window.turnstile) return resolve(window.turnstile);
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.turnstile ?? null);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });
  return loader;
}

export type TurnstileHandle = { reset: () => void };

export function TurnstileField({
  onToken,
  onUnavailable,
  handleRef,
  theme = 'light',
  className = '',
}: {
  onToken: (token: string) => void;
  /** Called when the widget cannot produce a token: script blocked, bad key, or no answer in time. */
  onUnavailable?: () => void;
  handleRef?: React.RefObject<TurnstileHandle | null>;
  theme?: 'light' | 'dark' | 'auto';
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const tokenRef = useRef(onToken);
  tokenRef.current = onToken;
  const unavailableRef = useRef(onUnavailable);
  unavailableRef.current = onUnavailable;

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    const host = hostRef.current;
    if (!host) return;
    let widgetId: string | null = null;
    let cancelled = false;
    let answered = false;
    // Cloudflare normally answers in a second or two. Past this the form stops waiting for it.
    const giveUp = window.setTimeout(() => {
      if (!answered) unavailableRef.current?.();
    }, 8000);

    loadTurnstile().then((turnstile) => {
      if (cancelled) return;
      if (!turnstile || !hostRef.current) {
        unavailableRef.current?.();
        return;
      }
      widgetId = turnstile.render(hostRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        appearance: 'interaction-only',
        theme,
        callback: (token) => {
          answered = true;
          tokenRef.current(token);
        },
        'error-callback': () => {
          answered = true;
          tokenRef.current('');
          unavailableRef.current?.();
        },
        'expired-callback': () => tokenRef.current(''),
      });
      if (handleRef) {
        handleRef.current = {
          reset: () => {
            if (widgetId) turnstile.reset(widgetId);
            tokenRef.current('');
          },
        };
      }
    });

    return () => {
      cancelled = true;
      window.clearTimeout(giveUp);
      if (widgetId) window.turnstile?.remove(widgetId);
      if (handleRef) handleRef.current = null;
    };
  }, [handleRef, theme]);

  if (!TURNSTILE_SITE_KEY) return null;
  return <div ref={hostRef} className={className} />;
}
