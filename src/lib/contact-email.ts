/**
 * The studio's public inbox. Mail to it is forwarded by Cloudflare Email Routing on the
 * coderoach.id zone, so it only works while that zone has the routing MX records.
 *
 * The live site reads the address from the CMS (Contact → formLabels.emailFallback and the
 * footer links in Site Settings); this is the default and the fallback when those are empty.
 */
export const CONTACT_EMAIL = 'hello@coderoach.id';
