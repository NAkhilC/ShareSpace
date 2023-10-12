import { styles } from "../styles/mainCss";
import Header from "./Header";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import io from "socket.io-client";
import { themeColors } from "../styles/base";
import axios from "axios";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Bounce } from "react-native-animated-spinkit";


const users = [
  { id: "Hello@gmail.com", name: "Hello User 1 Hello" },
  { id: "Test@gmail.com", name: "Test User 1 Hi" },
  // Add more users as needed
];

export default function Chat({ navigation }) {
  const [conversations, setConversations] = useState([]);
  const [masterConversations, masterSetConversations] = useState([]);
  const [user, setUser] = useState(getUser().email);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      setLoading(true);
      axios.get(`${process.env.EXPO_PUBLIC_API_URL}/getChatsForUser`).then((a) => {
        if (a.status === 200 && a.data && a.data.data) {
          setConversations(a.data.data);
          masterSetConversations(a.data.data);
        }
      });
      setLoading(false);
    }
  }, [isFocused]);

  function getUser() {
    return useSelector((store) => store.appUser);
  }

  const renderItem = ({ item, index }) => (
    <TouchableOpacity key={item.conversation_Id} onPress={() => navigation.navigate("ChatUser", { itemListedUserId: item.itemOwner !== user ? item.itemOwner : item.oppChatUser, conversationId: item.conversation_Id, listingId: item?.listingId, receiverName: item?.chatUserName })}>
      <View
        style={{ padding: 13, backgroundColor: index % 2 === 0 ? themeColors.peimarynext : 'white', borderBottomWidth: 1, borderBottomColor: "#000", display: "flex", flexDirection: "row", maxHeight: 70 }}
      >
        <View
          style={{
            width: "14%",
            height: 50,
            backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
            borderRadius: 999,
            overflow: "hidden",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Text style={{ fontSize: 35, marginTop: 3, color: 'white' }}>{item.itemOwner !== user ? item.itemOwner.slice(0, 1) : item.oppChatUser.slice(0, 1)}</Text>
        </View>
        <View style={{ marginLeft: 15, width: '60%', padding: 2 }}>
          <Text>{item.chatUserName}</Text>
          <Text style={{ marginTop: 4 }}>{(item.lastMessageContent?.data[0]?.context)?.slice(0, 30)}</Text>
        </View>
        <View style={{ marginLeft: '5%', width: '20%' }}>
          <Text>{item.lastMessageTime ?
            new Date(item.lastMessageTime).toLocaleString("en-US",
              {
                month: "short",
                day: "2-digit",
                hour: '2-digit', minute: '2-digit'
              }) : null}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.containerFlex}>
      {/* Header */}
      <View style={styles.topBottomFlex}>
        <Header name={"chat"}></Header>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <View>
          <View style={{ height: 50, backgroundColor: 'red', }}>
            <View style={styles.searchSection}>
              <Ionicons style={styles.searchIcon} name="search" size={25} color="#000" />
              <TextInput
                style={styles.input}
                placeholder="User name"
                onChangeText={(searchString) => {
                  const newData = masterConversations.filter(item => {
                    const itemData = item.chatUserName ? item.chatUserName.toUpperCase() : ''.toUpperCase();
                    const textData = searchString.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                  })
                  setConversations(newData);
                }}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          {conversations ?
            <FlatList data={conversations} renderItem={renderItem} keyExtractor={(item, id) => id} /> : null}
          {loading ? <View style={{ alignItems: 'center', marginTop: 20 }}><Bounce size={100} color={themeColors.primary} /><Text>Loading...</Text></View> : null}
        </View>
      </View>
    </View>
  );
}
