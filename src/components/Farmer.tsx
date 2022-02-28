import React from 'react';
import Matter from 'matter-js';
import { View, Image } from 'react-native';
import farmer from '../../assets/sprites/farmer_1.png';

const Farmer = ({ body }: { body: Matter.Body }) => {
  const widthBody = body.bounds.max.x - body.bounds.min.x;
  const heightBody = body.bounds.max.y - body.bounds.min.y;

  // get center of body
  const xBody = body.position.x - widthBody / 2;
  const yBody = body.position.y - heightBody / 2;

  return (
    <Image
      source={farmer}
      style={{
        width: 60,
        height: 80,
        position: 'absolute',
        left: xBody,
        top: yBody,
        //width: widthBody,
        //height: heightBody,
      }}
    />
  );
};

export default (
  world: Matter.World,
  pos: { x: number; y: number },
  size: { width: number; height: number },
) => {
  const initialFarmer = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: 'Farmer', isStatic: true },
  );
  Matter.World.add(world, initialFarmer);

  return {
    body: initialFarmer,
    pos,
    renderer: Farmer,
  };
};
