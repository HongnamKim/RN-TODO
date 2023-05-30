import { useUserContext } from "../contexts/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import { StatusBar } from "expo-status-bar";
import { useDarkModeContext } from "../contexts/DarkModeContext";

const Navigation = () => {
  const { user } = useUserContext();
  const { isDarkMode } = useDarkModeContext();
  return (
    <NavigationContainer>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
