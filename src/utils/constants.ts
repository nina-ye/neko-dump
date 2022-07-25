import { Dimensions } from 'react-native';

export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const DEVICE_WIDTH = Dimensions.get('window').width;

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
