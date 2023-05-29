import {
  Animated,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from "react-native";
import PropTypes from "prop-types";
import { BLACK, GRAY, PRIMARY, WHITE } from "../colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const BOTTOM = 10;
const BUTTON_WIDTH = 60;

const InputFAB = ({ onInsert }) => {
  const [text, setText] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(BOTTOM);
  const tabBarHeight = useBottomTabBarHeight();
  const inputRef = useRef();
  const windowWidth = useWindowDimensions().width;

  const inputWidth = useRef(new Animated.Value(BUTTON_WIDTH)).current;
  const buttonRotation = useRef(new Animated.Value(0)).current;

  const spin = buttonRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-45deg"],
  });

  useEffect(() => {
    if (Platform.OS === "ios") {
      const open = Keyboard.addListener("keyboardWillShow", (e) => {
        setKeyboardHeight(e.endCoordinates.height - tabBarHeight + BOTTOM);
      });

      const close = Keyboard.addListener("keyboardWillHide", () => {
        setKeyboardHeight(BOTTOM);
      });

      return () => {
        open.remove();
        close.remove();
      };
    }
  }, [tabBarHeight]);

  const open = () => {
    setIsOpened(true);

    Animated.timing(inputWidth, {
      toValue: windowWidth - 20,
      useNativeDriver: false,
      duration: 300,
    }).start(() => {
      inputRef.current.focus();
    });

    Animated.timing(buttonRotation, {
      toValue: 1,
      useNativeDriver: false,
      duration: 300,
    }).start();
  };

  const close = () => {
    setText("");
    setIsOpened(false);

    Animated.timing(inputWidth, {
      toValue: BUTTON_WIDTH,
      useNativeDriver: false,
      duration: 300,
    }).start(() => {
      inputRef.current.blur();
    });
    Animated.timing(buttonRotation, {
      toValue: 0,
      useNativeDriver: false,
      duration: 300,
    }).start();
  };

  const onPressButton = () => {
    isOpened ? close() : open();
  };

  const onPressInsert = () => {
    const task = text.trim();
    if (task) {
      onInsert(task);
    }
  };

  return (
    <>
      <Animated.View
        style={[
          styles.position,
          styles.shape,
          styles.shadow,
          {
            justifyContent: "center",
            bottom: keyboardHeight,
            width: inputWidth,
          },
        ]}
      >
        <TextInput
          ref={inputRef}
          onBlur={() => {
            setText("");
            inputRef.current.focus();
          }}
          value={text}
          onChangeText={(e) => setText(e)}
          style={[styles.input]}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          keyboardAppearance="light"
          returnKeyType="done"
          spellCheck={false}
          onSubmitEditing={onPressInsert}
        ></TextInput>
      </Animated.View>
      <Animated.View
        style={[
          styles.position,
          styles.shape,
          {
            bottom: keyboardHeight,
            transform: [{ rotate: spin }],
          },
        ]}
      >
        <Pressable
          style={[styles.shape, styles.button]}
          onPress={onPressButton}
        >
          {({ pressed }) => (
            <MaterialCommunityIcons
              name="plus"
              size={24}
              color={pressed ? GRAY.DEFAULT : WHITE}
            />
          )}
        </Pressable>
      </Animated.View>
    </>
  );
};

InputFAB.propTypes = {
  onInsert: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  position: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  shape: {
    height: BUTTON_WIDTH,
    width: BUTTON_WIDTH,
    borderRadius: BUTTON_WIDTH / 2,
    backgroundColor: PRIMARY.DEFAULT,
  },
  input: {
    paddingLeft: 20,
    paddingRight: BUTTON_WIDTH,
    color: WHITE,
    fontSize: 16,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  shadow: {
    shadowColor: BLACK,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export default InputFAB;
