import { StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";

function Card({ children }) {
  return <View style={styles.inputContainer}>{children}</View>;
}

export default Card;

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    borderRadius: 8,
    marginTop: 36,
    padding: 16,
    backgroundColor: Colors.primary800,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
