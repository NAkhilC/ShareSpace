import { Text, View, Animated, TouchableWithoutFeedback } from "react-native";
import { styles } from "../../styles/mainCss";
import { useState } from "react";
import { themeColors } from "../../styles/base";
export default function AnimateButton(props) {
  const [disable, setDisable] = useState(false);
  const animatedButtonScale = new Animated.Value(1);
  const onPressIn = () => {
    Animated.parallel([
      Animated.spring(animatedButtonScale, {
        toValue: 1.2,
        useNativeDriver: true,
      }).start(),
      setDisable(true),
    ]);
  };
  const onPressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      backgroundColor: "red",
    }).start(),
      setDisable(false);
  };

  function callParentFunction() {
    if (props.callingFunction) {
      props.callingFunction("hey");
    }
  }

  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };
  return (
    <TouchableWithoutFeedback
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={() => {
        callParentFunction();
      }}
    >
      <Animated.View style={[styles.iconContainer, animatedScaleStyle]}>
        <View style={[styles.loginButton, { width: "100%", opacity: disable ? 0.5 : 1 }]}>
          <Text style={styles.text}>{props.name}</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
