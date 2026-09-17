/**
 * Business profile collected during the quiz: name and business name up front, industry, revenue,
 * and team size at the start of their sections, WhatsApp at the gate. Stored on the lead, never on
 * the session, so the public share page cannot reach it. Pure; shared by client and server.
 */
import { EMPLOYEE_OPTIONS, INDUSTRY_OPTIONS, REVENUE_OPTIONS, type Option } from './questions';

export type ProfileField = 'name' | 'brand' | 'industry' | 'revenue' | 'employees';
export type Profile = Partial<Record<ProfileField, string>>;

export const PROFILE_TEXT_FIELDS: ProfileField[] = ['name', 'brand'];

export const PROFILE_OPTIONS: Partial<Record<ProfileField, Option[]>> = {
  industry: INDUSTRY_OPTIONS,
  revenue: REVENUE_OPTIONS,
  employees: EMPLOYEE_OPTIONS,
};

const TEXT_MAX = { name: 80, brand: 120 } as const;
export const TEXT_MIN = 2;

/** Drops unknown keys, empty text, and invalid option ids, so a partial save never wipes stored data. */
export function sanitizeProfile(input: unknown): Profile {
  const profile: Profile = {};
  if (!input || typeof input !== 'object' || Array.isArray(input)) return profile;
  const record = input as Record<string, unknown>;
  for (const field of ['name', 'brand'] as const) {
    const value = record[field];
    if (typeof value === 'string' && value.trim().length >= TEXT_MIN) {
      profile[field] = value.trim().replace(/\s+/g, ' ').slice(0, TEXT_MAX[field]);
    }
  }
  for (const field of ['industry', 'revenue', 'employees'] as const) {
    const value = record[field];
    if (typeof value === 'string' && PROFILE_OPTIONS[field]!.some((o) => o.id === value)) profile[field] = value;
  }
  return profile;
}

export const isProfileAnswered = (field: ProfileField, profile: Profile) =>
  Object.keys(sanitizeProfile({ [field]: profile[field] })).length > 0;

/** Shapes Indonesian mobile numbers while typing: 0812-3456-7890. */
export function formatPhoneInput(input: string) {
  let digits = input.replace(/\D/g, '');
  if (digits.startsWith('62')) digits = `0${digits.slice(2)}`;
  else if (digits.startsWith('8')) digits = `0${digits}`;
  digits = digits.slice(0, 13);
  return [digits.slice(0, 4), digits.slice(4, 8), digits.slice(8)].filter(Boolean).join('-');
}
