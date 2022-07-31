import { Dimensions } from 'react-native';

export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const DEVICE_WIDTH = Dimensions.get('window').width;

export const LVL_RATE_INCREASE = 10000;
export const DEFAULT_CAT_DROP_RATE = 2000;
export const CAT_DROP_RATE_DECREASE = 100;
export const DEFAULT_FOU_POOP_RATE = 3000;
export const FOU_POOP_RATE_DECREASE = 150;
export const DEFAULT_AME_POOP_RATE = 1000;
export const AME_POOP_TIME_DECREASE = 50;
export const DEFAULT_AME_DROP_RATE = 0.25;
export const AME_DROP_RATE_INCREASE = 0.05;

export const MIN_LEVEL = 0;
export const MAX_LEVEL = 10;

export const collisionCategories = {
  girl: 0b0001,
  fou: 0b0010,
  ame: 0b0010,
  poop: 0b0100,
  bag: 0b1000,
};

export const collisionGroups = {
  fou: -1,
  ame: -1,
  poop: -2,
  bag: -8,
};
