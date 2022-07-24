import React from 'react';
import Matter from 'matter-js';
import { View, Image } from 'react-native';
import fou from '../../assets/sprites/fou.gif';
import { Entity } from '../entities/types';
import {
  collisionCategories,
  collisionGroups,
} from '../utils/constants';

const FouRenderer = ({ body }: { body: Matter.Body }) => {
  const widthBody = body.bounds.max.x - body.bounds.min.x;
  const heightBody = body.bounds.max.y - body.bounds.min.y;

  // get center of body
  const xBody = body.position.x - widthBody / 2;
  const yBody = body.position.y - heightBody / 2;

  return (
    <Image
      source={fou}
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

const Fou = (
  world: Matter.World,
  pos: { x: number; y: number },
): Entity => {
  const initialFou = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    80 * 0.6,
    90 * 0.6,
    {
      label: 'Fou',
      velocity: { x: 0, y: 2 },
      frictionAir: 0.03,
      collisionFilter: {
        category: collisionCategories.fou,
        group: collisionGroups.fou,
        mask: collisionCategories.girl,
      },
    },
  );
  Matter.World.add(world, initialFou);

  return {
    body: initialFou,
    renderer: FouRenderer,
    lastPoop: null,
    type: 'cat',
  };
};

export default Fou;
