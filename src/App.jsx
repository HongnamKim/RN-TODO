import "react-native-get-random-values";
import { StatusBar } from "expo-status-bar";

import UserProvider from "./contexts/UserContext";
import Navigation from "./navigations/Navigation";
import DarkModeProvider from "./contexts/DarkModeContext";

export default function App() {
  return (
    <UserProvider>
      <DarkModeProvider>
        <StatusBar style="dark" />
        <Navigation />
      </DarkModeProvider>
    </UserProvider>
  );
}
