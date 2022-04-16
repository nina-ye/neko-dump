import Matter from 'matter-js';

import { getPipeSizePosPair } from '../utils/random';
import { DEVICE_WIDTH } from '../utils/constants';
import { Accelerometer } from 'expo-sensors';

const Physics = (
  accelerometerDataX: number,
  entities: any,
  {
    touches,
    time,
    dispatch,
  }: { touches: any; time: any; dispatch: any },
) => {
  let engine = entities.physics.engine;

  const currentXPos = entities.farmer.body.position.x;
  let xDelta = accelerometerDataX * 15;

  if (
    (currentXPos >= DEVICE_WIDTH - 40 && accelerometerDataX > 0) ||
    (currentXPos <= 40 && accelerometerDataX < 0)
  ) {
    xDelta = 0;
  }

  Matter.Body.translate(entities.farmer.body, {
    x: xDelta,
    y: 0,
  });

  Matter.Engine.update(engine, time.delta);

  Matter.Events.on(engine, 'collisionStart', (event) => {
    dispatch({ type: 'game_over' });
  });

  return entities;
};

export default Physics;
