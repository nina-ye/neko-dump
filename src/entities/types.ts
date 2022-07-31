import React from 'react';
import Matter from 'matter-js';
import { Pose as GirlPose } from '../components/Girl';

export interface Physics {
  engine: Matter.Engine;
  world: Matter.World;
  type: 'physics';
}

export interface BaseEntity {
  body: Matter.Body;
  renderer: ({ body }: { body: Matter.Body }) => React.ReactElement;
}

export interface CatEntity extends BaseEntity {
  type: 'cat';
  lastPoop: null | number;
}

export interface PoopEntity extends BaseEntity {
  type: 'poop';
}

export interface BagEntity extends Omit<BaseEntity, 'renderer'> {
  type: 'bag';
  isBagged: boolean;
  destroyTicker: number;
  renderer: ({
    body,
    isBagged,
  }: {
    body: Matter.Body;
    isBagged: boolean;
  }) => React.ReactElement;
}

export interface GirlEntity extends Omit<BaseEntity, 'renderer'> {
  type: 'girl';
  pose: GirlPose;
  level: number;
  lastLevelIncrease: number | null;
  renderer: ({
    body,
    pose,
  }: {
    body: Matter.Body;
    pose: GirlPose;
  }) => React.ReactElement;
}

export interface BackgroundEntity extends BaseEntity {
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
