import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, SafeAreaView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { EXPO_PUBLIC_API_URL, EXPO_PUBLIC_API_TOKEN, EXPO_PUBLIC_MAPS_KEY } from "@env";
import { themeColors } from "../../styles/base";

const API_KEY = "Your-API-Key";

export default class GooglePlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: "",
      searchResults: [],
      isShowingResults: false,
      placeId: null,
      geoPosition: null,
    };
  }

  getLatitudeAndLongitude = async () => {
    return await axios
      .request({
        method: "post",
        url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.state.placeId}&key=${process.env.EXPO_PUBLIC_MAPS_KEY}`,
      })
      .then((response) => {
        this.props.setFormData({
          ...this.props.formData,
          address: {
            addressText: this.state.searchKeyword,
            placeId: this.state.placeId,
            latitude: response.data.result.geometry.location.lat,
            longitude: response.data.result.geometry.location.lng
          }
        });
      })
      .catch((e) => {
        (e.response);
      });
  }

  searchLocation = async (text) => {
    this.setState({ searchKeyword: text });
    if (text.length > 2) {
      axios
        .request({
          method: "post",
          url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${process.env.EXPO_PUBLIC_MAPS_KEY}&sensor=false&${this.props.cities ? "types=(cities)" : ""
            }&input=${this.state.searchKeyword}`,
        })
        .then((response) => {
          this.setState({
            searchResults: response.data.predictions,
            isShowingResults: true,
            placeId: response.data.predictions[0]?.place_id,
          });
        })
        .catch((e) => {
          (e.response);
        });
    } else {
      this.setState({
        searchResults: "",
        isShowingResults: false,
        placeId: "",
      });
    }
  };

  changeLocation = (e) => {
    this.setState({
      searchResults: "",
      isShowingResults: false,
      placeId: "",
      searchKeyword: "",
    });
  };

  render() {
    return (
      <>
        <View style={styles.autocompleteContainer}>
          <TextInput
            placeholder="Type address"
            returnKeyType="search"
            style={styles.inputTextBoxItem}
            placeholderTextColor="#000"
            onChangeText={(text) => this.searchLocation(text)}
            value={this.state.searchKeyword}
          />

          {this.state.isShowingResults && (
            <FlatList
              data={this.state.searchResults}
              scrollEnabled={false}
              key={this.state.searchResults}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={styles.resultItem}
                    key={index + item.description}
                    onPress={() => {
                      this.setState({
                        searchKeyword: item.description,
                        isShowingResults: false,
                      })
                      this.getLatitudeAndLongitude();
                    }
                    }
                  >
                    <Text key={index + item.description}>{item.description}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.id}
              style={styles.searchResultsContainer}
            />
          )}
        </View>
        <Text style={{ color: "blue", padding: 2 }} onPress={this.changeLocation}>
          Change location
        </Text>
      </>
    );
  }
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    zIndex: 200,
    width: "100%",
  },
  searchResultsContainer: {
    maxHeight: 200,
    backgroundColor: "#fff",
    position: "absolute",
    top: 50,
    width: '100%'
  },
  dummmy: {
    height: 10,
    marginTop: 20,
  },
  resultItem: {
    width: "100%",
    justifyContent: "center",
    height: 40,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingLeft: 15,
  },
  searchBox: {
    width: 300,
    height: 40,
    fontSize: 18,
    marginTop: 20,
    color: "#000",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    paddingLeft: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
  itemViewGeneralInfo: {
    backgroundColor: "white",
    marginTop: 10,
    height: 200,
    padding: 15,
  },
  inputTextBoxItem: {
    backgroundColor: 'white', height: 50, borderRadius: 5, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, paddingLeft: 15, marginTop: 5, borderWidth: 1, borderColor: 'gray',
    shadowRadius: 4,
  },
});
