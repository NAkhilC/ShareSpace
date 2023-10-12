import { StyleSheet, Text, View, Button, Image } from "react-native";
import { styles } from "../../styles/mainCss";
export default function ShowAdd({ navigation }) {
  return (
    <View style={styles.addGeneralMain}>
      <View style={styles.addGeneralDisplay}>
        {/* <View style={{ height: 40, marginLeft: 5 }}>
          <Text style={{ fontSize: 20 }}>Sponsored by Service Ontario</Text>
        </View> */}
        <View>
          <Image
            style={styles.infoImage}
            resizeMode="cover"
            src={"https://neillumsdenmpp.ca/hubfs/serviceontario1.jpeg"}
          ></Image>
        </View>
      </View>
    </View>
  );
}
