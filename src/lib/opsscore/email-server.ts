/**
 * Server-only half of the email check: does the domain accept mail at all? One DNS lookup catches
 * the typos that still parse, like "@gmail.con". Answers are cached, and a lookup that times out
 * counts as fine, so a slow resolver never costs a lead.
 */
import { promises as dns } from 'node:dns';

const TTL_MS = 24 * 60 * 60 * 1000;
const MAX_CACHED = 500;
const cache = new Map<string, { ok: boolean; at: number }>();

export async function domainAcceptsMail(domain: string): Promise<boolean> {
  const key = domain.toLowerCase();
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.ok;

  let ok = true;
  try {
    const records = await Promise.race([
      dns.resolveMx(key),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 2500)),
    ]);
    ok = records.length > 0;
  } catch (err) {
    // ENOTFOUND and ENODATA are answers: the domain has no mail. Anything else is our problem.
    const code = (err as NodeJS.ErrnoException).code;
    ok = code !== 'ENOTFOUND' && code !== 'ENODATA';
  }

  if (cache.size >= MAX_CACHED) cache.clear();
  cache.set(key, { ok, at: Date.now() });
  return ok;
}
