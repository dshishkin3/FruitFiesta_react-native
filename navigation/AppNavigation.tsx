import React, { lazy } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { LogBox } from "react-native";
import WelcomeScreen from "../screens/WelcomeScreen";

const CartScreen = lazy(() => import("../screens/CartScreen"));
const OrderScreen = lazy(() => import("../screens/OrderScreen"));
const ProductScreen = lazy(() => import("../screens/ProductScreen"));

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  "ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes, migrate to the 'deprecated-react-native-prop-types' package.",
]);

export type RootStackParamList = {
  Home: undefined;
  Product: { color: string };
  Cart: undefined;
  Order: undefined;
};

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          options={{ headerShown: false }}
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Product"
          options={{ headerShown: false }}
          component={ProductScreen}
        />
        <Stack.Screen
          name="Cart"
          options={{ headerShown: false }}
          component={CartScreen}
        />
        <Stack.Screen
          name="Order"
          options={{ headerShown: false }}
          component={OrderScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
