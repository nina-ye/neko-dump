import React from 'react';
import Matter from 'matter-js';
import { View, Image } from 'react-native';
import { Entity } from '../entities/types';
import { collisionCategories } from '../utils/constants';
import farmer from '../../assets/sprites/farmer_1.png';

const FarmerRenderer = ({ body }: { body: Matter.Body }) => {
  const widthBody = body.bounds.max.x - body.bounds.min.x;
  const heightBody = body.bounds.max.y - body.bounds.min.y;

  // get center of body
  const xBody = body.position.x - widthBody / 2;
  const yBody = body.position.y - heightBody / 2;

  return (
    <Image
      source={farmer}
      style={{
        width: 120 * 0.5,
        height: 160 * 0.5,
        resizeMode: 'contain',
        position: 'absolute',
        left: xBody,
        top: yBody,
        //width: widthBody,
        //height: heightBody,
      }}
    />
  );
};

const Farmer = (
  world: Matter.World,
  pos: { x: number; y: number },
): Entity => {
  const initialFarmer = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    120 * 0.4,
    160 * 0.4,
    {
      label: 'Farmer',
      isStatic: true,
      collisionFilter: {
        category: collisionCategories.farmer,
        mask: collisionCategories.alpaca | collisionCategories.poop,
      },
    },
  );
  Matter.World.add(world, initialFarmer);

  return {
    body: initialFarmer,
    renderer: FarmerRenderer,
    type: 'farmer',
  };
};

export default Farmer;
