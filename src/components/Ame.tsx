import React from 'react';
import Matter from 'matter-js';
import { Image, View } from 'react-native';
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
          width: 150 * 0.4,
          height: 160 * 0.4,
        }}
        resizeMode="contain"
        source={ame}
      />
    </View>
  );
};

const Ame = (
  world: Matter.World,
  pos: { x: number; y: number },
): Entity => {
  const initialAme = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    150 * 0.3,
    160 * 0.3,
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
