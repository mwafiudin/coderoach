import { withPayload } from '@payloadcms/next/withPayload';

const isProd = process.env.NODE_ENV === 'production';

/**
 * Content security policy for the public site. The admin and the API are left out: Payload ships
 * its own inline assets and the API returns JSON. Scripts stay inline-allowed because Next's
 * bootstrap is inline, but only our own origin and the three services we actually load can supply
 * script files: Turnstile, GA4, and the Meta pixel.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${isProd ? '' : " 'unsafe-eval'"} https://challenges.cloudflare.com https://www.googletagmanager.com https://connect.facebook.net`,
  "connect-src 'self' https://challenges.cloudflare.com https://www.google-analytics.com https://region1.google-analytics.com https://connect.facebook.net",
  'frame-src https://challenges.cloudflare.com',
].join('; ');

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  ...(isProd ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' }] : []),
];

const cspHeader = [{ key: 'Content-Security-Policy', value: csp }];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Vercel Blob storage URLs
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/', headers: cspHeader },
      { source: '/:path((?!admin|api).*)', headers: cspHeader },
    ];
  },
};

export default withPayload(nextConfig);
