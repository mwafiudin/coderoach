/**
 * The username a new admin account gets when none is typed: the part of the email before the @.
 * Payload's forgot-password form only takes a username once username login is on, so an account
 * without one has no way to reset its password (ADR 0011).
 */
export function defaultUsername(email: string | null | undefined): string | undefined {
  const local = email?.split('@')[0]?.toLowerCase().replace(/[^a-z0-9._-]/g, '');
  return local || undefined;
}
