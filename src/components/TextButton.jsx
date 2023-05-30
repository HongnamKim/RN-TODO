import { Pressable, StyleSheet, Text } from "react-native";

import PropTypes from "prop-types";

import { useTheme } from "styled-components";

const TextButton = ({ title, onPress }) => {
  const { COLORS } = useTheme();
  return (
    <Pressable onPress={onPress} style={styles.button}>
      {({ pressed }) => (
        <Text
          style={[
            { color: COLORS.subText, lineHeight: 20 },
            pressed && { color: COLORS.GRAY.DARK },
          ]}
        >
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
});

export default TextButton;
