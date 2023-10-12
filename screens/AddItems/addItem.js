import {
  Text,
  View,
  Button,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
  Switch,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { styles } from "../../styles/mainCss";
import React, { useState, useRef, useEffect } from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Header from "../Header";
import RemoteDataSetExample from "../components/GooglePlaces";
import IndividaulItems from "./IndividualItems";
import UploadImage from "../components/UploadImage";
import DateTimePickerComponent from "../components/DateTimePicker";
import DateTimePickerComponentTest from "../components/DateTimeComponent";
import axios from "axios";
import { AxiosRequestConfig } from "axios";
import SelectDropdown from 'react-native-select-dropdown'

import DropDownSelect from "../components/SelectDropDown";
import { themeColors } from "../../styles/base";

export default function AddItem() {
  const [state, setState] = React.useState("");
  const [image, setImage] = React.useState("");
  const [garageSales, setGarageSales] = React.useState(false);
  const [showDates, setShowDates] = React.useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const ref = useRef();
  const animatedButtonScale = new Animated.Value(1);
  const [formData, setFormData] = useState({
    title: "",
    address: {
      addressText: "",
      placeId: "",
    },
    images: [],
    description: "",
    eventStart: "",
    eventEnd: "",
    phone: "",
    email: "",
    hideContactDetails: isEnabled,
    type: "",

  });

  const rentOptions = [{ name: 'Parking' },
  { name: 'Furnished' },
  { name: 'Internet' },
  { name: 'Pets allowed' },
  { name: 'A/C' },
  { name: 'Individual room' },
  { name: 'Patio' },
  { name: 'Individual bathroom' }
  ]

  useEffect(() => {
    ref.current?.setAddressText("Some Text");
  }, [formData.type]);

  function getEvenetData(value) {
    formData.type = value;
    if (value === 'Garage Sales') {
      setGarageSales(true);
    } else {
      setGarageSales(false);
    }
  }

  const axiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL, // use with scheme
    timeout: 30000,
    headers: {
      "X-Platform": "iOS",
      "X-App-Build-Number": "1.0.0",
    },
  });

  const onPressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };

  const submitButton = async () => {
    let formData1 = new FormData();
    let filterImages = JSON.stringify(formData);
    filterImages = JSON.parse(filterImages);
    delete filterImages.images;
    formData1.append("data", JSON.stringify(filterImages));

    formData.images.forEach((image, index) => {
      formData1.append("file", {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
    });

    const config = {
      method: "post",
      url: `/upload`,
      responseType: "json",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      transformRequest: (data, headers) => {
        return formData1;
      },
      onUploadProgress: (progressEvent) => { },
      data: formData,
    };

    //send post request and get response
    const response = await axiosInstance.request(config);
  };

  const renderOptions = (options) => {
    return (<View style={styles.switchMain}>
      <View style={styles.switchBar}></View>
      <Text style={styles.switchBarText}>{options.name}</Text>
      <View style={styles.switchSwitchView}>
        <Switch
          trackColor={{ false: themeColors.peimarynext, true: themeColors.primary }}
          thumbColor={isEnabled ? themeColors.peimarynext : themeColors.primary}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>)
  }

  return (
    <View style={styles.containerFlex}>
      {/* Header */}
      <View style={styles.topBottomFlex}>
        <Header></Header>
      </View>
      {/* Body */}
      <View style={styles.body}>
        <KeyboardAwareScrollView>
          <View style={styles.body}>
            <View style={styles.addItem}>


              {/* <DropDownSelect formData={formData} callFunction={getEvenetData}></DropDownSelect> */}

              <TextInput
                style={styles.inputTextBoxItem}
                placeholder="Enter Title"
                onChangeText={(text) => {
                  setFormData({ ...formData, title: text });
                }}></TextInput>
              <View style={{ zIndex: 100 }}>
                <RemoteDataSetExample cities={false} formData={formData.address}></RemoteDataSetExample>
              </View>

              {/* Upload images */}
              <UploadImage formData={formData} setFormData={setFormData}></UploadImage>

              {/* dates */}

              <View
                style={{
                  width: "100%",
                  overflow: "hidden",
                  padding: 5,
                  marginTop: 25,
                }}
              >
                <View style={{ margin: 5, flexDirection: "row", display: "flex" }}>
                  <Text style={{ fontSize: 18, marginTop: 4 }}>Available From</Text>
                  <DateTimePickerComponent
                    formData={formData}
                    setFormData={setFormData}
                  ></DateTimePickerComponent>
                </View>
              </View>

              <TextInput
                style={styles.inputTextBoxItem}
                placeholder="Phone number"
                keyboardType="numeric"
                onChangeText={(text) => {
                  setFormData({ ...formData, phone: text });
                }}
              ></TextInput>

              <TextInput
                style={styles.inputTextBoxItem}
                placeholder="Email"
                onChangeText={(text) => {
                  setFormData({ ...formData, email: text });
                }}
              ></TextInput>

              <View style={{ flexDirection: 'row', display: 'flex', width: '100%', marginTop: 20, padding: 5 }}>
                <Text style={{ fontSize: 18, marginTop: 4 }}>Hide contact details</Text>
                <View style={{ alignContent: 'flex-end', marginLeft: 10 }}>
                  <Switch
                    trackColor={{ false: themeColors.peimarynext, true: themeColors.primary }}
                    thumbColor={isEnabled ? themeColors.peimarynext : themeColors.primary}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>

              <View style={{ flexDirection: 'row', display: 'flex', width: '100%' }}>
                <SelectDropdown

                  data={['CAD', 'USD']}
                  buttonStyle={{
                    flex: 1,
                    height: 50,
                    marginTop: 20,
                    backgroundColor: 'white', height: 50, borderRadius: 5, shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5, paddingLeft: 5, marginTop: 20, borderWidth: 1, borderColor: 'gray',
                    shadowRadius: 4,
                  }}
                  onSelect={(selectedItem, index) => {
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                  }}
                />
                <TextInput
                  style={[styles.inputTextBoxItem, { width: '60%', marginLeft: '5%' }]}
                  placeholder="Price"
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    setFormData({ ...formData, email: text });
                  }}
                ></TextInput>
              </View>

              <TextInput
                style={[styles.inputTextBoxItem, { height: 150 }]}
                multiline={true}
                placeholder="Add Description"
                onChangeText={(text) => {
                  setFormData({ ...formData, description: text });
                }}
              />

              <View style={{ flexDirection: 'row', display: 'flex', width: '100%', marginTop: 10, padding: 5 }}>
                <Text style={{ width: '50%', fontSize: 18, marginTop: 30 }}>Gender preference</Text>
                <SelectDropdown
                  data={['Male', 'Female', 'All']}
                  buttonStyle={{
                    flex: 1,
                    height: 50,
                    marginTop: 20,
                    backgroundColor: 'white', height: 50, borderRadius: 5, shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5, paddingLeft: 5, marginTop: 20, borderWidth: 1, borderColor: 'gray',
                    shadowRadius: 4,
                  }}
                  onSelect={(selectedItem, index) => {
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                  }}
                />
              </View>



              <FlatList
                data={rentOptions}
                renderItem={({ item, index }) => renderOptions(item)}
                keyExtractor={(item, index) => (index)}
                contentContainerStyle={styles.container}
              />


              {/* <DateTimePickerComponentTest></DateTimePickerComponentTest> */}
              {/* <IndividaulItems></IndividaulItems> */}
              <TouchableWithoutFeedback onPress={() => submitButton()} onPressIn={onPressIn} onPressOut={onPressOut}>
                <Animated.View style={[styles.iconContainer, animatedScaleStyle]}>
                  <View style={[styles.loginButton, { width: "100%" }]}>
                    <Text style={styles.text}>Submit</Text>
                  </View>
                </Animated.View>
              </TouchableWithoutFeedback>
              <View>
                {image.length > 0 && (
                  <View style={styles.bodyView}>
                    <View style={styles.imagePicked}>
                      <Image
                        source={{
                          uri: `${image}`,
                        }}
                        style={styles.eachImagePicked}
                      />
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}
