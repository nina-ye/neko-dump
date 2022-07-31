import Matter from 'matter-js';
import { GameEngineSystem } from 'react-native-game-engine';
import { Entities } from '../entities/types';
import Ame from '../components/Ame';
import Fou from '../components/Fou';
import Poop from '../components/Poop';
import {
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  LVL_RATE_INCREASE,
  DEFAULT_CAT_DROP_RATE,
  CAT_DROP_RATE_DECREASE,
  DEFAULT_AME_DROP_RATE,
  AME_DROP_RATE_INCREASE,
  DEFAULT_FOU_POOP_RATE,
  FOU_POOP_RATE_DECREASE,
  DEFAULT_AME_POOP_RATE,
  AME_POOP_TIME_DECREASE,
  MAX_LEVEL,
} from '../utils/constants';

let fouCount = 0;
let ameCount = 0;
let poopCount = 0;
let lastCatDrop: null | number = null;

export const AddCat: GameEngineSystem = (
  entities: Entities,
  { time },
) => {
  const world = entities.physics.world;
  const x = 40 + Math.random() * (DEVICE_WIDTH - 80);
  const y = -60;

  if (
    entities.girl.type === 'girl' &&
    !entities.girl.lastLevelIncrease
  ) {
    entities.girl.lastLevelIncrease = time.current;
  }

  if (
    entities.girl.type === 'girl' &&
    time.current - (entities.girl.lastLevelIncrease ?? time.current) >
      LVL_RATE_INCREASE &&
    entities.girl.level < MAX_LEVEL
  ) {
    entities.girl.level += 1;
    entities.girl.lastLevelIncrease = time.current;
  }

  const level =
    entities.girl.type === 'girl' ? entities.girl.level : 0;

  const addAme =
    Math.random() <
    DEFAULT_AME_DROP_RATE + level * AME_DROP_RATE_INCREASE
      ? true
      : false;

  if (
    !lastCatDrop ||
    time.current - lastCatDrop >
      DEFAULT_CAT_DROP_RATE - level * CAT_DROP_RATE_DECREASE
  ) {
    if (addAme) {
      entities[`ame-${ameCount++}`] = Ame(world, { x, y });
    } else {
      entities[`fou-${fouCount++}`] = Fou(world, { x, y });
    }

    lastCatDrop = time.current;
  }

  return entities;
};

export const AddPoop: GameEngineSystem = (entities, { time }) => {
  const level =
    entities.girl.type === 'girl' ? entities.girl.level : 0;

  for (let key of Object.keys(entities)) {
    if (
      (key.startsWith('fou') &&
        (!entities[key].lastPoop ||
          time.current - entities[key].lastPoop >
            DEFAULT_FOU_POOP_RATE -
              level * FOU_POOP_RATE_DECREASE)) ||
      (key.startsWith('ame') &&
        (!entities[key].lastPoop ||
          time.current - entities[key].lastPoop >
            DEFAULT_AME_POOP_RATE - level * AME_POOP_TIME_DECREASE))
    ) {
      const world = entities.physics.world;
      const { x, y } = entities[key].body.position;

      entities[`poop-${poopCount++}`] = Poop(
        world,
        { x, y: y + 60 },
        key.startsWith('fou') ? 'fou' : 'ame',
      );
      entities[key].lastPoop = time.current;
    }
  }

  return entities;
};

export const RemoveObstacle: GameEngineSystem = (
  entities: Entities,
  { dispatch },
) => {
  const world = entities.physics.world;

  for (let key of Object.keys(entities)) {
    const entity = entities[key];

    if (
      (entity.type === 'poop' || entity.type === 'cat') &&
      entity.body.bounds.min.y > DEVICE_HEIGHT
    ) {
      Matter.Composite.remove(world, entity.body);

      delete entities[key];
      dispatch({ type: 'new_point' });
    }
  }

  return entities;
};
