import { Alert, Keyboard, StyleSheet, View } from "react-native";
import Input, { IconNames, ReturnKeyType } from "../components/Input";
import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import SafeInputView from "../components/SafeInputView";
import { signUp } from "../api/auth";
import { useNavigation } from "@react-navigation/native";
import CheckBoxWithText from "../components/CheckBoxWithText";

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassWord] = useState(false);

  const passwordRef = useRef(null);
  const checkPasswordRef = useRef(null);

  useEffect(() => {
    setDisabled(!email || !password || !checkPassword);
  }, [email, password, checkPassword]);

  const onSubmit = async () => {
    if (isLoading || disabled) {
      return;
    }
    try {
      setIsLoading((prev) => !prev);
      Keyboard.dismiss();

      const signUpResult = await signUp(email, password, checkPassword);

      Alert.alert("회원가입 성공", signUpResult, [
        { text: "확인", onPress: () => navigation.goBack() },
      ]);

      setIsLoading((prev) => !prev);
    } catch (error) {
      Alert.alert("회원가입 실패", error, [
        { text: "확인", onPress: () => setIsLoading((prev) => !prev) },
      ]);
    }
  };

  return (
    <SafeInputView>
      <View style={styles.container}>
        <Input
          title={"이메일"}
          placeholder={"your@email.com"}
          iconName={IconNames.EMAIL}
          returnKeyType={ReturnKeyType.NEXT}
          value={email}
          onChangeText={(e) => setEmail(e.trim())}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <Input
          ref={passwordRef}
          title={"비밀번호"}
          secureTextEntry={showPassword}
          iconName={IconNames.PASSWORD}
          returnKeyType={ReturnKeyType.NEXT}
          value={password}
          onChangeText={(e) => setPassword(e.trim())}
          onSubmitEditing={() => checkPasswordRef.current.focus()}
        />
        <Input
          ref={checkPasswordRef}
          title={"비밀번호 확인"}
          secureTextEntry={showPassword}
          iconName={IconNames.PASSWORD}
          returnKeyType={ReturnKeyType.DONE}
          value={checkPassword}
          onChangeText={(e) => setCheckPassword(e.trim())}
          onSubmitEditing={onSubmit}
        />
        <View style={styles.checkboxContainer}>
          <CheckBoxWithText
            title={"비밀번호 보이기"}
            value={showPassword}
            onValueChange={() => setShowPassWord((prev) => !prev)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="회원가입"
            disabled={disabled}
            isLoading={isLoading}
            onPress={onSubmit}
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
  checkboxContainer: {
    width: "100%",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    marginTop: 5,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default SignUpScreen;
