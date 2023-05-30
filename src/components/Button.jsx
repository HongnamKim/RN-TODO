import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

import { useTheme } from "styled-components";

export const ButtonTypes = {
  PRIMARY: "PRIMARY",
  DANGER: "DANGER",
};

const Button = ({ title, onPress, disabled, isLoading, buttonType }) => {
  const { COLORS } = useTheme();

  const colors = { PRIMARY: COLORS.PRIMARY, DANGER: COLORS.DANGER };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => {
        return [
          styles.container,
          { backgroundColor: colors[buttonType].DEFAULT },
          pressed && { backgroundColor: colors[buttonType].DARK },
          disabled && { backgroundColor: COLORS.PRIMARY.LIGHT },
        ];
      }}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={COLORS.GRAY.DEFAULT} />
      ) : (
        <Text style={[styles.title, { color: COLORS.WHITE }]}>{title}</Text>
      )}
    </Pressable>
  );
};

Button.defaultProps = {
  buttonType: ButtonTypes.PRIMARY,
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  buttonType: PropTypes.oneOf(Object.values(ButtonTypes)),
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 20,
  },
});

export default Button;
