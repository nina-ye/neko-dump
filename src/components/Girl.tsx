import React from 'react';
import Matter from 'matter-js';
import { Image, View } from 'react-native';
import { Entity } from '../entities/types';
import { collisionCategories } from '../utils/constants';
import girlDefault from '../../assets/sprites/girl_default.png';
import girlToss from '../../assets/sprites/girl_toss.png';
import girlLose from '../../assets/sprites/girl_lose.png';

export type Pose = 'default' | 'toss' | 'lose';

const GirlRenderer = ({
  body,
  pose,
}: {
  body: Matter.Body;
  pose: Pose;
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
          width: 200 * 0.3,
          height: 350 * 0.3,
        }}
        resizeMode="contain"
        source={
          pose === 'toss'
            ? girlToss
            : pose === 'lose'
            ? girlLose
            : girlDefault
        }
      />
    </View>
  );
};

const Girl = (
  world: Matter.World,
  pos: { x: number; y: number },
): Entity => {
  const initialGirl = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    200 * 0.2,
    350 * 0.2,
    {
      label: 'Girl',
      isStatic: true,
      collisionFilter: {
        category: collisionCategories.girl,
        mask:
          collisionCategories.fou |
          collisionCategories.ame |
          collisionCategories.poop,
      },
    },
  );
  Matter.World.add(world, initialGirl);

  return {
    body: initialGirl,
    renderer: GirlRenderer,
    pose: 'default',
    type: 'girl',
  };
};

export default Girl;
