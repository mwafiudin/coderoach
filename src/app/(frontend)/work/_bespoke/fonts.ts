import { Barlow_Condensed, Montserrat, Nunito_Sans } from 'next/font/google';

/**
 * The faces each product uses in its own app (ADR 0013). Declared here, not in app/fonts.ts, so
 * only the project page that uses one downloads it.
 */
export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-laporta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-jeda',
  display: 'swap',
  weight: ['400', '600', '700'],
});

export const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-yiheecam',
  display: 'swap',
  weight: ['500', '600'],
});
