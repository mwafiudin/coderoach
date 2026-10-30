import { Archivo, Barlow_Condensed, Cardo, Inter, Montserrat, Nunito, Nunito_Sans, Poppins, PT_Sans } from 'next/font/google';

/**
 * The faces each product uses in its own app (ADR 0013). Declared here, not in app/fonts.ts, so
 * only the project page that uses one downloads it. Montserrat is shared by Laporta and The Global
 * Review, so its variable is named after the face.
 */
export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
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

/** Variable in weight and width: RideDeck's tape labels and AkarKita's display type open the width axis (their DESIGN.md files). */
export const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
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

/** The Global Review sets its reading text, decks, and dates in Cardo (the-global-review-website layout.tsx). */
export const cardo = Cardo({
  subsets: ['latin'],
  variable: '--font-tgr-serif',
  display: 'swap',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

/**
 * Chicken Wow: heavy Poppins for headlines and buttons, Nunito for body text, as on chickenwow.id
 * (read from its pages, 14 Oct 2026). Body weights are their own instance so LocaScore's page does
 * not preload them.
 */
export const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-cw-display',
  display: 'swap',
  weight: ['700', '800', '900'],
});

export const nunitoBody = Nunito({
  subsets: ['latin'],
  variable: '--font-cw-body',
  display: 'swap',
  weight: ['400', '700'],
});

/** Viralytics sets body text, labels, and numbers in Inter; Satoshi, its display face, is already the site's. */
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-viralytics',
  display: 'swap',
  weight: ['400', '500', '600'],
});
