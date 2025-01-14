import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

function NumberContainer({children}) {
    return <View style={styles.container}>
        <Text style={styles.numberText}>{children}</Text>
    </View>
}

export default NumberContainer;

const styles = StyleSheet.create({
    container: {
        padding: 24,
        margin: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    numberText: {
        color: Colors.accent500,
        fontSize: 60,
        fontWeight:'bold'
    }
});