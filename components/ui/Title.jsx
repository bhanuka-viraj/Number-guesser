import { StyleSheet, Text, Platform } from "react-native";
import Colors from "../../constants/Colors";

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: 'open-sans-bold',
    color:  'white',
    textAlign: "center",
    // borderWidth: Platform.OS === 'ios' ? 0 : 2,
    borderWidth: Platform.select({
      ios:0,              // can also create two files for each like (Title.ios.js & Title.android.js)
      android: 2          // but when importing, only the Title.js should be imported. reactnative will identify the platform and get the right file
    }),
    borderColor: 'white',
    borderRadius: 8,
    padding: 12,
    maxWidth: '80%',
    minWidth: 300
  },
});
