import React from 'react';
import Matter from 'matter-js';

interface Physics {
  engine: Matter.Engine;
  world: Matter.World;
  type: 'physics';
}

interface BaseEntity {
  body: Matter.Body;
  renderer: ({ body }: { body: Matter.Body }) => JSX.Element;
}

interface CatEntity extends BaseEntity {
  type: 'cat';
  lastPoop: null | number;
}

interface PoopEntity extends BaseEntity {
  type: 'poop';
}

interface GirlEntity extends BaseEntity {
  type: 'girl';
}

interface BackgroundEntity extends BaseEntity {
  type: 'background';
}

export type Entity =
  | CatEntity
  | PoopEntity
  | GirlEntity
  | Physics
  | BackgroundEntity;

export interface Entities {
  physics: Physics;
  [key: string]: Entity;
}
