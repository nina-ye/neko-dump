import React from 'react';
import Matter from 'matter-js';
import { Image, View } from 'react-native';
import { Entity } from '../entities/types';
import {
  collisionCategories,
  collisionGroups,
} from '../utils/constants';
import bag from '../../assets/sprites/bag.png';
import bagged from '../../assets/sprites/bagged.png';

const BagRenderer = ({
  body,
  isBagged,
}: {
  body: Matter.Body;
  isBagged: boolean;
}) => {
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
          width: 40,
          height: 40,
        }}
        resizeMode="contain"
        source={isBagged ? bagged : bag}
      />
    </View>
  );
};

const Bag = (
  world: Matter.World,
  pos: { x: number; y: number },
): Entity => {
  const initialBag = Matter.Bodies.rectangle(pos.x, pos.y, 35, 35, {
    label: 'Bag',
    isStatic: true,
    collisionFilter: {
      category: collisionCategories.bag,
      group: collisionGroups.bag,
      mask: collisionCategories.poop,
    },
  });
  Matter.World.add(world, initialBag);

  return {
    body: initialBag,
    renderer: BagRenderer,
    type: 'bag',
    isBagged: false,
    destroyTicker: 10,
  };
};

export default Bag;
