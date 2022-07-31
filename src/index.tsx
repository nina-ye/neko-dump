import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { StatusBar } from 'expo-status-bar';
import { Accelerometer } from 'expo-sensors';
import { GameOverView } from './components/GameOverView';
import { StartView } from './components/StartView';
import entities from './entities';
import Physics from './systems/physics';
import { AddCat, RemoveObstacle, AddPoop } from './systems/obstacles';
import { TossBag, RemoveBag } from './systems/bag';
import { DEVICE_WIDTH } from './utils/constants';
import { Subscription } from 'expo-sensors/build/Pedometer';

export default function Game() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState<any>(null);
  const [currentScore, setCurrentPoints] = useState(0);
  const [accelerometerSubscription, setAccelerometerSubscription] =
    useState<null | Subscription>(null);
  const [accelerometerDataX, setAccelerometerDataX] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const _subscribeAccelerometer = () => {
    setAccelerometerSubscription(
      Accelerometer.addListener(({ x }) => {
        setAccelerometerDataX(x);
      }),
    );
  };

  const _unsubscribeAccelerometer = () => {
    accelerometerSubscription && accelerometerSubscription.remove();
    setAccelerometerSubscription(null);
  };

  useEffect(() => {
    setRunning(false);
    _subscribeAccelerometer();

    return () => _unsubscribeAccelerometer();
  }, []);

  const startGame = () => {
    setRunning(true);
    gameEngine.swap(entities());
    setCurrentPoints(0);
    setIsGameOver(false);
  };

  return (
    <View style={styles.container}>
      <GameEngine
        ref={(ref: any) => {
          setGameEngine(ref);
        }}
        systems={[
          (entities: any, args: any) =>
            Physics(accelerometerDataX, entities, args),
          AddCat,
          RemoveObstacle,
          AddPoop,
          TossBag,
          RemoveBag,
        ]}
        entities={entities()}
        running={running}
        onEvent={(e: any) => {
          switch (e.type) {
            case 'game_over':
              setRunning(false);
              if (currentScore > highScore) {
                setHighScore(currentScore);
              }
              gameEngine.stop();
              setIsGameOver(true);
              break;
            case 'new_point':
              setCurrentPoints(currentScore + 1);
          }
        }}
        style={styles.gameContainer}
      >
        <Text style={styles.currentScore}>{currentScore}</Text>

        <StatusBar hidden={true} />
      </GameEngine>

      {!running && !isGameOver && (
        <StartView onPressStart={startGame} />
      )}

      {!running && isGameOver && (
        <GameOverView
          onPressTryAgain={startGame}
          score={currentScore}
          best={highScore}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  currentScore: {
    position: 'absolute',
    top: 50,
    left: DEVICE_WIDTH / 2 - 20,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  splashScreenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: '30%',
    backgroundColor: 'rgba(0, 0, 0, 0.5);',
    borderRadius: 20,
  },
  score: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'white',
  },
  startGameButton: {
    backgroundColor: 'black',
    borderRadius: 25,
    borderColor: 'white',
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  startGameText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
  },
});
