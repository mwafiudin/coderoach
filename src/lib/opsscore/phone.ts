/**
 * Indonesian mobile numbers for the gate: 08xxxxxxxxxx, 10–13 digits (brief §8).
 * Accepts +62 / 62 / 8 prefixes and separators; returns 62… for wa.me, or null.
 */
export function normalizePhone(input: string): string | null {
  let digits = input.replace(/\D/g, '');
  if (digits.startsWith('62')) digits = `0${digits.slice(2)}`;
  else if (digits.startsWith('8')) digits = `0${digits}`;
  return /^08\d{8,11}$/.test(digits) ? `62${digits.slice(1)}` : null;
}
