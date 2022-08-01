import React from 'react';
import Matter from 'matter-js';
import { Image, View } from 'react-native';
import fou from '../../assets/sprites/fou_web.gif';
import { Entity } from '../entities/types';
import {
  collisionCategories,
  collisionGroups,
} from '../utils/constants';

const IMAGE_WIDTH = 150;
const IMAGE_HEIGHT = 160;

const FouRenderer = ({ body }: { body: Matter.Body }) => {
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
          width: IMAGE_WIDTH * 0.4,
          height: IMAGE_HEIGHT * 0.4,
        }}
        resizeMode="contain"
        source={fou}
      />
    </View>
  );
};

const Fou = (
  world: Matter.World,
  pos: { x: number; y: number },
): Entity => {
  const initialFou = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    IMAGE_WIDTH * 0.3,
    IMAGE_HEIGHT * 0.3,
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
