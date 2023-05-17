import { StyleSheet, Text, View } from "react-native";
//import PropTypes from "prop-types";

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>Cart Screen</Text>
    </View>
  );
};

CartScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CartScreen;
