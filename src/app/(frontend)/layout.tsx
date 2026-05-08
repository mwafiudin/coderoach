import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { JetBrains_Mono } from 'next/font/google';
import '../globals.css';

const satoshi = localFont({
  src: '../../../public/fonts/Satoshi-Variable.ttf',
  variable: '--font-sans',
  display: 'swap',
  weight: '100 900',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Coderoach Studio — Engineering that thinks like an operator.',
  description:
    'Senior product engineering studio in Jakarta. We build software, automate workflows, and ship analytics for companies that need more than a vendor.',
  icons: { icon: '/assets/coderoach_logo.svg' },
};

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${satoshi.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
