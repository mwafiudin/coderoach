import * as migration_20260509_070704_init from './20260509_070704_init';
import * as migration_20260917_084810_opsscore from './20260917_084810_opsscore';
import * as migration_20260917_091659_opsscore_brief_link from './20260917_091659_opsscore_brief_link';

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
    name: '20260917_091659_opsscore_brief_link'
  },
];
