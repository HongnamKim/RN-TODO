import { StyleSheet, Text, View, Switch } from "react-native";
import PropTypes from "prop-types";
import { useDarkModeContext } from "../contexts/DarkModeContext";
import { useTheme } from "styled-components";

const SwitchContainer = ({ title }) => {
  const { COLORS } = useTheme();
  const { isDarkMode, setIsDarkMode } = useDarkModeContext();
  return (
    <View style={[styles.switchContainer, { backgroundColor: COLORS.subBg }]}>
      <Text style={[styles.switchTitle, { color: COLORS.mainText }]}>
        {title}
      </Text>
      <Switch
        value={isDarkMode}
        onValueChange={() => {
          setIsDarkMode((prev) => !prev);
        }}
      />
    </View>
  );
};

SwitchContainer.propTypes = {
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  switchTitle: { fontSize: 16 },
});

export default SwitchContainer;
