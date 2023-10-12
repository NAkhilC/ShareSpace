import { Text, View, Button, Dimensions, TextInput, Pressable, TouchableWithoutFeedback, Animated, ActivityIndicator, ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../styles/mainCss";
import Ionicons from "@expo/vector-icons/Ionicons";
import { themeColors } from "../styles/base";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userPreferences, userState } from "../store/actions/user.action";
import { userLogin, userSignUp, verifyOTP } from "../services/api.service";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import { LinearGradient } from "expo-linear-gradient";
import { Bounce } from 'react-native-animated-spinkit';

export default function Login({ isSignedIn, setIsSignedIn }) {
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [isLogin, setIsLogin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [signUp, setSignUp] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toastBanner, setToastBanner] = useState(false);
  const [token, setToken] = useState("");
  const [otpNumber, setOtpNumber] = useState("");
  const [sussessBanner, setSuccessBanner] = useState(false);
  const [okState, setOkState] = useState(false);
  const animatedButtonScale = new Animated.Value(1);
  const windowHeight = Dimensions.get('window').height;

  const dispatch = useDispatch();

  validateSignUpForm = () => {
    if (signUp.email.length > 0 && signUp.email.match(isValidEmail)) {
      if (signUp.name.length > 0) {
        if (signUp.password.length > 0 && signUp.password === confirmPassword) {
          return true;
        } else {
          alert("Password is Invalid! Must be 8 Characters in length and passwords must match");
          return false;
        }
      } else {
        alert("name Feild is invalid");
        return false;
      }
    } else {
      alert("Email is Invalid");
      return false;
    }
  };

  //signup
  signUpForm = async () => {
    if (validateSignUpForm()) {
      const userStatus = await userSignUp(signUp);
      if (userStatus) {
        setToastBanner(true);
      }
    }
  };

  const getLogin = () => {
    return useSelector(store => store.isSignedIn)
  }

  React.useEffect(() => {
    const windowHeight = Dimensions.get('window').height;

    //setIsSignedIn(getLogin);

    // (async () => {
    //   try {
    //     // Retrieve the credentials
    //     const credentials = await Keychain.getGenericPassword();
    //     if (credentials) {
    //       console.log(
    //         'Credentials successfully loaded for user ' + credentials.username
    //       );
    //     } else {
    //       console.log('No credentials stored');
    //     }
    //   } catch (error) {
    //     console.log("Keychain couldn't be accessed!", error);
    //   }
    // })();

    AsyncStorage.getItem('yourSales_userData')
      .then(async (data) => {
        if (data) {
          setLoginLoading(true);
          const res = await userLogin(JSON.parse(data));
          if (res) {
            setIsSignedIn(true);
          }
          setLoginLoading(false);
        }
      })
      .catch((err) => {
      })
  })

  //login
  login = async () => {
    setLoginLoading(true);
    if (loginForm.username?.length > 0 && loginForm.password?.length > 0) {
      if (await userLogin(loginForm)) {
        setIsSignedIn(true);
      }
    }
    setLoginLoading(false);
  };

  //login
  verify = async () => {
    if (await verifyOTP({ email: signUp.email, otp: otpNumber })) {
      setSuccessBanner(true);
    } else {
      setOkState(true);
    }

  };

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

  return (
    <View style={styles.containerFlex}>
      {toastBanner ? (
        <View style={styles.mainToastBanner}>
          {sussessBanner ? (
            <>
              <View style={styles.toastBanner}>
                <View>
                  <Text>
                    <Ionicons name="checkmark-done-circle-outline" size={40} color={themeColors.success} />
                  </Text>
                </View>
                <Text style={{ color: themeColors.success, fontSize: 20 }}> Successfully Registered</Text>
              </View>
              <Pressable style={[styles.successToastButton]} onPress={() => {
                setToastBanner(false);
                setSignUp({
                  email: "",
                  name: "",
                  password: ""
                });
                setLoginForm({ username: "", password: "" });
              }}>
                <Text style={[styles.toggleTextSuccessOk]}>Ok</Text>
              </Pressable>
            </>) :
            <View style={{ width: '90%', marginTop: 10, marginBottom: 10, alignItems: 'center' }}>
              <Text style={{ fontWeight: 500, fontSize: 15 }}>Verification code is sent to your email</Text>
              <TextInput keyboardType="numeric" style={[styles.inputTextBoxItem, { width: '50%', letterSpacing: 10, alignSelf: 'center', textAlign: "center" }]}
                placeholder="9 1 2 7 6 3"
                value={otpNumber}
                onChangeText={(text) => {
                  console.log(text);
                  if (text.length < 7) {
                    setOtpNumber(text);
                  }
                }}
              ></TextInput>
              <View style={[styles.displayFlex, { width: '100%' }]}>
                <TouchableWithoutFeedback onPress={() => { verify() }} onPressIn={onPressIn} onPressOut={onPressOut}>
                  <Animated.View style={[styles.iconContainer, animatedScaleStyle, okState ? { width: '50%' } : '']}>
                    <View style={[styles.loginButton]}>
                      <Text style={styles.text}>Verify</Text>
                    </View>
                  </Animated.View>
                </TouchableWithoutFeedback>
                {okState ?
                  <TouchableWithoutFeedback onPress={() => {
                    setToastBanner(false);
                    setSignUp({
                      email: "",
                      name: "",
                      password: ""
                    });
                    setLoginForm({ username: "", password: "" });
                  }} onPressIn={onPressIn} onPressOut={onPressOut}>
                    <Animated.View style={[styles.iconContainer, animatedScaleStyle, { width: '50%' }]}>
                      <View style={[styles.loginButton]}>
                        <Text style={styles.text}>OK</Text>
                      </View>
                    </Animated.View>
                  </TouchableWithoutFeedback> : <></>
                }
              </View>
            </View>
          }
        </View>
      ) : (
        <></>
      )
      }

      <View style={[toastBanner ? { opacity: 0.1 } : { opacity: 1.0 }, {}]}>

        <ImageBackground source={require('../assets/backimg.png')} resizeMode="cover" style={{ opacity: 0.8 }}>

          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.9)']}
          >
            <View style={styles.irrgegular1}>
            </View>

            <View style={styles.irrgegularText}>
              <Text style={{ fontSize: 40, color: 'white', fontWeight: 500, fontFamily: 'Arial' }}>
                {!isLogin ? 'Sign In' : 'Create Account'}
              </Text>
              <Text style={{ fontSize: 25, color: 'white', fontWeight: 200, fontFamily: 'Arial' }}>
                {!isLogin ? 'Welcome' : 'Your first step'}
              </Text>
            </View>
            <View style={styles.irrgegular2}>
            </View>
          </LinearGradient>

        </ImageBackground>

        <KeyboardAwareScrollView style={{ backgroundColor: 'white', borderRadius: 20, position: 'absolute', width: '100%', marginTop: windowHeight * 0.3 }}>
          <View >
            {!isLogin ? (
              <View >
                {!loginLoading ?
                  <View>
                    <View style={{ height: 150, marginTop: 20 }}>
                      <View style={styles.loginBlock1}>
                        <View style={styles.displayFlex}>
                          <Ionicons name="person" size={20} color={themeColors.primary} />
                          <Text style={styles.Icontext}>Email</Text>
                        </View>
                        <TextInput
                          style={styles.loginBlockTextInput}
                          name="username"
                          value={loginForm.username}
                          placeholder="findmate777@yahoo.com"
                          onChangeText={(text) => {
                            setLoginForm({ ...loginForm, username: text });
                          }}
                        ></TextInput>
                      </View>
                      <View style={[styles.loginBlock1, { marginTop: 1 }]}>
                        <View style={styles.displayFlex}>
                          <Ionicons name="lock-open" size={20} color={themeColors.primary} />
                          <Text style={styles.Icontext}>Password</Text>
                        </View>
                        <TextInput
                          style={styles.loginBlockTextInput}
                          name="password"
                          value={loginForm.password}
                          placeholder="**********"
                          secureTextEntry={true}
                          onChangeText={(text) => {
                            setLoginForm({ ...loginForm, password: text });
                          }}
                        ></TextInput>
                      </View>

                    </View>

                    <Text style={{ textAlign: 'center', marginTop: 20, color: themeColors.primary }}>Forgot your password ?</Text>

                    <TouchableWithoutFeedback onPress={() => login()} onPressIn={onPressIn} onPressOut={onPressOut}>
                      <Animated.View style={[styles.iconContainer, animatedScaleStyle]}>
                        <View style={[styles.loginButton]}>
                          <Text style={styles.text}>Login</Text>
                        </View>
                      </Animated.View>
                    </TouchableWithoutFeedback>

                    <Pressable onPress={() => { setIsLogin(true); setLoginForm({ username: null, password: null }); setSignUp({ email: null, password: null, name: null }); setConfirmPassword(null); }}>
                      <Text style={{ textAlign: 'center', marginTop: 20, color: themeColors.primary }}>Don't have an account? <Text style={{ fontWeight: 700 }}> Register</Text></Text>
                    </Pressable>
                  </View> :
                  <View style={{ height: windowHeight }}>
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                      <Bounce size={100} color={themeColors.primary} />
                      <Text style={{ textAlign: 'center', marginTop: 40 }}>Please wait while we sign you in...</Text>
                    </View>
                  </View>}
              </View>) :
              <View>
                <View style={{ height: 300 }}>
                  <View style={styles.loginBlock1}>
                    <View style={styles.displayFlex}>
                      <Ionicons name="person" size={20} color={themeColors.primary} />
                      <Text style={styles.Icontext}>Email</Text>
                    </View>
                    <TextInput
                      onChangeText={(text) => {
                        setSignUp({ ...signUp, email: text });
                      }}
                      value={signUp.email}
                      placeholder="signup777@yahoo.com"
                      style={styles.loginBlockTextInput}
                      name="email"
                    ></TextInput>
                  </View>
                  <View style={[styles.loginBlock1, { marginTop: 1 }]}>
                    <View style={styles.displayFlex}>
                      <Ionicons name="person-circle" size={20} color={themeColors.primary} />
                      <Text style={styles.Icontext}>Name</Text>
                    </View>

                    <TextInput
                      onChangeText={(text) => {
                        setSignUp({ ...signUp, name: text });
                      }}
                      placeholder="Firstname Lastname"
                      secureTextEntry={false}
                      value={signUp.name}
                      style={styles.loginBlockTextInput}
                      name="name"
                    ></TextInput>
                  </View>
                  <View style={[styles.loginBlock1, { marginTop: 1 }]}>
                    <View style={styles.displayFlex}>
                      <Ionicons name="lock-open" size={20} color={themeColors.primary} />
                      <Text style={styles.Icontext}>Password</Text>
                    </View>

                    <TextInput
                      onChangeText={(text) => {
                        setSignUp({ ...signUp, password: text });
                      }}
                      value={signUp.password}
                      placeholder="**********"
                      secureTextEntry={true}
                      style={styles.loginBlockTextInput}
                      name="password"
                    ></TextInput>
                  </View>
                  <View style={[styles.loginBlock1, { marginTop: 1 }]}>
                    <View style={styles.displayFlex}>
                      <Ionicons name="lock-open" size={20} color={themeColors.primary} />
                      <Text style={styles.Icontext}>Confirm Password</Text>
                    </View>

                    <TextInput
                      onChangeText={(text) => {
                        setConfirmPassword(text);
                      }}
                      value={confirmPassword}
                      style={styles.loginBlockTextInput}
                      placeholder="**********"
                      secureTextEntry={true}
                      name="username"
                    ></TextInput>
                  </View>
                </View>
                <TouchableWithoutFeedback onPress={() => signUpForm()} onPressIn={onPressIn} onPressOut={onPressOut}>
                  <Animated.View style={[styles.iconContainer, animatedScaleStyle, { marginTop: 30 }]}>
                    <View style={[styles.loginButton]}>
                      <Text style={styles.text}>Sign up</Text>
                    </View>
                  </Animated.View>
                </TouchableWithoutFeedback>

                <Pressable onPress={() => { setIsLogin(false); setSignUp({ email: null, password: null, name: null }); setLoginForm({ username: null, password: null }); }}>
                  <Text style={{ textAlign: 'center', marginTop: 20, color: themeColors.primary }}>Already have an account? <Text style={{ fontWeight: 700 }}> Sign in</Text></Text>
                </Pressable>
              </View>}
          </View>
        </KeyboardAwareScrollView>
      </View >

    </View>
  );
}
