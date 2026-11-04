'use client';

import { type ReactNode, useEffect } from 'react';
import { addRevealButton, REVEAL_ATTR as DONE } from '@/lib/password-reveal';

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
        input.parentElement?.classList.add('pw-reveal');
        show.set(input, addRevealButton(input));
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

// 44px target, centred on the input's right edge. It overhangs a short input by a few pixels
// without moving anything, since it is absolute and transparent.
const STYLE = `
.pw-reveal { position: relative; }
.pw-reveal input[${DONE}] { padding-right: 48px; }
.pw-reveal__toggle {
  position: absolute; top: 50%; right: 2px; transform: translateY(-50%);
  width: 44px; height: 44px; display: inline-flex; align-items: center; justify-content: center;
  border: 0; border-radius: 4px; background: transparent; color: var(--theme-elevation-500); cursor: pointer;
}
.pw-reveal__toggle:hover { color: var(--theme-elevation-800); }
.pw-reveal__toggle:focus-visible { outline: 2px solid var(--theme-success-500); outline-offset: -2px; }
`;
