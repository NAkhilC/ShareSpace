import { styles } from "../styles/mainCss";
import Header from "./Header";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView, Pressable, TouchableOpacity, Dimensions } from "react-native";
import io from "socket.io-client";
import { themeColors } from "../styles/base";
import { useSelector } from "react-redux";
import axios from "axios";
import { GiftedChat, Send } from 'react-native-gifted-chat'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ChatUser({ navigation }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(getUser().email);
  const route = useRoute();
  const [conversationId, setConversationId] = useState('');
  const [listingId, setListingId] = useState('');
  const windowHeight = Dimensions.get('window').height;


  useEffect(() => {
    const socket = io(process.env.EXPO_PUBLIC_API_URL, { reconnection: true });
    setConversationId(route.params?.conversationId);
    setReceiver(route.params?.itemListedUserId);
    setListingId(route.params?.listingId);
    setReceiverName(route.params?.receiverName);
    setLoading(true);
    if (conversationId) {
      axios.get(`${process.env.EXPO_PUBLIC_API_URL}/userChats/${conversationId}`).then((a) => {
        if (a.status === 200 && a.data && a.data.data) {
          let chats = a.data.data.sort((a, b) => b.createdAt - a.createdAt);
          setMessages(chats)
        }
      });
      setLoading(false);
    }

    joinChat();

    setSocket(socket);
    socket.on("connect", () => {
      if (socket.connected) {
        socket.emit("join", user, listingId);
      }
    });
    socket.on("userJoined", (user) => {
      //setMessages((prevMessages) => [...prevMessages, `${user} joined the chat`]);
    });

    socket.on("userLeft", (user) => {
      //setMessages((prevMessages) => [...prevMessages, `${user} left the chat`]);
    });

    socket.on("reconnect", () => {

    });

    socket.on("updateConversationId", ({ conversationId, status, messageId,
      context,
      sender,
      timeStamp }) => {
      if (status === 200) {
        setConversationId(conversationId);
      } else {
        alert("Something wrong on your end, to start conversation with this user.")
      }
    });

    socket.on("receiveMessage", ({ conversationId, status, _id,
      text,
      sender,
      createdAt }) => {
      if (status === 200) {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [{
            conversation_Id: conversationId,
            _id: _id,
            text: text,
            user: {
              _id: sender,
            },
            createdAt: createdAt
          }]),
        )
      } else {
        alert("Something wrong on your end, to start conversation with this user.")
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [receiver, user]);

  function getUser() {
    return useSelector((store) => store.appUser);
  }

  const joinChat = () => {
    if (user && socket && socket?.connected) {
      ("rec=>", receiver, "user=>", user);
      socket.emit("join", user);
    }
  };

  const sendMessage = (messages) => {
    if (messages && receiver && socket) {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      )

      socket.emit("sendMessage", {
        _id: messages[0]._id,
        createdAt: messages[0].createdAt,
        sender: user,
        receiver,
        message: messages[0].text,
        conversationId: conversationId,
        listingId
      });
    }
  };

  const renderSend = (props) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => { }}>
          <Ionicons
            name="attach"
            size={30}
            style={{ marginTop: 7, marginRight: 5 }}
            color={themeColors.primary}
          />
        </TouchableOpacity>
        <Send {...props}>
          <Ionicons
            name="send"
            size={32}
            style={{ marginRight: 6, marginTop: 0 }}
            color={themeColors.primary}
          />
        </Send>
      </View>
    );
  };



  return (
    <View style={styles.containerFlex}>
      <View style={[{ padding: 6, height: windowHeight * 0.12, backgroundColor: themeColors.primary }]}>
        <View style={[styles.displayFlex, { marginTop: windowHeight * 0.050 }]}>
          <Pressable onPress={() => navigation.navigate("Chats")}>
            <Ionicons name='chevron-back' color="white" size={35} />
          </Pressable>
          <View style={{ width: 30, marginLeft: 5, height: 30, backgroundColor: 'white', borderRadius: 999, marginTop: 2 }}><Text style={{ marginLeft: 6, fontSize: 25, color: themeColors.primary }}>{(receiver)?.toLocaleUpperCase().slice(0, 1)}</Text></View>
          <Text style={{ marginTop: 3, marginLeft: 5, fontSize: 20, color: 'white' }}>{(receiverName).slice(0, 30)}</Text>
          <View style={{ flex: 1 }}>
            {listingId ? <Pressable onPress={() => navigation.navigate("ViewItem", { data: listingId, originPlaceId: '' })}>
              <Text style={{ color: "white", textDecorationLine: 'underline', marginTop: 8, textAlign: 'right' }}>View Item</Text>
            </Pressable> : null}
          </View>
        </View>
      </View>

      {/* Body */}
      <View style={[styles.body, { backgroundColor: themeColors.peimarynext, justifyContent: 'flex-end' }]}>

        <GiftedChat
          messages={messages}
          wrapInSafeArea={false}
          showUserAvatar={false}
          showAvatarForEveryMessage={true}
          isTyping={true}
          alwaysShowSend
          renderSend={renderSend}
          renderAvatar={() =>
            <View style={{ backgroundColor: themeColors.primary, width: 30, height: 30, borderRadius: 999, paddingLeft: 8, paddingTop: 2 }}>
              <Text style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>{user.slice(0, 1)}</Text>
            </View>}
          onChangeText={setMessage}
          onSend={messages => sendMessage(messages)}
          user={{
            _id: user
          }}

          bottomOffset={83}
        />
      </View>
    </View >
  );
}
