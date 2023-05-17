import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingScreen from "../screens/SettingScreen";
import { PRIMARY, WHITE } from "../colors";
import HeaderLeftButton from "../components/HeaderLeftButton";
import HeaderRightButton from "../components/HeaderRightButton";
import ListsTab from "./ListsTab";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: WHITE,
        },
        headerTitleAlign: "center",
        headerTintColor: PRIMARY.DEFAULT,
        headerTitleStyle: {
          fontWeight: "700",
        },
        headerLeft: HeaderLeftButton,
      }}
    >
      <Stack.Screen
        name="List"
        component={ListsTab}
        options={{ title: "TODO List", headerRight: HeaderRightButton }}
      />
      <Stack.Screen name="Settings" component={SettingScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
