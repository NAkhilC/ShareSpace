import { View, Text } from "react-native";
import MapView, { Circle } from "react-native-maps";
import Slider from "@react-native-community/slider";
import { themeColors } from "../../styles/base";
import { useState } from "react";

export default function MapAreaSelector(props) {
  const [kmsRange, setKmsRange] = useState(props.formData?.range ? props.formData.range : 5);

  //props.formData.range = kmsRange;
  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }}
        initialRegion={{
          latitude: props.formData?.address?.latitude,
          longitude: props.formData?.address?.longitude
        }}
        region={{
          latitude: props.formData?.address?.latitude,
          longitude: props.formData?.address?.longitude,
          latitudeDelta: 0.05 * kmsRange,
          longitudeDelta: 0.05 * kmsRange
        }}>
        <Circle center={{
          latitude: props.formData?.address?.latitude,
          longitude: props.formData?.address?.longitude
        }} radius={kmsRange * 1000} strokeColor={"white"} strokeWidth={3}></Circle>
      </MapView>
      <View style={{ alignItems: "center", flexDirection: "row", margin: 3 }}>
        <Slider
          style={{ width: "75%", height: 40 }}
          minimumValue={5}
          step={1}
          maximumValue={100}
          minimumTrackTintColor={themeColors.primary}
          maximumTrackTintColor="#000000"
          value={kmsRange}
          onValueChange={(rangeNumber) => {
            setKmsRange(Number(rangeNumber));
            props.setFormData({
              ...props.formData,
              range: Number(rangeNumber)
            });
          }}
        />
        <Text style={{ marginLeft: 3 }}>{kmsRange} kms</Text>
      </View>
    </View>
  );
}
