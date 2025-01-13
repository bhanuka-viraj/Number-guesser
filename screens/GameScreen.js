import { View, Text, StyleSheet } from "react-native";
import Title from "../components/Title";

function GameScreen() {
  return (
    <View style={styles.screen}>
    <Title>Opponent's Guess</Title>
      <View>
        <Text> HIgher or lower ? </Text>
      </View>

          <View>
              <Text>Log rounds</Text>
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 50
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ddb52f',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#ddb52f',
        padding:12
    }
});
