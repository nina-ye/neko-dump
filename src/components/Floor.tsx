import React from 'react';
import Matter from 'matter-js';
import { View } from 'react-native';

const Floor = ({ body }: { body: Matter.Body }) => {
  const widthBody = body.bounds.max.x - body.bounds.min.x;
  const heightBody = body.bounds.max.y - body.bounds.min.y;

  // get center of body
  const xBody = body.position.x - widthBody / 2;
  const yBody = body.position.y - heightBody / 2;

  return (
    <View
      style={{
        backgroundColor: 'green',
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
) => {
  const initialFloor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: 'Floor', isStatic: true },
  );
  Matter.World.add(world, initialFloor);

  return {
    body: initialFloor,
    pos,
    renderer: Floor,
  };
};
