import {
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput,
  Pressable,
  SectionList,
  FlatList,
  TouchableOpacity,
  PanResponder,
  SafeAreaView,
  LogBox,
  ScrollView
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialIcons';

import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "../styles/mainCss";
import Header from "./Header";
import Footer from "./Footer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import fakeData from "../constants/fakeData";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import ShowAdd from "./AddManager/ShowAd";
import MapAreaSelector from "./components/MapAreaSelector";
import { themeColors } from "../styles/base";
import RemoteDataSetExample from "./components/GooglePlaces";
import { useDispatch } from "react-redux";
import { filterDataWithUserPref, userPreferences } from "../store/actions/user.action";
import FilterData from "./components/FilterData";
import { userState } from "../store/actions/user.action";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getItemsForUser, userPreferencegetData, filterDataWithInputs } from "../services/api.service";
import FilterDataByInfo from "./components/FilterDataByInfo";
import { Bounce, Plane, Chase, Fold } from 'react-native-animated-spinkit'




export default function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [listings, setListings] = useState([]);
  const [filterModal, setFilterModal] = useState(false);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function getUser() {
    return useSelector((store) => store.appUser);
  }
  const userPreferencesData = useSelector((state) => state.userPreferences);

  const isFocused = useIsFocused();
  LogBox.ignoreLogs(['Sending']);

  // dispatch(
  //   userState({
  //     userid: 'Test1@gmail.com',
  //     email: 'Test1@gmail.com',
  //     token: 'responseData',
  //     name: 'Test1',
  //   })
  // );

  async function filterData() {
    //update state 
    if (formData) {
      dispatch(
        userPreferences({
          addressText: formData.address.addressText,
          placeId: formData.address.placeId,
          latitude: formData.address.latitude,
          longitude: formData.address.longitude,
          range: formData.range
        })
      );
      (async () => {
        setLoading(true);
        const data = await userPreferencegetData(formData);
        if (data) {
          setListings(data);
        }
        setLoading(false);
      })();
    }
  }

  async function filterDataWithUserInput() {
    dispatch(
      filterDataWithUserPref({
        beds: formData?.beds,
        bath: formData?.bath,
        price: formData?.price,
        houseType: formData?.houseType,
        parkingType: formData?.parkingType
      })
    );
    //update state 
    if (formData) {
      (async () => {
        setLoading(true);
        const data = await filterDataWithInputs(formData);
        if (data) {
          setListings(data);
        }
        setLoading(false);
      })();
    }
  }


  React.useEffect(() => {
    if (userPreferencesData) {
      setFormData({
        address: {
          addressText: userPreferencesData?.addressText,
          placeId: userPreferencesData?.placeId,
          latitude: userPreferencesData?.latitude,
          longitude: userPreferencesData?.longitude
        },
        range: userPreferencesData?.range,
        beds: userPreferencesData?.beds,
        bath: userPreferencesData?.bath,
        price: null,
        houseType: null,
        parkingType: null
      })
    } else {
      setFormData({
        address: {
          addressText: '',
          placeId: '',
          latitude: '',
          longitude: '',
          beds: null,
          bath: null,
          price: null,
          houseType: null,
          parkingType: null
        },
        range: 5
      })
    }

    (async () => {
      setLoading(true);
      const userItems = await filterDataWithInputs(formData);
      if (userItems) {
        setListings(userItems);
      }
      setLoading(false);
    })();
  }, []);

  const dragDistance = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        dragDistance.current = gestureState.dy;
      },
      onPanResponderRelease: () => {
        if (dragDistance.current >= 100) {
          // Call your function here
          (async () => {
            const userItems = await getItemsForUser();
            if (userItems) {
              setListings(userItems);
            }
          })();
        }
        dragDistance.current = 0;
      },
    })
  ).current;

  const AD_DATA = [
    { id: "ad1", text: "Ad 1" },
    { id: "ad2", text: "Ad 2" },
    { id: "ad3", text: "Ad 3" },
    // ... add more advertisements ...
  ];

  const QUICK_FILTER = [
    { value: 1, text: "Looking for one bed room", id: 'f1', iconName: 'bed' },
    { value: 2, text: "Looking for two bed rooms", id: 'f2', iconName: 'bed' },
    { value: null, text: "Filter for more options", id: 'f3', iconName: 'filter' },
    // ... add more advertisements ...
  ];

  //chat gpt
  const itemsPerRow = 1;
  const adInterval = 2;

  const dataWithAds = listings && listings?.flatMap((item, index) => {
    if ((index + 1) % adInterval === 0) {
      const adIndex = Math.floor(index / adInterval) % AD_DATA.length;
      return [item, { ...AD_DATA[adIndex], isAd: true }];
    }
    return item;
  }).flat();


  const QuickSearch = ({ formdata, setFormData }) => {
    React.useEffect(() => {
      (async () => {

        //await filterDataWithUserInput();
      })();

    }, [formData])

    const quickFilterAction = async (filterButtonInput) => {

      if (['f1', 'f2'].includes(filterButtonInput.id)) {
        setFormData({ ...formData, beds: filterButtonInput?.value });
      } else {
        setFilterModal(true);
      }
    }

    return (
      <ScrollView scrollEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false}>
        {QUICK_FILTER.map(filterButton => {
          return (
            <Pressable key={filterButton.id} onPress={() => { quickFilterAction(filterButton) }}>
              <View key={filterButton.id} style={[styles.popular_Item_block, { padding: 10 }]}>
                <View style={[styles.displayFlex]}>
                  <Text style={{ fontSize: 20, color: 'white' }}>{filterButton.value} </Text><Ionicons name={filterButton.iconName} size={25} color="white" />
                </View>
                <Text style={{ fontSize: 15, color: 'white' }}>{filterButton.text}</Text>
              </View>
            </Pressable>)
        })}
      </ScrollView>
    )
  }


  const renderItem = ({ item, index }) => {
    console.log(item.images);
    return (
      <View key={index} style={styles.itemContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("ViewItem", { data: item.listingId, originPlaceId: formData.address?.placeId })}>
          <View style={styles.displayFlex}>
            <View style={styles.itemImage}>
              <Image style={styles.infoImage} resizeMode="cover" src={item.images[0]}></Image>
            </View>

            <View style={{ padding: 2, overflow: "hidden", height: 150, width: '50%' }}>
              <SafeAreaView>
                <View style={styles.displayFlex}>
                  <View style={{ width: '80%', maxHeight: 50 }}>
                    <Text style={{ fontWeight: 500, padding: 5 }}>{item && item.title}</Text>
                  </View>
                  <View style={{ marginTop: 5 }}>
                    <Ionicons name="heart" size={25} color={"red"} />
                  </View>
                </View>
                <Text style={{ fontWeight: 500, padding: 5 }}>{item && item.currency} ${item && item.price}</Text>
                <View style={{ display: "flex", marginTop: 4, flexDirection: "row", overflow: "hidden" }}>
                  <Ionicons name="pin" size={20} color="#7a9e9f" />
                  <Text style={{ fontWeight: "500" }}>
                    {(item.address?.addressText).slice(0, 30)} {(item.address?.addressText).length > 30 ? "..." : ""}
                  </Text>
                </View>
                <View style={[styles.displayFlex, { marginTop: 10 }]}>
                  <View style={{ width: 50, height: 30, borderRadius: 3, backgroundColor: themeColors.primary, marginLeft: 5 }}>
                    <View style={[styles.displayFlex, { padding: 5 }]}>
                      <Ionicons name="bed" size={17} color="white" />
                      <Text style={{ color: 'white', marginLeft: 5, fontWeight: 500 }}>{item && item.beds}</Text>
                    </View>
                  </View>
                  <View style={{ width: 50, height: 30, borderRadius: 3, backgroundColor: themeColors.primary, marginLeft: 5 }}>
                    <View style={[styles.displayFlex, { padding: 5 }]}>
                      <MaterialCommunityIcons name="shower" size={17} color="white" />
                      <Text style={{ color: 'white', marginLeft: 5, fontWeight: 500 }}>{item && item.bath}</Text>
                    </View>
                  </View>
                </View>

              </SafeAreaView>
            </View>
          </View >
        </TouchableOpacity >
      </View >
    );
  };



  const renderAd = ({ item, index }) => {
    return (
      <View key={index} style={styles.adContainer}>
        <Text style={styles.adText} key={index}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.containerFlex}>
      {/* Header */}
      <View style={styles.topBottomFlex}>
        <Header name={"Home"}></Header>
      </View>

      {/* Body */}
      <View style={[styles.body, { backgroundColor: themeColors.primary }]}>
        <FilterData
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          formdata={formData}
          setFormData={setFormData}
          filterDataFunction={filterData}
        ></FilterData>

        <FilterDataByInfo modalVisible={filterModal}
          setModalVisible={setFilterModal}
          formdata={formData}
          setFormData={setFormData}
          filterDataFunction={filterDataWithUserInput}></FilterDataByInfo>

        <View style={styles.homeSearch}>
          <View style={styles.homeMainText}>
            <TouchableHighlight onPress={() => setModalVisible(true)}>
              <View style={{ flexDirection: "row" }}>
                {formData && formData.address && formData.address?.addressText ?
                  <View style={styles.displayFlex}>
                    <MaterialCommunityIcons onPress={() => setModalVisible(true)} name="pin" size={25} color="white" />
                    <Text style={{ fontSize: 17, color: "white", marginTop: 3 }}>
                      {(formData && formData.address && formData.address?.addressText)?.slice(0, 30)}
                    </Text>
                  </View> : <Text> Click here to set address</Text>
                }
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.FilterIcon}>
            <TouchableHighlight onPress={() => setFilterModal(true)}>
              <Ionicons name="filter" size={30} color="white" />
            </TouchableHighlight>
          </View>
        </View>

        <View>
          <SafeAreaView>
            <ScrollView>
              <View style={{ height: 200 }}>
                <View style={{ paddingLeft: 15 }}><Text style={{ fontSize: 20, color: 'white' }}>Popular Items</Text></View>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                  <QuickSearch formdata={formData} setFormData={setFormData}></QuickSearch>
                </View>
              </View>
              <View style={{ backgroundColor: themeColors.peimarynext, borderRadius: 10, minHeight: 500 }}>
                <View style={{ marginTop: 10 }}></View>
                {!loading ?
                  (
                    <View>
                      {dataWithAds.length > 0 ?
                        <FlatList
                          {...panResponder.panHandlers}
                          scrollEnabled={false}
                          data={dataWithAds}
                          renderItem={({ item, index }) => (item.isAd ? renderAd({ item, index }) : renderItem({ item, index }))}
                          keyExtractor={(item, index) => (item.isAd ? item.id : item.listingId)}
                          contentContainerStyle={styles.container}
                        /> : (<View style={[{ width: '100%', padding: 10 }]}>
                          <View style={{ marginLeft: '38%', marginTop: 20 }}>
                            <Ionicons name="home" size={67} color={themeColors.primary} />
                          </View>
                          <Text style={{ fontWeight: 400, fontSize: 20, marginLeft: '27%' }}>Oops no items found</Text>
                        </View>)}
                    </View>

                  ) :
                  <View style={[styles.itemContainer, { width: '100%' }]}>
                    <View style={{ marginLeft: '38%', marginTop: 20 }}>
                      <Bounce size={100} color={themeColors.primary} />
                    </View>
                    <Text style={{ fontWeight: 400, fontSize: 20, marginLeft: '37%' }}>Loading...</Text>
                  </View>
                }

              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
}
