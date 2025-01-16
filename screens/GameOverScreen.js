import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/Colors";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ roundsNumber, userNumber, onRestart }) {
  const { height, width } = useWindowDimensions();
  let imageSize = 300;
  let margin= 36;

  if (width < 370) {
    imageSize = 150;
    margin= 15;
  }

  if (height < 400) {
    imageSize = 100;
    margin = 15;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    margin: margin
  };
  return (
    <ScrollView style={styles.screen}>
<View style={styles.rootContainer}>
      <Title>Game Over</Title>
      <View style={[styles.imagecontainer, imageStyle]}>
        <Image
          source={require("../assets/images/success.png")}
          style={styles.image}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
        rounds to guess the number
        <Text style={styles.highlight}> {userNumber}</Text>
      </Text>

      <PrimaryButton onPress={onRestart}>Start New Game</PrimaryButton>
    </View>
    </ScrollView>
    
  );
}

export default GameOverScreen;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  screen: {
    flex:1  
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imagecontainer: {
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: deviceWidth < 370 ? 20 : 24,
    textAlign: "center",
    marginVertical: 24,
  },
  highlight: {
    color: Colors.primary500,
  },
});
