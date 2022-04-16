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

interface AlpacaEntity extends BaseEntity {
  type: 'alpaca';
  lastPoop: null | number;
}

interface PoopEntity extends BaseEntity {
  type: 'poop';
}

interface FarmerEntity extends BaseEntity {
  type: 'farmer';
}

export type Entity =
  | AlpacaEntity
  | PoopEntity
  | FarmerEntity
  | Physics;

export interface Entities {
  physics: Physics;
  [key: string]: Entity;
}
