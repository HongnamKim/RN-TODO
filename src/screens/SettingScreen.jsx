import { StyleSheet, View } from "react-native";
import Button, { ButtonTypes } from "../components/Button";
import { useUserContext } from "../contexts/UserContext";

const SettingScreen = () => {
  const { setUser } = useUserContext();

  return (
    <View style={styles.container}>
      <Button
        title="Log-Out"
        onPress={() => setUser(null)}
        buttonType={ButtonTypes.DANGER}
      />
    </View>
  );
};

SettingScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});

export default SettingScreen;
