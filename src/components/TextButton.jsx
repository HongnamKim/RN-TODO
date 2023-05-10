import { Pressable, StyleSheet, Text } from "react-native";
import { useState } from "react";
import PropTypes from "prop-types";

import { GRAY } from "../colors";

const TextButton = ({ title, onPress }) => {
  const [pressed, setPressed] = useState();
  return (
    <Pressable
      style={({ pressed }) => [styles.button, setPressed(pressed)]}
      onPress={onPress}
    >
      <Text style={[styles.text, pressed && { color: GRAY.DEFAULT }]}>
        {title}
      </Text>
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
    color: "#515151",
    lineHeight: 20,
  },
});

export default TextButton;
