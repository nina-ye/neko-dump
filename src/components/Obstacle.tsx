import React from 'react';
import Matter from 'matter-js';
import { View } from 'react-native';

const Obstacle = ({ body }: { body: Matter.Body }) => {
  const widthBody = body.bounds.max.x - body.bounds.min.x;
  const heightBody = body.bounds.max.y - body.bounds.min.y;

  // get center of body
  const xBody = body.position.x - widthBody / 2;
  const yBody = body.position.y - heightBody / 2;

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: 'red',
        borderStyle: 'solid',
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    />
  );
};

export default (
  world: Matter.World,
  pos: { x: number; y: number },
  size: { width: number; height: number },
  label: string,
) => {
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label, isStatic: true },
  );
  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    pos,
    renderer: Obstacle,
  };
};
