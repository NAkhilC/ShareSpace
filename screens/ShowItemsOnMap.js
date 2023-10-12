import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView,
  FlatList,
  SafeAreaView,
  Dimensions,
  Image,
  Pressable,

} from "react-native";
import { styles } from "../styles/mainCss";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "./Header";
import MapView, { Circle, Marker } from "react-native-maps";
import { themeColors } from "../styles/base";
import React, { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ShowItemsOnMap({ navigation }) {
  const [listings, setListings] = useState();
  const [status, setStatus] = useState(false);
  const [mapListings, setMapListings] = useState();
  const [latLonLocation, setLatLonLocation] = useState();
  const flatListRef = useRef(null);
  function getListings() {
    //return useSelector((store) => store.listings);
  }

  React.useEffect(() => {
    axios.get(`${process.env.EXPO_PUBLIC_API_URL}/items/mapView`).then((response) => {
      if (response.data.data.status === 200) {
        setListings(response.data.data.data);
      }
    });
  }, []);

  async function getLatAndLon(placeId) {
    return await axios
      .request({
        method: "post",
        url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.EXPO_PUBLIC_MAPS_KEY}`,
      })
      .then((response) => {
        return {
          latitude: response.data.result.geometry.location.lat,
          longitude: response.data.result.geometry.location.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
      })
      .catch((e) => {
        (e.response);
      });
  }

  // const renderItem = ({ item }) => {
  //   return (
  //     <View style={{ width: 200, backgroundColor: themeColors.peimarynext, margin: 5 }}>
  //       <Text>{item.listingId}</Text>
  //     </View>
  //   );
  // };

  const [currentIndex, setCurrentIndex] = useState(1);

  const itemWidth = Dimensions.get("window").width; // Assuming each item takes the full screen width

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const index = Math.floor(contentOffset.x / itemWidth);
    if (index >= 0) {
      setCurrentIndex(listings[index].listingId);
      setLatLonLocation(listings[index].location);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          width: itemWidth,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: themeColors.peimarynext,
        }}
      >
        {/* Render your item content here */}
        {/* For example, you can display the item title */}
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ width: "40%" }}>
            <Image style={styles.infoImage} resizeMode="cover" src={item.image}></Image>
          </View>
          <View style={{ width: "60%", padding: 5 }}>
            <Text>{item.title}</Text>
            <Text>
              {new Date(item?.eventStart).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              -{" "}
              {new Date(item?.eventEnd).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
            <Pressable onPress={() => navigation.navigate("ViewItem", { data: item.listingId })}>
              <View style={{ padding: 5 }}>
                <Text style={{ textDecorationLine: "underline", color: "blue" }}>View Item</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.containerFlex}>
      {/* Header */}
      <View style={styles.topBottomFlex}>
        <Header name={"Map"}></Header>
      </View>

      {/* Body */}
      <View style={[styles.body]}>
        <View style={{ flex: 1, borderWidth: 0, borderColor: themeColors.primary }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              height: 100,
              zIndex: 100,
              bottom: 0,
              position: "absolute",
            }}
          >
            <SafeAreaView>
              {listings && listings.length > 0 ? (
                <View>
                  <FlatList
                    ref={flatListRef}
                    data={listings}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.listingId}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                  // Additional FlatList props can be added here
                  />
                </View>
              ) : (
                <View style={{ alignItems: "center" }}>
                  <Text>Loading</Text>
                </View>
              )}
            </SafeAreaView>
          </View>

          {/* </ScrollView> */}
          <MapView
            style={{ flex: 1 }}
            initialRegion={latLonLocation}
            region={
              latLonLocation && {
                longitude: latLonLocation?.longitude,
                latitude: latLonLocation?.latitude,
                latitudeDelta: 0.25,
                longitudeDelta: 0.25,
              }
            }
          >
            <Circle
              center={{ longitude: -89.25, latitude: 48.382, latitudeDelta: 0.25, longitudeDelta: 0.25 }}
              radius={8 * 1000}
              strokeColor={themeColors.primary}
              strokeWidth={3}
            ></Circle>
            {listings?.map((listItem, index) => {
              return (
                <Marker key={index} coordinate={listItem.location}>
                  <Ionicons name="pin" size={listItem.listingId == currentIndex ? 60 : 30} color="red" />
                </Marker>
              );
            })}
          </MapView>
        </View>
      </View>

      {/* Footer */}
    </View>
  );
}
