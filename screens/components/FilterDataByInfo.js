import { Modal, View, Text, Pressable, TextInput } from "react-native";
import MapAreaSelector from "./MapAreaSelector";
import RemoteDataSetExample from "../components/GooglePlaces";
import { styles } from "../../styles/mainCss";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { themeColors } from "../../styles/base";
import axios from "axios";
import AnimateButton from "../AddItems/animateButton";
import { useSelector } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import Ionicons from "@expo/vector-icons/Ionicons";
import { houseType, parkingType } from "../../constants/app-constants";
import Slider from "@react-native-community/slider";

export default function FilterDataByInfo({ modalVisible, setModalVisible, formdata, setFormData, filterDataFunction }) {
  const bedsdropdownRef = useRef({});
  const bathdropdownRef = useRef({});
  const parkingdropdownRef = useRef({});
  const housedropdownRef = useRef({});

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { padding: 0, height: 500 }]}>
          <View style={{ width: '100%' }}>
            <View style={[styles.displayFlex, { marginTop: 20, marginLeft: 10, width: '100%' }]}>
              <Text style={{ fontSize: 25 }}>Apply filter</Text>
              <View style={{ right: 0, position: 'absolute' }}>
                <Pressable onPress={() => {
                  setFormData({
                    ...formdata, beds: null,
                    bath: null,
                    price: null,
                    houseType: null,
                    parkingType: null
                  });
                  bedsdropdownRef.current.reset();
                  bathdropdownRef.current.reset();
                  housedropdownRef.current.reset();
                  parkingdropdownRef.current.reset();
                }}>
                  <Text style={{ fontSize: 17, marginRight: 25, color: 'blue', textDecorationLine: 'underline' }}>Clear all</Text>
                </Pressable>
              </View>
            </View>
            <View style={{ marginTop: 10, padding: 10, }}>
              <View style={[styles.displayFlex, { marginTop: 15, height: 40, borderBottomWidth: 1, borderBottomColor: 'gray', }]}>
                <Text style={{ fontSize: 16 }}>Number of Beds</Text>
                <SelectDropdown
                  data={[1, 2, '3 or more']}
                  defaultValue={formdata?.beds}
                  ref={bedsdropdownRef}
                  buttonStyle={{
                    flex: 1,
                    height: 30, shadowOffset: { width: 0, height: 5 },
                    backgroundColor: 'white',
                    right: 0,
                    position: 'absolute',
                  }}

                  onSelect={(selectedItem, index) => {
                    setFormData({ ...formdata, beds: selectedItem })
                  }}
                  dropdownIconPosition="right"
                  defaultButtonText={
                    <View style={[styles.displayFlex, { marginLeft: 20 }]}>
                      <Text style={{ fontSize: 16, marginTop: 5, color: 'gray' }}>select</Text>
                      <Ionicons name="chevron-forward-outline" size={28} color="gray" />
                    </View>
                  }
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return (<View style={styles.displayFlex}><Text style={{ marginTop: 5 }}>{selectedItem}</Text><Ionicons name="chevron-forward-outline" size={28} color="gray" /></View>)

                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                  }} />

              </View>
              <View style={[styles.displayFlex, { marginTop: 15, height: 40, borderBottomWidth: 1, borderBottomColor: 'gray', }]}>
                <Text style={{ fontSize: 16 }}>Number of baths</Text>
                <SelectDropdown
                  data={[1, 2, '3 or more']}
                  defaultValue={formdata?.bath}
                  ref={bathdropdownRef}
                  buttonStyle={{
                    flex: 1,
                    height: 30, shadowOffset: { width: 0, height: 5 },
                    backgroundColor: 'white',
                    right: 0,
                    position: 'absolute',
                  }}
                  defaultButtonText={
                    <View style={styles.displayFlex}>
                      <Text style={{ fontSize: 16, marginTop: 5, color: 'gray' }}>select</Text>
                      <Ionicons name="chevron-forward-outline" size={28} color="gray" />
                    </View>
                  }
                  onSelect={(selectedItem, index) => {
                    setFormData({ ...formdata, bath: selectedItem })
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return (<View style={styles.displayFlex}><Text style={{ marginTop: 5 }}>{selectedItem}</Text><Ionicons name="chevron-forward-outline" size={28} color="gray" /></View>)
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                  }} /></View>
              <View style={[styles.displayFlex, { marginTop: 15, height: 40, borderBottomWidth: 1, borderBottomColor: 'gray', }]}>
                <Text style={{ fontSize: 16 }}>Parking preference</Text>
                <SelectDropdown
                  data={parkingType}
                  ref={parkingdropdownRef}
                  buttonStyle={{
                    flex: 1,
                    height: 30, shadowOffset: { width: 0, height: 5 },
                    backgroundColor: 'white',
                    right: 0,
                    position: 'absolute',
                  }}
                  defaultValue={formdata?.parkingType}
                  defaultButtonText={
                    <View style={styles.displayFlex}>
                      <Text style={{ fontSize: 16, marginTop: 5, color: 'gray' }}>select</Text>
                      <Ionicons name="chevron-forward-outline" size={28} color="gray" />
                    </View>
                  }
                  onSelect={(selectedItem, index) => {
                    setFormData({ ...formdata, parkingType: selectedItem })
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return (<View style={styles.displayFlex}><Text style={{ marginTop: 5 }}>{selectedItem}</Text><Ionicons name="chevron-forward-outline" size={28} color="gray" /></View>)
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                  }} /></View>
              <View style={[styles.displayFlex, { marginTop: 15, height: 40, borderBottomWidth: 0.5, borderBottomColor: themeColors.primary, }]}>
                <Text style={{ fontSize: 16 }}>House preference</Text>
                <SelectDropdown
                  data={houseType}
                  ref={housedropdownRef}
                  buttonStyle={{
                    flex: 1,
                    height: 30, shadowOffset: { width: 0, height: 5 },
                    backgroundColor: 'white',
                    right: 0,
                    position: 'absolute',
                  }}

                  defaultValue={formdata?.houseType}
                  defaultButtonText={
                    <View style={styles.displayFlex}>
                      <Text style={{ fontSize: 16, marginTop: 5, color: 'gray' }}>select</Text>
                      <Ionicons name="chevron-forward-outline" size={28} color="gray" />
                    </View>
                  }
                  onSelect={(selectedItem, index) => {
                    setFormData({ ...formdata, houseType: selectedItem })
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return (<View style={styles.displayFlex}><Text style={{ marginTop: 5 }}>{selectedItem}</Text><Ionicons name="chevron-forward-outline" size={28} color="gray" /></View>)
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                  }} /></View>
              <View style={[styles.displayFlex, { marginTop: 15, height: 65, borderBottomWidth: 1, borderBottomColor: 'gray', }]}>
                <Text style={{ fontSize: 16 }}>Price range</Text>
                <View style={{ width: 170, position: 'absolute', right: 0 }}>
                  <Text style={{ fontSize: 16, fontWeight: '700' }}>{formdata?.price}</Text>
                  <Slider defaultValue={formdata?.price} minimumValue={200} maximumValue={5000} step={50}
                    thumbTintColor={themeColors.primary}
                    minimumTrackTintColor={themeColors.primary}
                    onValueChange={(rangeNumber) => {
                      setFormData({
                        ...formdata,
                        price: Number(rangeNumber)
                      });
                    }}></Slider>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Pressable style={{ padding: 2 }}>
              <AnimateButton name={"Cancel"} callingFunction={() => setModalVisible(!modalVisible)}></AnimateButton>
            </Pressable>
            <Pressable style={{ padding: 2 }}>
              <AnimateButton name={"Filter"} callingFunction={() => { setModalVisible(!modalVisible); filterDataFunction(); }}></AnimateButton>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
