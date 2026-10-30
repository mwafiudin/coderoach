import { Archivo, Barlow_Condensed, Montserrat, Nunito, Nunito_Sans, PT_Sans } from 'next/font/google';

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

/** Variable in weight and width: RideDeck's tape labels open the width axis to 118 (rideDeck DESIGN.md). */
export const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-ridedeck',
  display: 'swap',
  axes: ['wdth'],
});

/** LocaScore pairs a rounded display face for its numbers with an upright body face (locascore DESIGN.md). */
export const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-locascore-display',
  display: 'swap',
  weight: ['700', '800'],
});

export const ptSans = PT_Sans({
  subsets: ['latin'],
  variable: '--font-locascore',
  display: 'swap',
  weight: ['400', '700'],
});
