import type { Project } from '@/payload-types';
import type { BespokeSlug } from '@/lib/portfolio/bespoke';
import { AkarKitaPage } from './akarkita/AkarKitaPage';
import { ChickenWowPage } from './chicken-wow/ChickenWowPage';
import { CoderoachOsPage } from './coderoach-os/CoderoachOsPage';
import { JedaPage } from './jeda/JedaPage';
import { LaportaPage } from './laporta/LaportaPage';
import { LocaScorePage } from './locascore/LocaScorePage';
import { RencanaRoPage } from './rencana-ro/RencanaRoPage';
import { RideDeckPage } from './ridedeck/RideDeckPage';
import { TheGlobalReviewPage } from './the-global-review/TheGlobalReviewPage';
import { ViralyticsPage } from './viralytics/ViralyticsPage';
import { YiheeCamPage } from './yiheecam/YiheeCamPage';

type BespokePage = (props: { project: Project }) => Promise<React.JSX.Element>;

const PAGES: Record<BespokeSlug, BespokePage> = {
  laporta: LaportaPage,
  jeda: JedaPage,
  yiheecam: YiheeCamPage,
  ridedeck: RideDeckPage,
  locascore: LocaScorePage,
  'the-global-review': TheGlobalReviewPage,
  'chicken-wow': ChickenWowPage,
  'coderoach-os': CoderoachOsPage,
  viralytics: ViralyticsPage,
  'rencana-ro': RencanaRoPage,
  akarkita: AkarKitaPage,
};

/**
 * Projects with a page of their own (ADR 0013), keyed by slug; which slugs may have one is tested
 * in lib/portfolio/bespoke.test.ts. Only the full page uses these: the overlay on /work and the
 * presentation keep the shared story template. The copy still comes from projects.ts through the
 * sync, so the permission gate applies here as to any other page.
 */
export const BESPOKE: Partial<Record<string, BespokePage>> = PAGES;
