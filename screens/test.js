import { styles } from "../styles/mainCss";
import Header from "./Header";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView } from "react-native";
import io from "socket.io-client";
export default function Chat({ navigation }) {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [socket, setSocket] = useState(null);

  //const socket = new WebSocket("wss://172.22.80.1:4000", {});
  //const socket = io("http://10.0.0.118:3000");

  useEffect(() => {
    const socket = io("http://10.0.0.118:3000");
    setSocket(socket);

    socket.on("userJoined", (user) => {
      setMessages((prevMessages) => [...prevMessages, `${user} joined the chat`]);
    });

    socket.on("userLeft", (user) => {
      setMessages((prevMessages) => [...prevMessages, `${user} left the chat`]);
    });

    socket.on("receiveMessage", ({ sender, message }) => {
      setMessages((prevMessages) => [...prevMessages, `${sender}: ${message}`]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const joinChat = () => {
    if (username && socket) {
      socket.emit("join", username);
    }
  };

  const sendMessage = () => {
    if (message && receiver && socket) {
      socket.emit("sendMessage", { sender: username, receiver, message });
      setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
      setMessage("");
    }
  };

  return (
    <View style={styles.containerFlex}>
      {/* Header */}
      <View style={styles.topBottomFlex}>
        <Header name={"chat"}></Header>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>Chat Application</Text>
          <Text>{JSON.stringify(messages)}</Text>
          <TextInput
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
            style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: "80%" }}
          />
          <Button title="Join Chat" onPress={joinChat} />
          <ScrollView style={{ flex: 1, marginTop: 10, width: "80%" }} contentContainerStyle={{ flexGrow: 1 }}>
            {messages.map((msg, index) => (
              <Text key={index}>{msg}</Text>
            ))}
          </ScrollView>
          <FlatList
            data={messages}
            renderItem={({ item }) => <Text style={{ backgroundColor: "green" }}>{JSON.stringify(item)}</Text>}
            keyExtractor={(item) => item.id}
          />
          <TextInput
            placeholder="Receiver"
            value={receiver}
            onChangeText={setReceiver}
            style={{ borderWidth: 1, padding: 10, marginBottom: 5, width: "80%" }}
          />
          <TextInput
            placeholder="Enter your message"
            value={message}
            onChangeText={setMessage}
            style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: "80%" }}
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
      </View>
    </View>
  );
}
