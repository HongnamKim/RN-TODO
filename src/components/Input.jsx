import { StyleSheet, Text, TextInput, View } from "react-native";
import { forwardRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

import { BLACK, GRAY, PRIMARY } from "../colors";

export const KeyboardType = {
  DEFAULT: "default",
  EMAIL: "email-address",
};

export const ReturnKeyType = {
  DONE: "done",
  NEXT: "next",
};

export const IconNames = {
  EMAIL: "email",
  PASSWORD: "lock",
};

//비밀번호 보이기 체크 == true
//secureTextEntry={true} :  비밀번호 가리기
// 두 요소가 반대로 작동함;;; 개선안 필요

const Input = forwardRef(
  ({ title, placeholder, value, iconName, secureTextEntry, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const setIconColor = () => {
      switch (true) {
        case isFocused:
          return PRIMARY.DEFAULT;
        case !!value:
          return BLACK;
        default:
          return GRAY.DEFAULT;
      }
    };

    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.title,
            value && styles.hasValueTitle,
            isFocused && styles.focusedTitle,
          ]}
        >
          {title}
        </Text>
        <View>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={iconName}
              size={24}
              color={setIconColor()}
            />
          </View>
          <TextInput
            ref={ref}
            style={[
              styles.input,
              value && styles.hasValueInput,
              isFocused && styles.focusedInput,
            ]}
            {...props}
            placeholder={placeholder ?? title}
            secureTextEntry={!secureTextEntry}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            placeholderTextColor={GRAY.DEFAULT}
            keyboardAppearance="light"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
      </View>
    );
  }
);

Input.displayName = "Input";

Input.defaultProps = {
  keyboardType: KeyboardType.DEFAULT,
  returnKeyType: ReturnKeyType.DONE,
  secureTextEntry: true,
};

Input.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.oneOf(Object.values(KeyboardType)),
  returnKeyType: PropTypes.oneOf(Object.values(ReturnKeyType)),
  secureTextEntry: PropTypes.bool,
  value: PropTypes.string,
  iconName: PropTypes.oneOf(Object.values(IconNames)),
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    marginBottom: 4,
    color: GRAY.DEFAULT,
  },
  focusedTitle: {
    color: PRIMARY.DEFAULT,
  },
  hasValueTitle: {
    color: BLACK,
  },
  iconContainer: {
    position: "absolute",
    left: 8,
    height: "100%",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,

    paddingLeft: 36,
    height: 42,
    borderColor: GRAY.DEFAULT,
  },
  focusedInput: {
    borderColor: PRIMARY.DEFAULT,
    color: PRIMARY.DEFAULT,
  },
  hasValueInput: {
    borderColor: BLACK,
    color: BLACK,
  },
});

export default Input;
