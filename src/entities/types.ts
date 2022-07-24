import React from 'react';
import Matter from 'matter-js';
import { Pose as GirlPose } from '../components/Girl';

interface Physics {
  engine: Matter.Engine;
  world: Matter.World;
  type: 'physics';
}

interface BaseEntity {
  body: Matter.Body;
  renderer: ({ body }: { body: Matter.Body }) => React.ReactElement;
}

interface CatEntity extends BaseEntity {
  type: 'cat';
  lastPoop: null | number;
}

interface PoopEntity extends BaseEntity {
  type: 'poop';
}

interface BagEntity extends Omit<BaseEntity, 'renderer'> {
  type: 'bag';
  isBagged: boolean;
  renderer: ({
    body,
    isBagged,
  }: {
    body: Matter.Body;
    isBagged: boolean;
  }) => React.ReactElement;
}

interface GirlEntity extends Omit<BaseEntity, 'renderer'> {
  type: 'girl';
  pose: GirlPose;
  renderer: ({
    body,
    pose,
  }: {
    body: Matter.Body;
    pose: GirlPose;
  }) => React.ReactElement;
}

interface BackgroundEntity extends BaseEntity {
  type: 'background';
}

export type Entity =
  | CatEntity
  | PoopEntity
  | GirlEntity
  | BagEntity
  | Physics
  | BackgroundEntity;

export interface Entities {
  physics: Physics;
  [key: string]: Entity;
}
