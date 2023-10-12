import { Text, View, Button, Image, TextInput, Pressable } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import { styles } from "../styles/mainCss";
import Ionicons from "@expo/vector-icons/Ionicons";
import { themeColors } from "../styles/base";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Signup() {
  return (
    <View style={styles.containerFlex}>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpHeaderText}>Register Here</Text>

        <View style={styles.loginTextInput}>
          <View style={styles.loginTextInputBox}>
            <View style={styles.loginTextInputIcon}>
              <Text>
                <Ionicons name="person-outline" size={28} color={themeColors.primary} />
              </Text>
            </View>
            <View style={styles.LoginInputValue}>
              <TextInput placeholder="Create UserId" style={{ height: "100%" }} name="username"></TextInput>
            </View>
          </View>
          <View style={styles.loginTextInputBox}>
            <View style={styles.loginTextInputIcon}>
              <Text>
                <Ionicons name="mail-outline" size={28} color={themeColors.primary} />
              </Text>
            </View>
            <View style={styles.LoginInputValue}>
              <TextInput placeholder="Enter Email" style={{ height: "100%" }} name="username"></TextInput>
            </View>
          </View>
          <View style={styles.loginTextInputBox}>
            <View style={styles.loginTextInputIcon}>
              <Text>
                <Ionicons name="person-circle-outline" size={28} color={themeColors.primary} />
              </Text>
            </View>
            <View style={styles.LoginInputValue}>
              <TextInput placeholder="Enter Name" style={{ height: "100%" }} name="username"></TextInput>
            </View>
          </View>
          <View style={styles.loginButton}>
            <Pressable>
              <Text style={styles.text}>Register</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
