import "react-native-get-random-values";
import { StatusBar } from "expo-status-bar";

import UserProvider from "./contexts/UserContext";
import Navigation from "./navigations/Navigation";

export default function App() {
  return (
    <UserProvider>
      <StatusBar style="dark" />
      <Navigation />
    </UserProvider>
  );
}
