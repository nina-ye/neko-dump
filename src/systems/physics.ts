import Matter from 'matter-js';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../utils/constants';
import { getScaledImageHeight } from '../components/Background';
import {
  Entities,
  GirlEntity,
  BackgroundEntity,
} from '../entities/types';
import {
  collisionGroups,
  collisionCategories,
} from '../utils/constants';

const BACKGROUND_SPEED = 1 / 800;

const Physics = (
  accelerometerDataX: number,
  entities: Entities,
  { time, dispatch }: { touches: any; time: any; dispatch: any },
) => {
  let engine = entities.physics.engine;

  const girlEntity = entities.girl as GirlEntity;
  const currentGirlXPos = girlEntity.body.position.x;
  let girlXDelta = accelerometerDataX * 20;
  if (
    (currentGirlXPos >= DEVICE_WIDTH - 40 &&
      accelerometerDataX > 0) ||
    (currentGirlXPos <= 40 && accelerometerDataX < 0)
  ) {
    girlXDelta = 0;
  }

  Matter.Body.translate(girlEntity.body, {
    x: girlXDelta,
    y: 0,
  });

  const backgroundYDelta = DEVICE_HEIGHT * BACKGROUND_SPEED;

  const background1Entity = entities.background1 as BackgroundEntity;
  const background2Entity = entities.background2 as BackgroundEntity;

  const scaledImageHeight = getScaledImageHeight(DEVICE_WIDTH);
  if (
    background1Entity.body.position.y >=
    DEVICE_HEIGHT + DEVICE_HEIGHT / 2
  ) {
    Matter.Body.setPosition(background1Entity.body, {
      x: background1Entity.body.position.x,
      y:
        background2Entity.body.position.y -
        scaledImageHeight +
        backgroundYDelta,
    });
  } else {
    Matter.Body.translate(background1Entity.body, {
      x: 0,
      y: backgroundYDelta,
    });
  }

  if (
    background2Entity.body.position.y >=
    DEVICE_HEIGHT + DEVICE_HEIGHT / 2
  ) {
    Matter.Body.setPosition(background2Entity.body, {
      x: background2Entity.body.position.x,
      y:
        background1Entity.body.position.y -
        scaledImageHeight +
        backgroundYDelta,
    });
  } else {
    Matter.Body.translate(background2Entity.body, {
      x: 0,
      y: backgroundYDelta,
    });
  }

  for (let key of Object.keys(entities)) {
    const entity = entities[key];

    if (entity.type === 'cat' || entity.type === 'poop') {
      Matter.Body.setVelocity(entity.body, entity.body.velocity);
    }

    if (entity.type === 'bag') {
      if (entity.isBagged && entity.destroyTicker) {
        Matter.Body.translate(entity.body, {
          x: entity.destroyTicker % 2 === 0 ? 5 : -5,
          y: 0,
        });
        entity.destroyTicker--;
      } else if (entity.isBagged && !entity.destroyTicker) {
        Matter.Composite.remove(entities.physics.world, entity.body);
        delete entities[key];

        dispatch({ type: 'new_point' });
      } else {
        Matter.Body.translate(entity.body, { x: 0, y: -5 });
      }
    }
  }

  Matter.Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach(
      (pair: { bodyA: Matter.Body; bodyB: Matter.Body }) => {
        if (
          (pair.bodyA.label === 'Bag' ||
            pair.bodyA.label === 'Poop') &&
          (pair.bodyB.label === 'Bag' || pair.bodyB.label === 'Poop')
        ) {
          const poop =
            pair.bodyA.label === 'Poop' ? pair.bodyA : pair.bodyB;
          const bag =
            pair.bodyA.label === 'Bag' ? pair.bodyA : pair.bodyB;

          const poopToDelete = Object.keys(entities).find((key) => {
            const entity = entities[key];
            return (
              entity.type === 'poop' && entity.body.id === poop.id
            );
          });
          const bagToUpdate = Object.values(entities).find(
            (entity) => {
              return (
                entity.type === 'bag' && entity.body.id === bag.id
              );
            },
          );

          if (
            poopToDelete &&
            bagToUpdate &&
            bagToUpdate.type === 'bag' &&
            !bagToUpdate.isBagged
          ) {
            Matter.Composite.remove(entities.physics.world, poop);
            delete entities[poopToDelete];

            bagToUpdate.isBagged = true;
            bagToUpdate.body.collisionFilter = {
              category: collisionCategories.bag,
              group: collisionGroups.bag,
              mask: 0,
            };
          }
        } else {
          (entities.girl as GirlEntity).pose = 'lose';
          dispatch({ type: 'game_over' });
        }
      },
    );
  });

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
