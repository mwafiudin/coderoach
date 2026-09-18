import * as migration_20260509_070704_init from './20260509_070704_init';
import * as migration_20260917_084810_opsscore from './20260917_084810_opsscore';
import * as migration_20260917_091659_opsscore_brief_link from './20260917_091659_opsscore_brief_link';
import * as migration_20260917_102014_opsscore_progressive_lead from './20260917_102014_opsscore_progressive_lead';
import * as migration_20260917_141624_opsscore_benchmark_exclude from './20260917_141624_opsscore_benchmark_exclude';
import * as migration_20260918_073500_opsscore_lead_contact from './20260918_073500_opsscore_lead_contact';

export const migrations = [
  {
    up: migration_20260509_070704_init.up,
    down: migration_20260509_070704_init.down,
    name: '20260509_070704_init',
  },
  {
    up: migration_20260917_084810_opsscore.up,
    down: migration_20260917_084810_opsscore.down,
    name: '20260917_084810_opsscore',
  },
  {
    up: migration_20260917_091659_opsscore_brief_link.up,
    down: migration_20260917_091659_opsscore_brief_link.down,
    name: '20260917_091659_opsscore_brief_link',
  },
  {
    up: migration_20260917_102014_opsscore_progressive_lead.up,
    down: migration_20260917_102014_opsscore_progressive_lead.down,
    name: '20260917_102014_opsscore_progressive_lead',
  },
  {
    up: migration_20260917_141624_opsscore_benchmark_exclude.up,
    down: migration_20260917_141624_opsscore_benchmark_exclude.down,
    name: '20260917_141624_opsscore_benchmark_exclude',
  },
  {
    up: migration_20260918_073500_opsscore_lead_contact.up,
    down: migration_20260918_073500_opsscore_lead_contact.down,
    name: '20260918_073500_opsscore_lead_contact',
  },
];
