import React from 'react';
import Matter from 'matter-js';
import { View, Image } from 'react-native';
import { Entity } from '../entities/types';
import {
  collisionCategories,
  collisionGroups,
} from '../utils/constants';
import poop from '../../assets/sprites/poop.png';

const PoopRenderer = ({ body }: { body: Matter.Body }) => {
  const widthBody = body.bounds.max.x - body.bounds.min.x;
  const heightBody = body.bounds.max.y - body.bounds.min.y;

  // get center of body
  const xBody = body.position.x - widthBody / 2;
  const yBody = body.position.y - heightBody / 2;

  return (
    <Image
      source={poop}
      style={{
        width: 40,
        height: 40,
        resizeMode: 'contain',
        position: 'absolute',
        left: xBody,
        top: yBody,
      }}
    />
  );
};

const Poop = (
  world: Matter.World,
  pos: { x: number; y: number },
): Entity => {
  const initialPoop = Matter.Bodies.rectangle(pos.x, pos.y, 30, 30, {
    label: 'Poop',
    frictionAir: 0.02,
    collisionFilter: {
      category: collisionCategories.poop,
      group: collisionGroups.poop,
      mask: collisionCategories.farmer,
    },
  });
  Matter.World.add(world, initialPoop);

  return {
    body: initialPoop,
    renderer: PoopRenderer,
    type: 'poop',
  };
};

export default Poop;