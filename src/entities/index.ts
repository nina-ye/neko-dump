import Matter from 'matter-js';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../utils/constants';
import Bird from '../components/Bird';
import Floor from '../components/Floor';
import Obstacle from '../components/Obstacle';
import Farmer from '../components/Farmer';
import { getPipeSizePosPair } from '../utils/random';

// restart app if needed
export default () => {
  // sleeping can improve stability and performance, but often at expense of
  // accuracy
  let engine = Matter.Engine.create({
    enableSleeping: false,
    gravity: { y: 0.4 },
  });

  let world = engine.world;

  const pipeSizePosA = getPipeSizePosPair();
  const pipeSizePosB = getPipeSizePosPair(DEVICE_WIDTH * 0.9);

  return {
    physics: { engine, world },

    Farmer: Farmer(
      world,
      { x: DEVICE_WIDTH / 2, y: DEVICE_HEIGHT - 200 },
      { height: 80, width: 60 },
    ),

    // Bird: Bird(
    //   world,
    //   { x: DEVICE_WIDTH / 2, y: 500 },
    //   { height: 40, width: 40 },
    // ),

    // ObstacleTop1: Obstacle(
    //   world,
    //   pipeSizePosA.pipeTop.pos,
    //   pipeSizePosA.pipeTop.size,
    //   'ObstacleTop1',
    // ),
    // ObstacleBottom1: Obstacle(
    //   world,
    //   pipeSizePosA.pipeBottom.pos,
    //   pipeSizePosA.pipeBottom.size,
    //   'ObstacleBottom1',
    // ),

    // ObstacleTop2: Obstacle(
    //   world,
    //   pipeSizePosB.pipeTop.pos,
    //   pipeSizePosB.pipeTop.size,
    //   'ObstacleTop2',
    // ),
    // ObstacleBottom2: Obstacle(
    //   world,
    //   pipeSizePosB.pipeBottom.pos,
    //   pipeSizePosB.pipeBottom.size,
    //   'ObstacleBottom2',
    // ),

    // Floor: Floor(
    //   world,
    //   { x: DEVICE_WIDTH / 2, y: DEVICE_HEIGHT },
    //   { height: 50, width: DEVICE_WIDTH },
    // ),
  };
};
