import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import fou from '../../assets/sprites/fou_web.gif';

interface StartViewProps {
  onPressStart: () => void;
}

export const StartView = ({ onPressStart }: StartViewProps) => (
  <View style={styles.startContainer}>
    <Text style={styles.title}>Neko Dump</Text>
    <Image source={fou} />
    <TouchableOpacity
      style={styles.startButton}
      onPress={onPressStart}
    >
      <Text style={styles.startText}>Start</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  startContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 40,
  },
  startButton: {
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
  startText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
  },
});
