import { Alert } from "react-native";

export const NotSupport = (title) => {
  Alert.alert(title, "지원하지 않는 기능입니다.", [{ text: "확인" }]);
};
