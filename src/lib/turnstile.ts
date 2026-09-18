/**
 * Cloudflare Turnstile for the two public forms (the OpsScore gate and the brief).
 *
 * Both keys come from the Cloudflare dashboard. While they are unset the checks are skipped, so
 * local work, previews, and the current production deploy keep working until the keys are added.
 */
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * Server side of the check. Returns false only when Cloudflare says the token is bad: if the
 * secret is unset the form is not protected yet, and if Cloudflare cannot be reached we let the
 * submission through rather than lose a lead to an outage upstream.
 */
export async function verifyTurnstile(token: unknown, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== 'string' || !token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip && ip !== 'unknown') body.set('remoteip', ip);
  try {
    const res = await fetch(VERIFY_URL, { method: 'POST', body, signal: AbortSignal.timeout(5000) });
    const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] };
    if (!data.success) console.warn('[turnstile] rejected', data['error-codes']);
    return data.success === true;
  } catch (err) {
    console.error('[turnstile] verification unreachable, letting the submission through', err);
    return true;
  }
}
