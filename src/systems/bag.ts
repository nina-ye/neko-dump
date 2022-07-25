import Matter from 'matter-js';
import { GameEngineSystem } from 'react-native-game-engine';
import { Entities } from '../entities/types';
import Bag from '../components/Bag';
import { DEVICE_HEIGHT } from '../utils/constants';

const TOSS_SPEED = 10;
let bagCount = 0;
let tossTick = 0;

export const TossBag = (
  entities: any,
  { touches }: { touches: any; time: any; dispatch: any },
) => {
  let tossBag = false;
  touches
    .filter((t: any) => t.type === 'press')
    .forEach(() => {
      if (!tossBag) {
        tossBag = true;
        tossTick = TOSS_SPEED;
        entities.girl.pose = 'toss';

        const world = entities.physics.world;
        const { x, y } = entities.girl.body.position;

        entities[`bag-${bagCount++}`] = Bag(world, { x, y: y - 60 });
      }
    });

  if (tossTick) {
    tossTick--;
  } else {
    if (entities.girl.pose !== 'lose') {
      entities.girl.pose = 'default';
    }
  }

  return entities;
};

export const RemoveBag: GameEngineSystem = (
  entities: Entities,
  { dispatch },
) => {
  const world = entities.physics.world;

  for (let key of Object.keys(entities)) {
    const entity = entities[key];

    if (
      entity.type === 'bag' &&
      (entity.body.bounds.max.y < 0 ||
        entity.body.bounds.min.y > DEVICE_HEIGHT)
    ) {
      Matter.Composite.remove(world, entity.body);

      delete entities[key];
    }
  }

  return entities;
};
