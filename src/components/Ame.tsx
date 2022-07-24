import React from 'react';
import Matter from 'matter-js';
import { View, Image } from 'react-native';
import ame from '../../assets/sprites/ame.gif';
import { Entity } from '../entities/types';
import {
  collisionCategories,
  collisionGroups,
} from '../utils/constants';

const AmeRenderer = ({ body }: { body: Matter.Body }) => {
  const widthBody = body.bounds.max.x - body.bounds.min.x;
  const heightBody = body.bounds.max.y - body.bounds.min.y;

  // get center of body
  const xBody = body.position.x - widthBody / 2;
  const yBody = body.position.y - heightBody / 2;

  return (
    <Image
      source={ame}
      style={{
        width: 80 * 0.8,
        height: 90 * 0.8,
        resizeMode: 'contain',
        position: 'absolute',
        left: xBody,
        top: yBody,
        zIndex: 2,
      }}
    />
  );
};

const Ame = (
  world: Matter.World,
  pos: { x: number; y: number },
): Entity => {
  const initialAme = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    80 * 0.6,
    90 * 0.6,
    {
      label: 'Ame',
      velocity: { x: 0, y: 3 },
      frictionAir: 0.02,
      collisionFilter: {
        category: collisionCategories.ame,
        group: collisionGroups.ame,
        mask: collisionCategories.girl,
      },
    },
  );
  Matter.World.add(world, initialAme);

  return {
    body: initialAme,
    renderer: AmeRenderer,
    lastPoop: null,
    type: 'cat',
  };
};

export default Ame;
