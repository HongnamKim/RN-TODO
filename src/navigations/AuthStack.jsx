import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "../screens/SignInScreen";

import SignUpScreen from "../screens/SignUpScreen";

import HeaderLeftButton from "../components/HeaderLeftButton";
import { useTheme } from "styled-components";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const { COLORS } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        contentStyle: { backgroundColor: COLORS.mainBg },
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: "회원가입",
          presentation: "modal",
          headerShown: true,
          headerLeft: HeaderLeftButton,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
