/**
 * Email for the gate. It is optional, so it only has to be right when it is given: syntax, a length
 * cap, and a list of throwaway domains. Anything past that is proven by actually sending mail.
 */
const EMAIL = /^[a-z0-9._%+-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i;

const DISPOSABLE = new Set([
  '10minutemail.com', 'dispostable.com', 'emailondeck.com', 'fakeinbox.com', 'getnada.com',
  'guerrillamail.com', 'mailcatch.com', 'maildrop.cc', 'mailinator.com', 'mailnesia.com',
  'mintemail.com', 'mohmal.com', 'sharklasers.com', 'spamgourmet.com', 'temp-mail.org',
  'tempinbox.com', 'tempmail.com', 'tempr.email', 'throwawaymail.com', 'trashmail.com',
  'yopmail.com',
]);

export function normalizeEmail(input: string): string | null {
  const email = input.trim().toLowerCase();
  if (!email || email.length > 254 || !EMAIL.test(email)) return null;
  return email;
}

export const emailDomain = (email: string) => email.split('@')[1] ?? '';

export const isDisposableEmail = (email: string) => DISPOSABLE.has(emailDomain(email));
