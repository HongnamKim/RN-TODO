import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACCOUNTS_KEY } from "./dbKeys";
import { Alert } from "react-native";

export const signIn = async (email, password) => {
  // 로그인 시도 시 AsyncStorage에 있는 계정 객체를 불러옴.
  let accountList = {};
  const d = await AsyncStorage.getItem(ACCOUNTS_KEY);
  if (d !== null) {
    accountList = JSON.parse(d);
  }
  // accountList 객체의 key(이메일) 저장 --> emailList
  const emailList = Object.keys(accountList);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // submit 된 email이 존재, password를 정확히 입력한 경우
      if (emailList.indexOf(email) !== -1 && password === accountList[email]) {
        resolve(email);
      }
      // submit 된 email이 존재하지 않는 경우
      else if (emailList.indexOf(email) === -1) {
        reject("존재하지 않는 계정입니다.");
      }
      // submit 된 email이 존재하지만, password가 틀린 경우
      else if (password !== accountList[email]) {
        reject("비밀번호를 확인해주세요.");
      }
    }, 1000);
  });
};

export const signUp = async (email, password, checkPassword) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      // AsyncStorage에 저장되어있는 계정 객체를 불러옴 --> accountList
      // accountList 객체의 key(이메일) 저장 --> emailList
      let accountList = {};
      const d = await AsyncStorage.getItem(ACCOUNTS_KEY);
      if (d !== null) {
        accountList = JSON.parse(d);
      }
      const emailList = Object.keys(accountList);
      // email 형식이 아닌 경우
      if (!email.includes("@") || !email.includes(".")) {
        reject("이메일 형식이 아닙니다.");
      }
      // submit된 email이 이미 존재하는 경우
      else if (emailList.indexOf(email) !== -1) {
        reject("이미 존재하는 계정입니다.");
      }
      // email이 존재하지 않고 비밀번호를 정확히 입력
      else if (password === checkPassword) {
        // 기존 accountList 복사
        const newAccountList = { ...accountList };

        // 제출된 email과 password 추가
        newAccountList[email] = password;

        // AsyncStorage에 setItem
        await AsyncStorage.setItem(
          ACCOUNTS_KEY,
          JSON.stringify(newAccountList)
        );
        resolve("회원가입 되었습니다.");
      } else {
        reject("입력한 두 비밀번호가 다릅니다.");
      }
    }, 1000);
  });
};

export const deleteAccount = async (email) => {
  try {
    const d = await AsyncStorage.getItem(ACCOUNTS_KEY);
    const accountList = JSON.parse(d);

    delete accountList[email];

    await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accountList));
  } catch (error) {
    Alert(error);
  }
};
