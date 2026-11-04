// The show/hide button PasswordReveal adds after each admin password input. Plain DOM, so it can
// be tested without a browser.

export const REVEAL_ATTR = 'data-reveal';

/** Adds the button after the input and returns the switch, so a form submit can hide it again. */
export function addRevealButton(input: HTMLInputElement) {
  input.setAttribute(REVEAL_ATTR, '');
  // A shown password must not end up in the keyboard's dictionary or get capitalised.
  input.setAttribute('autocapitalize', 'none');
  input.setAttribute('autocorrect', 'off');
  input.spellcheck = false;

  const button = input.ownerDocument.createElement('button');
  button.type = 'button';
  button.className = 'pw-reveal__toggle';
  const set = (shown: boolean) => {
    input.type = shown ? 'text' : 'password';
    button.setAttribute('aria-label', shown ? 'Sembunyikan password' : 'Tampilkan password');
    button.setAttribute('aria-pressed', String(shown));
    button.innerHTML = shown ? EYE_OFF : EYE;
  };
  // Keep focus, and the phone keyboard, in the field on click or tap.
  button.addEventListener('mousedown', (e) => e.preventDefault());
  button.addEventListener('click', () => set(input.type === 'password'));
  set(false);
  input.after(button);
  return set;
}

const svg = (body: string) =>
  `<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
const EYE = svg('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>');
const EYE_OFF = svg(
  '<path d="M3 3l18 18"/><path d="M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-2.9 3.9M6.6 6.6C3.8 8.5 2 12 2 12s3.5 7 10 7a9.6 9.6 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
);
