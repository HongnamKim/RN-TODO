import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "styled-components";

import ImgMain from "../../assets/main.png";

const EmptyList = () => {
  const { COLORS } = useTheme();
  return (
    <View style={styles.container}>
      <Image source={ImgMain} style={styles.image} />
      <Text style={[styles.text, { color: COLORS.PRIMARY.DEFAULT }]}>
        할 일을 추가해주세요
      </Text>
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
    fontSize: 20,
    fontWeight: "700",

    marginTop: 10,
  },
});

export default EmptyList;
