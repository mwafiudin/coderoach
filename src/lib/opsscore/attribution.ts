/**
 * First-touch attribution for OpsScore (brief §8). The landing page stores UTM params, click ids,
 * and the external referrer in a first-party cookie for 30 days; the create-session handler copies
 * it into assessment_sessions.utm. Shared by client and server, so no framework imports here.
 */

export const ATTRIBUTION_COOKIE = 'opsscore_attr';
export const ATTRIBUTION_MAX_AGE_DAYS = 30;

export const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'gclid',
] as const;

export type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number] | 'referrer', string>>;

const MAX_LENGTH = 300;

/** Keeps known keys with non-empty string values, trimmed to a sane length. */
export function sanitizeAttribution(input: unknown): Attribution {
  const out: Attribution = {};
  if (!input || typeof input !== 'object' || Array.isArray(input)) return out;
  const record = input as Record<string, unknown>;
  for (const key of [...ATTRIBUTION_KEYS, 'referrer'] as const) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) out[key] = value.trim().slice(0, MAX_LENGTH);
  }
  return out;
}

export function parseAttributionCookie(value: string | undefined): Attribution {
  if (!value) return {};
  try {
    return sanitizeAttribution(JSON.parse(decodeURIComponent(value)));
  } catch {
    return {};
  }
}

const readCookie = (name: string) =>
  document.cookie
    .split('; ')
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);

/**
 * Browser only. Stores UTM params and click ids from the current URL, plus an external referrer.
 * A new campaign visit overwrites the cookie; a later organic visit does not erase a paid one.
 */
export function captureAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = sanitizeAttribution(Object.fromEntries(ATTRIBUTION_KEYS.map((key) => [key, params.get(key)])));
  const referrer =
    document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : undefined;
  const existing = parseAttributionCookie(readCookie(ATTRIBUTION_COOKIE));

  if (!Object.keys(fromUrl).length && (!referrer || Object.keys(existing).length)) return existing;

  const value = sanitizeAttribution({ ...fromUrl, referrer });
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${ATTRIBUTION_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${
    ATTRIBUTION_MAX_AGE_DAYS * 24 * 60 * 60
  }; Path=/; SameSite=Lax${secure}`;
  return value;
}
