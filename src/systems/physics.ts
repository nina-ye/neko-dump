import Matter from 'matter-js';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../utils/constants';
import { getScaledImageHeight } from '../components/Background';

const BACKGROUND_SPEED = 1 / 800;

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

  const currentGirlXPos = entities.girl.body.position.x;
  let girlXDelta = accelerometerDataX * 20;
  if (
    (currentGirlXPos >= DEVICE_WIDTH - 40 &&
      accelerometerDataX > 0) ||
    (currentGirlXPos <= 40 && accelerometerDataX < 0)
  ) {
    girlXDelta = 0;
  }

  const backgroundYDelta = DEVICE_HEIGHT * BACKGROUND_SPEED;

  Matter.Body.translate(entities.girl.body, {
    x: girlXDelta,
    y: 0,
  });

  const scaledImageHeight = getScaledImageHeight(DEVICE_WIDTH);
  if (
    entities.background1.body.position.y >=
    DEVICE_HEIGHT + DEVICE_HEIGHT / 2
  ) {
    Matter.Body.setPosition(entities.background1.body, {
      x: entities.background1.body.position.x,
      y:
        entities.background2.body.position.y -
        scaledImageHeight +
        backgroundYDelta,
    });
  } else {
    Matter.Body.translate(entities.background1.body, {
      x: 0,
      y: backgroundYDelta,
    });
  }

  if (
    entities.background2.body.position.y >=
    DEVICE_HEIGHT + DEVICE_HEIGHT / 2
  ) {
    Matter.Body.setPosition(entities.background2.body, {
      x: entities.background2.body.position.x,
      y:
        entities.background1.body.position.y -
        scaledImageHeight +
        backgroundYDelta,
    });
  } else {
    Matter.Body.translate(entities.background2.body, {
      x: 0,
      y: backgroundYDelta,
    });
  }

  Matter.Engine.update(engine, time.delta);

  Matter.Events.on(engine, 'collisionStart', (event) => {
    dispatch({ type: 'game_over' });
  });

  return entities;
};

export default Physics;
