import { View, Text } from "react-native";
import Modal from "react-native-modal";
import { styles } from "../../styles/mainCss";
import RemoteDataSetExample from "../components/GooglePlaces";
import { useState } from "react";
import AnimateButton from "../AddItems/animateButton";

export default function GoogleMapModelContainer(props) {
  function updateModelState() {
    props.setIsMapVisible(false);
    props.filterData();
  }
  return (
    <Modal animationType="slide" transparent={true} visible={props.isMapVisible}>
      <View style={[styles.centeredView, { overflow: "hidden" }]}>
        <View style={[styles.modalView, { height: 300 }]}>
          <RemoteDataSetExample cities={true} formData={props.location.address}></RemoteDataSetExample>
          <View>
            <AnimateButton name={"Ok"} callingFunction={updateModelState}></AnimateButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}
