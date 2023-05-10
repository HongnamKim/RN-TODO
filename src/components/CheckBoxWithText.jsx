import { Pressable, StyleSheet, Text } from "react-native";
import CheckBox from "expo-checkbox";
import PropTypes from "prop-types";

import { GRAY } from "../colors";

const CheckBoxWithText = ({ title, value, onValueChange }) => {
  return (
    <Pressable style={styles.container} onPress={onValueChange}>
      <CheckBox
        style={styles.checkbox}
        value={value}
        onValueChange={onValueChange}
      />
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

CheckBoxWithText.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.bool,
  onValueChange: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    borderColor: GRAY.DEFAULT,
    borderWidth: 1,
    marginRight: 10,
  },
});

export default CheckBoxWithText;
