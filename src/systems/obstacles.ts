import Matter from 'matter-js';
import { GameEngineSystem } from 'react-native-game-engine';
import { Entities } from '../entities/types';
import Fou from '../components/Fou';
import Poop from '../components/Poop';
import { getPipeSizePosPair } from '../utils/random';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../utils/constants';
import { Accelerometer } from 'expo-sensors';

let fouCount = 0;
let poopCount = 0;
let lastDrop: null | number = null;

export const AddFou: GameEngineSystem = (
  entities: Entities,
  { time },
) => {
  const world = entities.physics.world;
  const x = Math.random() * (DEVICE_WIDTH - 45);
  const y = -60;

  if (!lastDrop || time.current - lastDrop > 2000) {
    entities[`fou-${fouCount++}`] = Fou(world, { x, y });

    lastDrop = time.current;
  }

  return entities;
};

export const AddPoop: GameEngineSystem = (entities, { time }) => {
  for (let key of Object.keys(entities)) {
    if (
      key.startsWith('fou') &&
      (!entities[key].lastPoop ||
        time.current - entities[key].lastPoop > 3000)
    ) {
      const world = entities.physics.world;
      const { x, y } = entities[key].body.position;

      entities[`poop-${poopCount++}`] = Poop(world, { x, y: y + 60 });
      entities[key].lastPoop = time.current;
    }
  }

  return entities;
};

export const RemoveObstacle: GameEngineSystem = (
  entities: Entities,
  { dispatch },
) => {
  for (let key of Object.keys(entities)) {
    const entity = entities[key];
    const world = entities.physics.world;

    if (
      (entity.type === 'poop' || entity.type === 'fou') &&
      entity.body.bounds.min.y > DEVICE_HEIGHT
    ) {
      Matter.Composite.remove(world, entity.body);

      delete entities[key];
      dispatch({ type: 'new_point' });
    }
  }

  return entities;
};
