import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import ame from '../../assets/sprites/ame_web.gif';

interface GameOverViewProps {
  onPressTryAgain: () => void;
  score: number;
  best: number;
}

export const GameOverView = ({
  onPressTryAgain,
  score,
  best,
}: GameOverViewProps) => (
  <View style={styles.gameOverContainer}>
    <Image source={ame} />
    <Text style={styles.scoreText}>Score: {score}</Text>
    <Text style={styles.scoreText}>Best: {best}</Text>
    <TouchableOpacity
      style={styles.tryAgainButton}
      onPress={onPressTryAgain}
    >
      <Text style={styles.tryAgainText}>Try Again</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  gameOverContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5);',
    borderRadius: 20,
  },
  scoreText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'white',
  },
  tryAgainButton: {
    backgroundColor: 'black',
    borderRadius: 25,
    borderColor: 'white',
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
  },
  tryAgainText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
  },
});
