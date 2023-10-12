import { StyleSheet, Text, View, Button } from "react-native";
import { styles } from "../styles/mainCss";

export default function Header(props) {
  return (
    <View style={styles.header}>
      <View style={[styles.headerView, { marginLeft: props.chat }]}>
        <Text style={[styles.headerText, { fontSize: 20 }]}>{props.name ? props.name : "Home"}</Text>
      </View>
    </View>
  );
}
