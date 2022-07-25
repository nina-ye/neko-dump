import React from 'react';
import Matter from 'matter-js';
import { Image, View } from 'react-native';
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
    <View
      style={{
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
        overflow: 'visible',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        style={{
          width: 30,
          height: 30,
        }}
        resizeMode="contain"
        source={poop}
      />
    </View>
  );
};

const Poop = (
  world: Matter.World,
  pos: { x: number; y: number },
  cat: 'fou' | 'ame',
): Entity => {
  const initialPoop = Matter.Bodies.rectangle(pos.x, pos.y, 25, 25, {
    label: 'Poop',
    velocity: cat === 'fou' ? { x: 0, y: 3 } : { x: 0, y: 6 },
    frictionAir: cat === 'fou' ? 0.02 : 0.01,
    collisionFilter: {
      category: collisionCategories.poop,
      group: collisionGroups.poop,
      mask: collisionCategories.bag | collisionCategories.girl,
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
