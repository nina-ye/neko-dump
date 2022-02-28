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

  // touches
  //   .filter((t: any) => t.type === 'press')
  //   .forEach((t: any) => {
  //     Matter.Body.setVelocity(entities.Bird.body, {
  //       x: 0,
  //       y: -8,
  //     });
  //   });

  // Accelerometer.addListener(({ x }) => {
  const currentXPos = entities.Farmer.body.position.x;
  let xDelta = accelerometerDataX * 15;

  if (
    (currentXPos >= DEVICE_WIDTH - 40 && accelerometerDataX > 0) ||
    (currentXPos <= 40 && accelerometerDataX < 0)
  ) {
    xDelta = 0;
  }

  Matter.Body.translate(entities.Farmer.body, {
    x: xDelta,
    y: 0,
  });
  // });

  Matter.Engine.update(engine, time.delta);

  // for (let index = 1; index <= 2; index++) {
  //   if (
  //     entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 &&
  //     !entities[`ObstacleTop${index}`].point
  //   ) {
  //     entities[`ObstacleTop${index}`].point = true;
  //     dispatch({ type: 'new_point' });
  //   }

  //   if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
  //     const pipeSizePos = getPipeSizePosPair(DEVICE_WIDTH * 0.9);

  //     Matter.Body.setPosition(
  //       entities[`ObstacleTop${index}`].body,
  //       pipeSizePos.pipeTop.pos,
  //     );
  //     Matter.Body.setPosition(
  //       entities[`ObstacleBottom${index}`].body,
  //       pipeSizePos.pipeBottom.pos,
  //     );

  //     entities[`ObstacleTop${index}`].point = false;
  //   }

  //   Matter.Body.translate(entities[`ObstacleTop${index}`].body, {
  //     x: -3,
  //     y: 0,
  //   });
  //   Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {
  //     x: -3,
  //     y: 0,
  //   });
  // }

  // Matter.Events.on(engine, 'collisionStart', (event) => {
  //   dispatch({ type: 'game_over' });
  // });

  return entities;
};

export default Physics;
