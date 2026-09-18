import { ScoringConsole } from '../../_components/ScoringConsole';

/**
 * The quiz ends on the scoring console, and the report is rendered per request. Showing the same
 * console here instead of the site spinner keeps that last beat going until the report arrives.
 */
export default function Loading() {
  return (
    <div className="min-h-screen grid place-items-center bg-paper-100 px-8">
      <ScoringConsole />
    </div>
  );
}
