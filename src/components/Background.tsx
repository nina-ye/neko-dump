import React from 'react';
import Matter from 'matter-js';
import { View, Image } from 'react-native';
import { Entity } from '../entities/types';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from '../utils/constants';
import background from '../../assets/sprites/background.png';

const IMAGE_WIDTH = 500;
const IMAGE_HEIGHT = 2000;

export const getScaledImageHeight = (width: number) =>
  IMAGE_HEIGHT * (width / IMAGE_WIDTH);

const BackgroundRenderer = ({ body }: { body: Matter.Body }) => {
  const widthBody = body.bounds.max.x - body.bounds.min.x;
  const heightBody = body.bounds.max.y - body.bounds.min.y;

  // get center of body
  const xBody = body.position.x - widthBody / 2;
  const yBody = body.position.y - heightBody / 2;

  const scaledImageHeight = getScaledImageHeight(widthBody);

  return (
    <View
      style={{
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: scaledImageHeight,
        overflow: 'hidden',
        zIndex: -1000,
      }}
    >
      <Image
        style={{ width: widthBody, height: scaledImageHeight }}
        resizeMode="cover"
        source={background}
      />
    </View>
  );
};

const Background = (
  world: Matter.World,
  pos: { y: number },
): Entity => {
  const initialBackground = Matter.Bodies.rectangle(
    DEVICE_WIDTH / 2,
    pos.y,
    DEVICE_WIDTH,
    DEVICE_HEIGHT,
    {
      label: 'Background',
      isStatic: true,
      collisionFilter: {
        mask: 0,
      },
    },
  );
  Matter.World.add(world, initialBackground);

  return {
    body: initialBackground,
    renderer: BackgroundRenderer,
    type: 'background',
  };
};

export default Background;
