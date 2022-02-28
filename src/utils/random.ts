import { DEVICE_HEIGHT, DEVICE_WIDTH } from './constants';

export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
export const getPipeSizePosPair = (addToPosX = 0) => {
  let yPosTop = -getRandom(300, DEVICE_HEIGHT - 100);

  const pipeTop = {
    pos: { x: DEVICE_WIDTH + addToPosX, y: yPosTop },
    size: { height: DEVICE_HEIGHT * 2, width: 75 },
  };
  const pipeBottom = {
    pos: {
      x: DEVICE_WIDTH + addToPosX,
      y: DEVICE_HEIGHT * 2 + 200 + yPosTop,
    },
    size: { height: DEVICE_HEIGHT * 2, width: 75 },
  };

  return { pipeTop, pipeBottom };
};
