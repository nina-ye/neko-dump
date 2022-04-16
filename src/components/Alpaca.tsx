import React from 'react';
import Matter from 'matter-js';
import { View, Image } from 'react-native';
import alpaca from '../../assets/sprites/alpaca_1.png';
import { Entity } from '../entities/types';
import {
  collisionCategories,
  collisionGroups,
} from '../utils/constants';

const AlpacaRenderer = ({ body }: { body: Matter.Body }) => {
  const widthBody = body.bounds.max.x - body.bounds.min.x;
  const heightBody = body.bounds.max.y - body.bounds.min.y;

  // get center of body
  const xBody = body.position.x - widthBody / 2;
  const yBody = body.position.y - heightBody / 2;

  return (
    <Image
      source={alpaca}
      style={{
        width: 80 * 0.8,
        height: 90 * 0.8,
        resizeMode: 'contain',
        position: 'absolute',
        left: xBody,
        top: yBody,
      }}
    />
  );
};

const Alpaca = (
  world: Matter.World,
  pos: { x: number; y: number },
): Entity => {
  const initialAlpaca = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    80 * 0.6,
    90 * 0.6,
    {
      label: 'Alpaca',
      frictionAir: 0.03,
      collisionFilter: {
        category: collisionCategories.alpaca,
        group: collisionGroups.alpaca,
        mask: collisionCategories.farmer,
      },
    },
  );
  Matter.World.add(world, initialAlpaca);

  return {
    body: initialAlpaca,
    renderer: AlpacaRenderer,
    lastPoop: null,
    type: 'alpaca',
  };
};

export default Alpaca;
