import { Pressable, StyleSheet, Text } from "react-native";

import PropTypes from "prop-types";

import { GRAY } from "../colors";

const TextButton = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      {({ pressed }) => (
        <Text style={[styles.text, pressed && { color: GRAY.DEFAULT }]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

TextButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: GRAY.DARK,
    lineHeight: 20,
  },
});

export default TextButton;
