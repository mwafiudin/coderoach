import type { Metadata } from 'next';
import { LANDING_COPY } from '@/lib/opsscore/copy';
import { Quiz } from '../_components/Quiz';

export const metadata: Metadata = {
  title: LANDING_COPY.metaTitle,
  robots: { index: false, follow: false },
};

export default function OpsScoreQuizPage() {
  return <Quiz />;
}
