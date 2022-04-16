import { Dimensions } from 'react-native';

export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const DEVICE_WIDTH = Dimensions.get('window').width;

export const collisionCategories = {
  farmer: 1,
  alpaca: 2,
  poop: 3,
};

export const collisionGroups = {
  alpaca: -1,
  poop: -2,
};
