import { Dimensions } from 'react-native';

export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const DEVICE_WIDTH = Dimensions.get('window').width;

export const collisionCategories = {
  girl: 1,
  fou: 2,
  ame: 2,
  poop: 4,
  background: 8,
};

export const collisionGroups = {
  fou: -1,
  ame: -1,
  poop: -2,
  background: -4,
};
