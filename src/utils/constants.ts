import { Dimensions } from 'react-native';

export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const DEVICE_WIDTH = Dimensions.get('window').width;

export const collisionCategories = {
  girl: 1,
  fou: 2,
  poop: 3,
};

export const collisionGroups = {
  fou: -1,
  poop: -2,
};
