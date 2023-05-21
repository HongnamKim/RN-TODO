import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "../screens/SignInScreen";
import { WHITE } from "../colors";
import SignUpScreen from "../screens/SignUpScreen";

import HeaderLeftButton from "../components/HeaderLeftButton";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
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
