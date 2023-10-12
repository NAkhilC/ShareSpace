import { Text, View, TouchableHighlight, Image, TextInput, Pressable, FlatList, Modal, LogBox } from "react-native";
import Header from "./Header";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "../styles/mainCss";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { themeColors } from "../styles/base";
import MapView, { Marker } from "react-native-maps";
import React, { useState } from "react";
import axios from "axios";
import { store } from "../store/store";
import Communications from "react-native-communications";
import { useSelector } from "react-redux";
import { userInterestedItems } from "../store/actions/user.action";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import MapViewDirections from 'react-native-maps-directions';
import Swiper from 'react-native-swiper'
import { useDispatch } from "react-redux";
import { setInterested, getItem } from "../services/api.service";
export default function ViewItem({ navigation }) {
  const route = useRoute();
  const data = route.params?.data;
  const originPlaceId = route.params?.originPlaceId;
  const [currentData, setCurrentData] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [conversationId, setConversationId] = useState();
  const [loading, setLoading] = useState(false);
  const [originPoint, setOriginPoint] = useState(
    getUserPreferences()
  )
  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);
  const [user, setUser] = useState(getUser());
  const [latLon, setLatLon] = useState({});
  const [interested, setIsInterested] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  LogBox.ignoreAllLogs(['ViewPropTypes']);
  LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

  function getUser() {
    return useSelector((store) => store?.appUser);
  }
  function getUserPreferences() {
    return useSelector((store) => store.userPreferences);
  }
  function setLatLonValues() {
    setLatLon({
      latitude: currentData?.address.latitude,
      longitude: currentData?.address.longitude,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    })
  }

  const handleOpenMap = () => {
    setModalVisible(!isModalVisible);
  };

  React.useEffect(() => {
    if (isFocused && data) {
      (async () => {
        const itemInfo = await getItem(data);
        if (itemInfo) {
          setCurrentData(itemInfo);
          if (user?.interested?.includes(itemInfo?.listingId)) {
            setIsInterested(true);
          }
          if (currentData) {
            setLatLonValues();
          }
          if (itemInfo?.conversation.length > 0) {
            itemInfo?.conversation.forEach(item => {
              if (item.itemOwner === itemInfo?.userId && item.oppChatUser === user.email) {
                setConversationId(item?.conversation_Id);
              }
            })
          }
        }
      })()
    }

  }, [isFocused]);

  const storeData = store;

  interestedItem = async () => {
    if (storeData && storeData.getState()?.userInterestedItems) {
      let interestedItems = Object.values(storeData.getState()?.userInterestedItems?.interested);
      (interestedItems, "data8888888");
      if (interestedItems?.includes(currentData?.listingId)) {
        setIsInterested(false);
        dispatch(
          userInterestedItems({
            interested: interestedItems.filter(val => {
              return val !== currentData?.listingId
            })
          })
        );
      } else {
        setIsInterested(true);
        dispatch(
          userInterestedItems({
            interested: interestedItems.concat(currentData?.listingId)
          })
        );
      }
    }
    await setInterested(currentData?.listingId);
  };

  function penGoogleMaps() {
    const address = "1600 Amphitheatre Parkway, Mountain View, CA"; // Replace with your desired address
    const url = `http://maps.google.com/?q=${(latLon.latitude, latLon.longitude)}`;

    Communications.web(url);
  }


  return (
    <View style={[styles.containerFlex, { opacity: isModalVisible ? 0.5 : 1 }]}>
      {/* Header */}
      <View style={styles.topBottomFlex}>
        <Header></Header>
      </View>
      <View style={styles.body}>
        <KeyboardAwareScrollView>

          <View style={styles.mainItemView}>
            {/* Image */}
            <View style={styles.itemViewImageContainer}>
              <View style={styles.itemViewImage}>
                {currentData ? (
                  <View style={{ flex: 1 }}>
                    <Swiper dotColor={themeColors.peimarynext} activeDotColor={themeColors.primary} style={{}} showsButtons={false}>
                      {currentData.images.map((eachImage, index) => {
                        return (
                          <View style={{ flex: 1 }} key={'viewImage-' + index}>
                            <Image style={{ width: '100%', height: 320 }} resizeMode="cover" src={eachImage}></Image>
                          </View>
                        )
                      })}
                    </Swiper>
                  </View>
                ) : (
                  <Text></Text>
                )}
              </View>
              <View style={styles.imageMainFooter}>
                <View style={styles.imageSubFooter1}>
                  <View style={styles.imageFooterIcon1}>
                    <Pressable
                      onPress={() => {
                        interestedItem();
                      }}
                    >
                      {currentData && user && interested ? (
                        <Ionicons name="heart" size={30} color="red" />
                      ) : (
                        <Ionicons name="heart-outline" size={30} color={themeColors.primary} />
                      )}
                      <Text>Interested</Text>
                    </Pressable>
                  </View>
                  {currentData && currentData.userId != user?.userid ? (
                    <View style={styles.imageFooterIcon1}>
                      <Pressable
                        onPress={async () => {
                          navigation.navigate("ChatUser", { itemListedUserId: currentData?.userId, conversationId: conversationId, listingId: currentData?.listingId })
                        }}
                      >
                        <Ionicons name="chatbubble-outline" size={30} color={themeColors.primary} />

                        <Text>Chat</Text>
                      </Pressable>
                    </View>) :
                    <View></View>}
                </View>
                <View style={styles.imageSubFooter1}>
                  <View style={styles.imageFooterIcon2}>
                    <Ionicons name="eye-outline" size={30} color={themeColors.primary} />
                    <Text>2136</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 10, marginLeft: 15 }}><Text>Posted by : {currentData?.userId}</Text></View>

            <View style={styles.itemViewGeneralInfo}>
              <Text style={[styles.viewItemName, { fontWeight: 600 }]}>{currentData?.title ? currentData?.title : "No Title"}</Text>
              <View>
                {currentData && currentData.currency ? <Text style={{ fontWeight: 500 }}> {currentData && currentData.currency} ${currentData.price} / Month</Text> : null}
                <Text>{currentData?.isUtilitiesIncluded ? '(Including utilities)' : '(Excluding utilities)'}</Text>
              </View>

              <View >
                <Text style={[styles.timeAndLocation, { fontWeight: 600 }]}>Available from</Text>
                <Text>
                  {new Date(currentData?.eventStart).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
                {currentData?.address ? (
                  <>
                    <Text style={[styles.timeAndLocation, { fontWeight: 600 }]}>Location</Text>
                    <Text>{currentData?.address.addressText} </Text>
                  </>
                ) : (
                  <Text>No location</Text>
                )}

                {currentData?.genderPreference ? (
                  <>
                    <Text style={[styles.timeAndLocation, { fontWeight: 600 }]}>Gender Preference</Text>
                    <Text>{currentData?.genderPreference} </Text>
                  </>
                ) : (
                  <Text>No location</Text>
                )}
              </View>
              <View style={[styles.displayFlex, { flexWrap: 'wrap' }]}>
                {currentData && currentData?.beds ? (
                  <View style={[styles.displayFlex, { width: '50%', marginTop: 10 }]}>
                    <Ionicons name="bed" size={25} color={themeColors.primary} />
                    <Text style={{ marginLeft: 10, marginTop: 5 }}>{currentData?.beds}</Text>
                  </View>
                ) : null}
                {currentData && currentData?.bath ? (
                  <View style={[styles.displayFlex, { width: '50%', marginTop: 10 }]}>
                    <MaterialCommunityIcons name="shower" size={25} color={themeColors.primary} />
                    <Text style={{ marginLeft: 10, marginTop: 5 }}>{currentData?.bath}</Text>
                  </View>
                ) : null}
                {currentData && currentData?.parkingType ? (
                  <View style={[styles.displayFlex, { width: '50%', marginTop: 10 }]}>
                    <Ionicons name="car" size={25} color={themeColors.primary} />
                    <Text style={{ marginLeft: 10, marginTop: 5 }}>{currentData?.parkingType}</Text>
                  </View>
                ) : null}
                {currentData && currentData?.laundryType ? (
                  <View style={[styles.displayFlex, { width: '50%', marginTop: 10 }]}>
                    <MaterialCommunityIcons name="washing-machine" size={25} color={themeColors.primary} />
                    <Text style={{ marginLeft: 10, marginTop: 5 }}>{currentData?.laundryType}</Text>
                  </View>
                ) : null}
                {currentData && currentData?.airConditioner ? (
                  <View style={[styles.displayFlex, { width: '50%', marginTop: 10 }]}>
                    <MaterialCommunityIcons name="air-conditioner" size={25} color={themeColors.primary} />
                    <Text style={{ marginLeft: 10, marginTop: 5 }}>{currentData?.airConditioner}</Text>
                  </View>
                ) : null}
                {currentData && currentData?.houseType ? (
                  <View style={[styles.displayFlex, { width: '50%', marginTop: 10 }]}>
                    <MaterialCommunityIcons name="home" size={25} color={themeColors.primary} />
                    <Text style={{ marginLeft: 10, marginTop: 5 }}>{currentData?.houseType}</Text>
                  </View>
                ) : null}
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={[styles.timeAndLocation, { fontWeight: 600 }]}>
                  Utilities
                </Text>
                {currentData?.utilities && currentData?.utilities.map((utility, index) => {
                  return (
                    <Text key={index + "utility"}>{utility}</Text>
                  )
                })}
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={[styles.timeAndLocation, { fontWeight: 600 }]}>Items included</Text>
                {currentData?.advancedItems && currentData?.advancedItems.map((advancedItem, index) => {
                  return (
                    <Text key={index + "advanced"}>{advancedItem}</Text>
                  )
                })}
              </View>
            </View>

            <View style={styles.itemViewGeneralInfoDesc}>
              <Text style={styles.viewItemName}>Description</Text>
              <View style={styles.viewItemDetails}>
                <Text>{currentData?.description ? currentData?.description : "No description"}</Text>
              </View>
            </View>

            {/* map location */}
            <View style={styles.itemViewGeneralInfo}>
              {distance ? (<Text>Distance {Math.floor(Number(distance))} kms</Text>) : null}
              {time ? (<Text>Time {Math.floor(Number(time))} mins</Text>) : null}
              <View style={{ marginTop: 20 }}></View>
              {currentData && currentData?.address && originPoint ? (
                <MapView style={{ flex: 1 }} initialRegion={currentData?.address} region={{ ...currentData?.address, latitudeDelta: 0.5, longitudeDelta: 0.5 }}>
                  <Marker key="1" coordinate={currentData?.address} />
                  <Marker key="2" coordinate={originPoint} />
                  <MapViewDirections
                    origin={currentData?.address}
                    destination={originPoint}
                    apikey={process.env.EXPO_PUBLIC_MAPS_KEY}
                    strokeWidth={3}
                    mode="DRIVING"
                    strokeColor="rgb(0,139,241)"
                    onReady={result => {
                      setDistance(result.distance);
                      setTime(result.duration)
                    }}
                  />
                </MapView>
              ) : (
                <Text>No map preview Available</Text>
              )}
              <Text>
                <TouchableHighlight onPress={handleOpenMap}>
                  <Text>Open</Text>
                </TouchableHighlight>
              </Text>
              <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                  setModalVisible(!isModalVisible);
                }}
              >
                <View style={[styles.centeredView, { marginTop: 350 }]}>
                  <View style={styles.modalViewSmall}>
                    <View
                      style={{
                        marginTop: 20,
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <TouchableHighlight
                        onPress={() => {
                          setModalVisible(!isModalVisible);
                          try {
                            const url = `http://maps.google.com/?q=${latLon.latitude},${latLon.longitude}`;
                            Communications.web(url);
                          } catch (e) {
                            alert("cannot open");
                          }
                        }}
                      >
                        <View style={{ height: 30, backgroundColor: "white" }}>
                          <Text style={{ fontSize: 20 }}>Google Maps</Text>
                        </View>
                      </TouchableHighlight>
                    </View>

                    <View
                      style={{
                        marginTop: 20,
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <TouchableHighlight
                        onPress={() => {
                          setModalVisible(!isModalVisible);
                        }}
                      >
                        <View style={{ height: 30, backgroundColor: "white" }}>
                          <Text style={{ fontSize: 20 }}>Apple Maps</Text>
                        </View>
                      </TouchableHighlight>
                    </View>

                    <View
                      style={{
                        marginTop: 20,
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <TouchableHighlight
                        onPress={() => {
                          setModalVisible(!isModalVisible);
                          try {
                            const url = `maps.apple.com/?ll=${latLon.latitude},${latLon.longitude}`;
                            Communications.web(url);
                          } catch (e) {
                            alert("cannot open");
                          }
                        }}
                      >
                        <View style={{ height: 30, backgroundColor: "white" }}>
                          <Text style={{ fontSize: 20 }}>Close</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
      {/* ) : (
        <Text>Loading</Text>
      )} */}
    </View>
  );
}
