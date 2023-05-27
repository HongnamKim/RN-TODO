import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListScreen from "../screens/ListScreen";
import CartScreen from "../screens/CartScreen";
import { Ionicons } from "@expo/vector-icons";
import { GRAY, PRIMARY, WHITE } from "../colors";

const Tab = createBottomTabNavigator();

const ListsTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY.DEFAULT,
        tabBarInactiveTintColor: GRAY.DEFAULT,
        tabBarLabelStyle: {
          fontSize: 15,
        },
      }}
      sceneContainerStyle={{ backgroundColor: WHITE }}
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
