import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListScreen from "../screens/ListScreen";
import CartScreen from "../screens/CartScreen";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "styled-components";

const Tab = createBottomTabNavigator();

const ListsTab = () => {
  const { COLORS } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.PRIMARY.DEFAULT,
        tabBarInactiveTintColor: COLORS.GRAY.DEFAULT,
        tabBarStyle: {
          backgroundColor: COLORS.mainBg,
        },
        tabBarLabelStyle: {
          fontSize: 15,
        },
      }}
      sceneContainerStyle={{ backgroundColor: COLORS.mainBg }}
    >
      <Tab.Screen
        name="To Do"
        component={ListScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "folder-open" : "folder-open-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "ios-cart" : "ios-cart-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ListsTab;
