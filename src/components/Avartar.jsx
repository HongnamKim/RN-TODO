import { Image, StyleSheet, Text, View } from "react-native";
import { useUserContext } from "../contexts/UserContext";

import ImgAvatar from "../../assets/avatar.jpeg";
import { BLACK } from "../colors";

const Avartar = () => {
  const { user } = useUserContext();
  return (
    <View style={styles.avatarContainer}>
      <Image source={ImgAvatar} style={styles.image} />
      <Text style={styles.account}>{user}</Text>
    </View>
  );
};

Avartar.propTypes = {};

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 20,
  },
  account: {
    fontSize: 25,
    fontWeight: "600",
    color: BLACK,
  },
});

export default Avartar;
