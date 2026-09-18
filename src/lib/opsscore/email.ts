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

// The domains Indonesian owners actually use, so a one-letter slip can be offered back to them.
const COMMON_DOMAINS = [
  'gmail.com', 'yahoo.com', 'yahoo.co.id', 'hotmail.com', 'outlook.com', 'outlook.co.id',
  'icloud.com', 'live.com', 'aol.com', 'proton.me', 'protonmail.com',
];

/** "nama@gmial.com" → "nama@gmail.com". Returns null when the domain is fine or nothing is close. */
export function suggestEmail(input: string): string | null {
  const email = normalizeEmail(input);
  if (!email) return null;
  const domain = emailDomain(email);
  if (COMMON_DOMAINS.includes(domain)) return null;
  const near = COMMON_DOMAINS.find((candidate) => editDistance(domain, candidate) <= 2);
  return near ? `${email.slice(0, email.length - domain.length)}${near}` : null;
}

/** Levenshtein, two rows deep: the domains compared here are short. */
function editDistance(a: string, b: string) {
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    previous = current;
  }
  return previous[b.length];
}

export const isDisposableEmail = (email: string) => DISPOSABLE.has(emailDomain(email));
