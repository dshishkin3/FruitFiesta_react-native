import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RootStackParamList } from "../navigation/AppNavigation";

const OrderScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const clearCart = async () => {
    await AsyncStorage.removeItem("cart");
  };

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Home");
      clearCart();
    }, 3000);
  }, []);

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Image
        source={require("../assets/images/delivery.gif")}
        className="h-80 w-80"
      />
    </View>
  );
};

export default OrderScreen;
