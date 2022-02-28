import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { StatusBar } from 'expo-status-bar';
import { Accelerometer } from 'expo-sensors';
import entities from './src/entities';
import Physics from './src/systems/physics';
import { DEVICE_WIDTH } from './src/utils/constants';
import { Subscription } from 'expo-sensors/build/Pedometer';

export default function Game() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState<any>(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [accelerometerSubscription, setAccelerometerSubscription] =
    useState<null | Subscription>(null);
  const [accelerometerDataX, setAccelerometerDataX] = useState(0);

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

  // Accelerometer.addListener(({ x }) => {
  //   const currentXPos = entities.Farmer.body.position.x;
  //   let xDelta = x;

  //   if (
  //     (currentXPos >= DEVICE_WIDTH - 25 && x > 0) ||
  //     (currentXPos <= 25 && x < 0)
  //   ) {
  //     xDelta = 0;
  //   }

  //   Matter.Body.translate(entities.Farmer.body, {
  //     x: xDelta,
  //     y: 0,
  //   });
  // });

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 40,
          fontWeight: 'bold',
          margin: 20,
        }}
      >
        {currentPoints}
      </Text>
      <GameEngine
        ref={(ref: any) => {
          setGameEngine(ref);
        }}
        systems={[
          (entities: any, args: any) =>
            Physics(accelerometerDataX, entities, args),
        ]}
        entities={entities()}
        running={running}
        onEvent={(e: any) => {
          switch (e.type) {
            case 'game_over':
              setRunning(false);
              gameEngine.stop();
              break;
            case 'new_point':
              setCurrentPoints(currentPoints + 1);
          }
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <StatusBar style="auto" hidden={true} />
      </GameEngine>

      {!running ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'black',
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
            onPress={() => {
              setRunning(true);
              gameEngine.swap(entities());
              setCurrentPoints(0);
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 30,
              }}
            >
              START GAME
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

// export default function App() {
//   const [running, setRunning] = useState(false);
//   const [gameEngine, setGameEngine] = useState<any>(null);
//   const [currentPoints, setCurrentPoints] = useState(0);

//   useEffect(() => {
//     setRunning(false);
//   }, []);

//   return (
//     <View style={{ flex: 1 }}>
//       <Text
//         style={{
//           textAlign: 'center',
//           fontSize: 40,
//           fontWeight: 'bold',
//           margin: 20,
//         }}
//       >
//         {currentPoints}
//       </Text>
//       <GameEngine
//         ref={(ref: any) => {
//           setGameEngine(ref);
//         }}
//         systems={[Physics]}
//         entities={entities()}
//         running={running}
//         onEvent={(e: any) => {
//           switch (e.type) {
//             case 'game_over':
//               setRunning(false);
//               gameEngine.stop();
//               break;
//             case 'new_point':
//               setCurrentPoints(currentPoints + 1);
//           }
//         }}
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//         }}
//       >
//         <StatusBar style="auto" hidden={true} />
//       </GameEngine>

//       {!running ? (
//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <TouchableOpacity
//             style={{
//               backgroundColor: 'black',
//               paddingHorizontal: 30,
//               paddingVertical: 10,
//             }}
//             onPress={() => {
//               setRunning(true);
//               gameEngine.swap(entities());
//               setCurrentPoints(0);
//             }}
//           >
//             <Text
//               style={{
//                 fontWeight: 'bold',
//                 color: 'white',
//                 fontSize: 30,
//               }}
//             >
//               START GAME
//             </Text>
//           </TouchableOpacity>
//         </View>
//       ) : null}
//     </View>
//   );
// }
