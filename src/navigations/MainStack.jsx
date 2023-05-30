import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingScreen from "../screens/SettingScreen";

import HeaderLeftButton from "../components/HeaderLeftButton";
import HeaderRightButton from "../components/HeaderRightButton";
import ListsTab from "./ListsTab";
import { useTheme } from "styled-components";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const { COLORS } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: COLORS.mainBg,
        },
        headerTitleAlign: "center",
        headerTintColor: COLORS.PRIMARY.DEFAULT,
        headerStyle: {
          backgroundColor: COLORS.mainBg,
        },
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
