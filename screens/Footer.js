import { Text, View, Button } from "react-native";
import { styles } from "../styles/mainCss";

export default function Footer({ navigation }) {
  return (
    <View style={styles.footer}>
      <View style={styles.footerSub}>
        <Text>Home</Text>
      </View>
      <View style={styles.footerSub}>
        <Text>Saved</Text>
      </View>
      <View style={styles.footerSub}>
        <Text>Chats</Text>
      </View>
      <View
        style={styles.footerSub}
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <Text>Profile</Text>
      </View>
    </View>
  );
}
