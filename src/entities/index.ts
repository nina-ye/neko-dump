import Matter from 'matter-js';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../utils/constants';
import { Entities } from './types';
import Girl from '../components/Girl';
import Background, {
  getScaledImageHeight,
} from '../components/Background';

const entities = (): Entities => {
  // sleeping can improve stability and performance, but often at expense of
  // accuracy
  let engine = Matter.Engine.create({
    enableSleeping: false,
    gravity: { y: 0.4 },
  });

  let world = engine.world;

  const scaledImageHeight = getScaledImageHeight(DEVICE_WIDTH);

  return {
    physics: { engine, world, type: 'physics' },

    girl: Girl(world, {
      x: DEVICE_WIDTH / 2,
      y: DEVICE_HEIGHT - 100,
    }),

    background1: Background(world, {
      y: DEVICE_HEIGHT / 2,
    }),
    background2: Background(world, {
      y: DEVICE_HEIGHT / 2 - scaledImageHeight,
    }),
  };
};

export default entities;
