/**
 * Indonesian mobile numbers for the gate: 08xxxxxxxxxx, 10–13 digits (brief §8).
 * Accepts +62 / 62 / 8 prefixes and separators; returns 62… for wa.me, or null.
 */
export function normalizePhone(input: string): string | null {
  let digits = input.replace(/\D/g, '');
  if (digits.startsWith('62')) digits = `0${digits.slice(2)}`;
  else if (digits.startsWith('8')) digits = `0${digits}`;
  if (!/^08\d{8,11}$/.test(digits) || isPlaceholderNumber(digits)) return null;
  return `62${digits.slice(1)}`;
}

/** 081111111111 and 081234567890 pass the format but are nobody's number. */
function isPlaceholderNumber(digits: string) {
  const rest = digits.slice(2);
  if (/^(\d)\1+$/.test(rest)) return true;
  const steps = new Set(
    Array.from(rest.slice(1), (digit, i) => (Number(digit) - Number(rest[i]) + 10) % 10),
  );
  return steps.size === 1 && (steps.has(1) || steps.has(9));
}
