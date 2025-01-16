import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import { use, useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandNumBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandNumBetween(min, max, exclude);
  }
  return rndNum;
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const { height, width } = useWindowDimensions();
  const initialGuess = generateRandNumBetween(
    minBoundary,
    maxBoundary,
    userNumber
  );

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  const guessRoundsLength = guessRounds.length;

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRoundsLength);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    }

    if (direction === "higher") {
      minBoundary = currentGuess;
    }

    // console.log(minBoundary, maxBoundary);
    const newRandnumber = generateRandNumBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRandnumber);
    setGuessRounds((prevGuessRounds) => [...prevGuessRounds, newRandnumber]);
  }

  const deviceWidth = Dimensions.get("window").width;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card>
        <View>
          <InstructionText style={styles.instructionText}>
            {" "}
            Higher or lower ?{" "}
          </InstructionText>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                <Ionicons
                  name="remove"
                  size={deviceWidth < 370 ? 15 : 24}
                  color="white"
                />
              </PrimaryButton>
            </View>

            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
                <Ionicons
                  name="add"
                  size={deviceWidth < 370 ? 15 : 24}
                  color="white"
                />
              </PrimaryButton>
            </View>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 375) {
    content = (
      <>
        <InstructionText style={styles.instructionText}>
          Higher or lower ?
        </InstructionText>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons
                name="remove"
                size={deviceWidth < 370 ? 15 : 24}
                color="white"
              />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
              <Ionicons
                name="add"
                size={deviceWidth < 370 ? 15 : 24}
                color="white"
              />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundItem={guessRoundsLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item.toString()}
        />
      </View>
    </View>
  );
}

export default GameScreen;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 25,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    paddingTop: deviceWidth < 370 ? 10 : 40,
  },
  buttonsContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: deviceWidth < 370 ? 5 : 12,
    marginTop: deviceWidth < 370 ? 2 : 10,
  },
  listContainer: {
    flex: 1,
  },
});
