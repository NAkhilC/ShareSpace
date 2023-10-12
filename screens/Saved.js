import { styles } from "../styles/mainCss";
import { Text, View, Image, Pressable, TouchableHighlight, SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { themeColors } from "../styles/base";
import { useState } from "react";
import Header from "./Header";
import { useIsFocused } from "@react-navigation/native";
import React from "react";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Saved({ navigation }) {
  const [isSaved, setIsSaved] = useState(true);
  const isFocused = useIsFocused();
  const [saved, setSaved] = useState();
  const [interested, setInterested] = useState();
  React.useEffect(() => {
    if (isFocused) {
      axios.get(`${process.env.EXPO_PUBLIC_API_URL}/items/getSavedInterested`).then((items) => {
        if (items.data.status === 200) {
          if (items.data && items.data.items) {
            setInterested(items.data.items);
          }
        }
      });
    }
  }, [isFocused]);

  return (
    <View style={styles.containerFlex}>
      <View style={styles.topBottomFlex}>
        <Header name={"Saved"}></Header>
      </View>

      <View style={styles.body}>
        <KeyboardAwareScrollView>
          {isSaved ? (
            <View>
              {interested && interested.length > 0 ? (
                <View style={styles.savedInterestedView}>
                  {interested.map((item, index) => {
                    return (
                      <TouchableHighlight
                        key={index}
                        onPress={() => navigation.navigate("ViewItem", { data: item.listingId })}
                        underlayColor="#DDDDDD"
                      >
                        <View
                          style={[
                            styles.savedInterestedViewItem,
                            { backgroundColor: index % 2 === 0 ? "white" : themeColors.peimarynext },
                          ]}
                        >
                          <View style={[styles.itemImage, styles.savedInterestedViewItemImage]}>
                            <Image style={styles.infoImage} resizeMode="cover" src={item.images[0]}></Image>
                          </View>
                          <View style={styles.savedInterestedViewItemText}>
                            {item.title ? <Text style={{ marginTop: 5 }}>{item.title}</Text> : ""}
                            {item.address && item.address.addressText ? (
                              <View style={styles.addressFlexItem}>
                                <Ionicons name="pin" size={35} color="#7a9e9f" />
                                <Text style={{ flex: 1 }}>{item.address.addressText}</Text>
                              </View>
                            ) : (
                              ""
                            )}
                          </View>
                        </View>
                      </TouchableHighlight>
                    );
                  })}
                </View>
              ) : (
                <View>
                  <Text>Interested items not found</Text>
                </View>
              )}
            </View>
          ) : (
            <View>
              {saved && saved.length > 0 ? (
                <View style={styles.savedInterestedView}>
                  {saved.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={[
                          styles.savedInterestedViewItem,
                          { backgroundColor: index % 2 === 0 ? "white" : themeColors.peimarynext },
                        ]}
                      >
                        <View style={[styles.itemImage, styles.savedInterestedViewItemImage]}>
                          <Image style={styles.infoImage} resizeMode="cover" src={item.images[0]}></Image>
                        </View>
                        <View style={styles.savedInterestedViewItemText}>
                          {item.title ? <Text style={{ marginTop: 5 }}>{item.title}</Text> : ""}
                          {item.address && item.address.addressText ? (
                            <View style={styles.addressFlexItem}>
                              <Ionicons name="pin" size={35} color="#7a9e9f" />
                              <Text style={{ flex: 1 }}>{item.address.addressText}</Text>
                            </View>
                          ) : (
                            ""
                          )}
                        </View>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <View>
                  <Text>Saved items not found</Text>
                </View>
              )}
            </View>
          )}
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}
