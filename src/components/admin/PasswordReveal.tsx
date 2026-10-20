'use client';

import { type ReactNode, useEffect } from 'react';

const DONE = 'data-reveal';

/**
 * Payload's password inputs (login, reset, change password) have no show/hide button. This adds
 * one next to every password input in the admin instead of replacing Payload's forms, so their
 * login, lockout, and error handling stay Payload's own.
 *
 * Mounted as an admin provider so it covers every page, including ones that render later.
 */
export default function PasswordReveal({ children }: { children?: ReactNode }) {
  useEffect(() => {
    const enhance = () => {
      for (const input of document.querySelectorAll<HTMLInputElement>(`input[type="password"]:not([${DONE}])`)) {
        input.setAttribute(DONE, '');
        input.parentElement?.classList.add('pw-reveal');
        input.after(toggleFor(input));
      }
    };
    enhance();
    const observer = new MutationObserver(enhance);
    observer.observe(document.body, { childList: true, subtree: true });

    // Back to a password field before submitting, so password managers still offer to save it.
    const hide = (e: Event) => {
      for (const input of (e.target as HTMLElement).querySelectorAll<HTMLInputElement>(`input[${DONE}]`)) {
        show.get(input)?.(false);
      }
    };
    document.addEventListener('submit', hide, true);
    return () => {
      observer.disconnect();
      document.removeEventListener('submit', hide, true);
    };
  }, []);

  return (
    <>
      <style>{STYLE}</style>
      {children}
    </>
  );
}

const show = new WeakMap<HTMLInputElement, (shown: boolean) => void>();

function toggleFor(input: HTMLInputElement) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'pw-reveal__toggle';
  const set = (shown: boolean) => {
    input.type = shown ? 'text' : 'password';
    button.setAttribute('aria-label', shown ? 'Sembunyikan password' : 'Tampilkan password');
    button.setAttribute('aria-pressed', String(shown));
    button.innerHTML = shown ? EYE_OFF : EYE;
  };
  button.addEventListener('click', () => set(input.type === 'password'));
  show.set(input, set);
  set(false);
  return button;
}

const svg = (body: string) =>
  `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
const EYE = svg('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>');
const EYE_OFF = svg(
  '<path d="M3 3l18 18"/><path d="M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-2.9 3.9M6.6 6.6C3.8 8.5 2 12 2 12s3.5 7 10 7a9.6 9.6 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
);

const STYLE = `
.pw-reveal { position: relative; }
.pw-reveal input[${DONE}] { padding-right: 44px; }
.pw-reveal__toggle {
  position: absolute; top: 50%; right: 4px; transform: translateY(-50%);
  width: 36px; height: 36px; display: inline-flex; align-items: center; justify-content: center;
  border: 0; border-radius: 4px; background: transparent; color: var(--theme-elevation-500); cursor: pointer;
}
.pw-reveal__toggle:hover { color: var(--theme-elevation-800); }
.pw-reveal__toggle:focus-visible { outline: 2px solid var(--theme-success-500); outline-offset: 1px; }
`;
