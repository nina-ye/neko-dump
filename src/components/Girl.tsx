import React from 'react';
import Matter from 'matter-js';
import { View, Image } from 'react-native';
import { Entity } from '../entities/types';
import { collisionCategories } from '../utils/constants';
import girl from '../../assets/sprites/girl_default.png';

const GirlRenderer = ({ body }: { body: Matter.Body }) => {
  const widthBody = body.bounds.max.x - body.bounds.min.x;
  const heightBody = body.bounds.max.y - body.bounds.min.y;

  // get center of body
  const xBody = body.position.x - widthBody / 2;
  const yBody = body.position.y - heightBody / 2;

  return (
    <Image
      source={girl}
      style={{
        width: 120 * 0.5,
        height: 160 * 0.5,
        resizeMode: 'contain',
        position: 'absolute',
        left: xBody,
        top: yBody,
      }}
    />
  );
};

const Girl = (
  world: Matter.World,
  pos: { x: number; y: number },
): Entity => {
  const initialGirl = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    120 * 0.4,
    160 * 0.4,
    {
      label: 'Girl',
      isStatic: true,
      collisionFilter: {
        category: collisionCategories.girl,
        mask:
          collisionCategories.fou |
          collisionCategories.ame |
          collisionCategories.poop,
      },
    },
  );
  Matter.World.add(world, initialGirl);

  return {
    body: initialGirl,
    renderer: GirlRenderer,
    type: 'girl',
  };
};

export default Girl;
