import { StyleSheet, View, Image, Keyboard, Alert, Text } from "react-native";
import { useEffect, useRef, useState } from "react";

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

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassWord] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDisabled(!email || !password);
  }, [email, password]);

  const passwordRef = useRef(null);

  const handleEmailChange = (e) => {
    setEmail(e.trim());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.trim());
  };

  const handleShowPassword = () => {
    setShowPassWord((prev) => !prev);
  };

  const onSubmit = async () => {
    if (isLoading || disabled) {
      return;
    }
    try {
      setIsLoading((prev) => !prev);
      Keyboard.dismiss();
      const data = await signIn(email, password);
      console.log(data);
      setIsLoading((prev) => !prev);
    } catch (error) {
      Alert.alert("로그인 실패", error, [
        { text: "확인", onPress: () => setIsLoading((prev) => !prev) },
      ]);
    }
  };

  return (
    <SafeInputView>
      <View style={styles.container}>
        <Image source={ImgMain} alt="main image" style={styles.image} />
        <Input
          title="email"
          placeholder="your@email.com"
          keyboardType={KeyboardType.EMAIL}
          returnKeyType={ReturnKeyType.NEXT}
          value={email}
          onChangeText={handleEmailChange}
          iconName={IconNames.EMAIL}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <Input
          ref={passwordRef}
          title="password"
          secureTextEntry={showPassword}
          returnKeyType={ReturnKeyType.DONE}
          value={password}
          onChangeText={handlePasswordChange}
          iconName={IconNames.PASSWORD}
        />
        <View style={styles.checkboxContainer}>
          <CheckBoxWithText
            title={"비밀번호 보이기"}
            value={showPassword}
            onValueChange={handleShowPassword}
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
            onPress={() => NotSupport("회원가입")}
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
    marginTop: 20,
    paddingHorizontal: 20,
  },
  textButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});

export default SignInScreen;
