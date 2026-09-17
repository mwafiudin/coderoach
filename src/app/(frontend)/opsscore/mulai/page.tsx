import type { Metadata } from 'next';
import { LANDING_COPY } from '@/lib/opsscore/copy';
import { Quiz } from '../_components/Quiz';

// The layout and the not-found shell read CMS globals, and Railway builds cannot reach the database.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: LANDING_COPY.metaTitle,
  robots: { index: false, follow: false },
};

export default function OpsScoreQuizPage() {
  return <Quiz />;
}
