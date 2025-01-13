import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  function pickedNumberhandler(pickedNumber) {
    setUserNumber(pickedNumber);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberhandler} />;

  if (userNumber) {
    screen = <GameScreen />;
  }

  return (
    <LinearGradient
      colors={["#4e0329", "#ddb52f"]} // Gradient colors
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
