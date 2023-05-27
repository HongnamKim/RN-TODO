import { Image, StyleSheet, Text, View } from "react-native";

import ImgMain from "../../assets/main.png";

import { PRIMARY } from "../colors";

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Image source={ImgMain} style={styles.image} />
      <Text style={styles.text}>할 일을 추가해주세요</Text>
    </View>
  );
};

EmptyList.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 200,
    width: 200,
  },
  text: {
    fontSize: 24,
    fontWeight: "700",
    color: PRIMARY.DEFAULT,
    marginTop: 10,
  },
});

export default EmptyList;
