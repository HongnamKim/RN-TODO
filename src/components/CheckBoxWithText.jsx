import { Pressable, StyleSheet, Text } from "react-native";
import CheckBox from "expo-checkbox";
import PropTypes from "prop-types";

import { useTheme } from "styled-components";

const CheckBoxWithText = ({ title, value, onValueChange }) => {
  const { COLORS } = useTheme();
  return (
    <Pressable style={styles.container} onPress={onValueChange}>
      <CheckBox
        style={[styles.checkbox, { borderColor: COLORS.GRAY.DEFAULT }]}
        value={value}
        onValueChange={onValueChange}
      />
      <Text style={{ color: COLORS.mainText }}>{title}</Text>
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
    marginBottom: 10,
  },
  checkbox: {
    borderWidth: 1,
    marginRight: 10,
  },
});

export default CheckBoxWithText;
