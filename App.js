import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import Colors from "./constants/Colors";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOVer] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  function pickedNumberhandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOVer(false);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberhandler} />;

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOVer(true);
    setGuessRounds(numberOfRounds);
  }

  function onRestartHandler() {
    setGuessRounds(0);
    setUserNumber(null);
  }

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onRestart={onRestartHandler}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]} // Gradient colors
      start={{ x: 0, y: 0 }} // Start point (top-left)
      end={{ x: 1, y: 1 }} // End point (bottom-right)
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/backgroundimage.jpg")}
        imageStyle={styles.backGroundImage}
        resizeMode="cover"
        style={styles.rootScreen}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backGroundImage: {
    opacity: 0.15,
  },
});
