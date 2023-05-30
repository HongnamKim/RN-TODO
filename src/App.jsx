import "react-native-get-random-values";

import UserProvider from "./contexts/UserContext";
import Navigation from "./navigations/Navigation";
import DarkModeProvider from "./contexts/DarkModeContext";

export default function App() {
  return (
    <UserProvider>
      <DarkModeProvider>
        <Navigation />
      </DarkModeProvider>
    </UserProvider>
  );
}
