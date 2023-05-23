import { StyleSheet, View, Image, Keyboard, Alert, Text } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PropTypes from "prop-types";

import Input, {
  KeyboardType,
  ReturnKeyType,
  IconNames,
} from "../components/Input";
import SafeInputView from "../components/SafeInputView";
import CheckBoxWithText from "../components/CheckBoxWithText";
import Button from "../components/Button";
import TextButton from "../components/TextButton";

import { signIn } from "../api/auth";
import { NotSupport } from "../util/NotSupport";

import ImgMain from "../../assets/main.png";
import { useUserContext } from "../contexts/UserContext";
import { EMAIL_STORAGE } from "../api/dbKeys";

const SignInScreen = ({ navigation }) => {
  const { setUser } = useUserContext();

  const passwordRef = useRef(null);
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassWord] = useState(false);
  const [saveEmail, setSaveEmail] = useState(false);

  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadEmail();
  }, []);

  useEffect(() => {
    setDisabled(!email || !password);
  }, [email, password]);

  const uploadEmail = async (saveEmail, email) => {
    try {
      if (saveEmail) {
        // 계정 기억 O --> 입력한 email을 storage에 저장
        const data = { saveEmail, email };
        await AsyncStorage.setItem(EMAIL_STORAGE, JSON.stringify(data));
      } else {
        // 계정 기억 x --> 빈 string을 storage에 저장
        const data = { saveEmail, email: "" };
        await AsyncStorage.setItem(EMAIL_STORAGE, JSON.stringify(data));
      }
    } catch (error) {
      Alert(error);
    }
  };

  const loadEmail = async () => {
    try {
      const d = await AsyncStorage.getItem(EMAIL_STORAGE);
      const data = JSON.parse(d);
      if (data.saveEmail) {
        setEmail(data.email);
        setSaveEmail(true);
      }
    } catch (error) {
      Alert(error);
    }
  };

  const onSubmit = async () => {
    if (isLoading || disabled) {
      return;
    }
    try {
      setIsLoading((prev) => !prev);
      Keyboard.dismiss();
      const data = await signIn(email, password);
      setUser(data);
      await uploadEmail(saveEmail, email);
      setIsLoading((prev) => !prev);
      navigation.navigate("List");
    } catch (error) {
      Alert.alert("로그인 실패", error, [
        { text: "확인", onPress: () => setIsLoading((prev) => !prev) },
      ]);
    }
  };

  return (
    <SafeInputView>
      <View
        style={[
          styles.container,
          { paddingBottom: insets.bottom, paddingTop: insets.top },
        ]}
      >
        <Image source={ImgMain} alt="main image" style={styles.image} />

        <Input
          title="email"
          placeholder="your@email.com"
          keyboardType={KeyboardType.EMAIL}
          returnKeyType={ReturnKeyType.NEXT}
          value={email}
          defaultValue={email}
          onChangeText={(e) => setEmail(e.trim())}
          iconName={IconNames.EMAIL}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <Input
          ref={passwordRef}
          title="password"
          secureTextEntry={showPassword}
          returnKeyType={ReturnKeyType.DONE}
          value={password}
          onChangeText={(e) => setPassword(e.trim())}
          iconName={IconNames.PASSWORD}
          onSubmitEditing={onSubmit}
        />
        <View style={styles.checkboxContainer}>
          <CheckBoxWithText
            title={"비밀번호 보이기"}
            value={showPassword}
            onValueChange={() => setShowPassWord((prev) => !prev)}
          />
          <CheckBoxWithText
            title={"계정 기억하기"}
            value={saveEmail}
            onValueChange={() => setSaveEmail((prev) => !prev)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={"로그인"}
            onPress={onSubmit}
            disabled={disabled}
            isLoading={isLoading}
          />
        </View>
        <View style={styles.textButtonContainer}>
          <TextButton
            title={"회원가입"}
            onPress={() => navigation.navigate("SignUp")}
          />
          <Text style={{ color: "#515151" }}>/</Text>
          <TextButton
            title={"이메일 또는 비밀번호 찾기"}
            onPress={() => NotSupport("이메일 또는 비밀번호 찾기")}
          />
        </View>
      </View>
    </SafeInputView>
  );
};

SignInScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  checkboxContainer: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },

  buttonContainer: {
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  textButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});

export default SignInScreen;
