import * as migration_20260509_070704_init from './20260509_070704_init';

export const migrations = [
  {
    up: migration_20260509_070704_init.up,
    down: migration_20260509_070704_init.down,
    name: '20260509_070704_init'
  },
];
