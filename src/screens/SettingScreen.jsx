import { Alert, StyleSheet, View } from "react-native";
import Button, { ButtonTypes } from "../components/Button";
import { useUserContext } from "../contexts/UserContext";
import { deleteAccount } from "../api/auth";
import Avartar from "../components/Avartar";

const SettingScreen = () => {
  const { user, setUser } = useUserContext();

  return (
    <View style={styles.container}>
      <Avartar />
      <View style={styles.buttonContainer}>
        <Button
          title="로그아웃"
          onPress={() =>
            Alert.alert("로그아웃", "로그아웃", [
              {
                text: "로그아웃",
                onPress: () => {
                  setUser(null);
                },
                style: "destructive",
              },
              {
                text: "취소",
                style: "default",
              },
            ])
          }
          buttonType={ButtonTypes.DANGER}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="계정 탈퇴"
          onPress={() =>
            Alert.alert("계정 탈퇴", "정말로 탈퇴하십니까?", [
              {
                text: "탈퇴",
                onPress: () => {
                  deleteAccount(user);
                  setUser(null);
                },
                style: "destructive",
              },
              {
                text: "취소",
                style: "default",
              },
            ])
          }
          buttonType={ButtonTypes.DANGER}
        />
      </View>
    </View>
  );
};

SettingScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  account: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});

export default SettingScreen;
