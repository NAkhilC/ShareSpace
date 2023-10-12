import React, { useState, useEffect } from "react";
import { Image, View, Pressable, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../../styles/mainCss";
import { themeColors } from "../../styles/base";
export default function UploadImage({ formData, setFormData }) {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const addImage = async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 5,
      allowsMultipleSelection: true,
    }).then((images) => {
      for (let image of images.assets) {
        setImages((images) => [...images, image.uri]);
      }
      setFormData({ ...formData, images: images.assets });
    }).catch((e) => {
      (e);
    })
  };

  const removeImage = (index) => {
    let imagesCopy = [...images];
    imagesCopy.splice(index, 1);
    setImages([...imagesCopy]);
    setFormData({ ...formData, images: images.assets });
  };

  return (
    <View>
      <View>
        {images.length > 0 && (
          <View style={styles.bodyView}>
            {images?.map((imageuri, index) => {
              return (
                <View key={index} style={styles.imagePicked}>
                  <Image key={index} source={{ uri: imageuri }} resizeMode="cover" style={styles.eachImagePicked} />
                  <View style={styles.removelinkOnImgae}>
                    <Pressable onPress={() => removeImage(index)}>
                      <Text style={{ fontSize: 15, color: "blue", textDecorationLine: "underline" }}>Remove</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>

      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn}>
          <AntDesign name="camera" size={27} color={themeColors.primary} style={{ marginTop: 5 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const imageUploaderStyles = StyleSheet.create({
  uploadBtnContainer: {
    backgroundColor: 'white', height: 45, borderRadius: 5, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, marginTop: 10, borderWidth: 1, borderColor: 'gray',
    shadowRadius: 4,
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
