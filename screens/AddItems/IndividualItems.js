import { Text, View, Button, Image, TextInput, Pressable, ScrollView, SafeAreaView } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "../../styles/mainCss";
import UploadImage from "../components/UploadImage";
export default function IndividaulItems() {
  const [count, setCount] = useState(1);

  var eachItems = [];
  const removeItem = (i) => {
    (eachItems.length);
    eachItems.splice(i, 1);
    (eachItems.length);
    // let cc = count - 1;
    setCount(eachItems.length);
  };

  const addItem = () => {
    let cc = count + 1;
    setCount(cc);
  };

  for (let i = 0; i < count; i++) {
    eachItems.push(
      <View key={i}>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 15 }}> Item number : {i + 1}</Text>
          <Text style={styles.individaulItemsTextLabel}>Title of item</Text>
          <TextInput style={styles.addItemTitleInput} />

          <View>
            <UploadImage> </UploadImage>
          </View>

          <Text style={styles.individaulItemsTextLabel}>Description</Text>
          <TextInput style={styles.addItemTitleIndividualTextInput} multiline={true} />

          <Text style={styles.individaulItemsTextLabel}>Price</Text>
          <TextInput style={styles.addItemTitleInput} />

          <View style={{ flexDirection: "row" }}>
            <Pressable style={styles.button}>
              <Text style={styles.text} onPress={() => addItem()}>
                Add
              </Text>
            </Pressable>
            <Pressable style={styles.button}>
              <Text style={styles.text} onPress={() => removeItem(i)}>
                Remove
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.individaulItems}>
      <Text style={{ fontSize: 20 }}>Add Items Individually</Text>
      <Text style={{ fontSize: 20, margin: 5 }} onPress={() => setCount(count + 1)}>
        <Ionicons name="add-outline" size={20} color="#7a9e9f" />
        Add Item
      </Text>
      {count > 0 ? <View style={styles.eachItem}>{eachItems}</View> : ""}
    </View>
  );
}
