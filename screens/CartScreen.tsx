import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";

import { RootStackParamList } from "../navigation/AppNavigation";
import FruitCardCart from "../components/FruitCardCart";

import { CartItem } from "../constants/types";

type CartState = {
  cartItems: CartItem[];
};

const CartScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [cartState, setCartState] = useState<CartState>({ cartItems: [] });
  const [totalPrice, setTotalPrice] = useState("");

  const getCart = async (setCartState: (cartState: CartState) => void) => {
    try {
      const cart = await AsyncStorage.getItem("cart");

      if (cart !== null) {
        const cartFruits: CartItem[] = JSON.parse(cart);
        setCartState({ cartItems: cartFruits });
        const total = cartFruits.reduce(
          (accumulator, item) => Number(accumulator) + Number(item.price),
          0
        );
        setTotalPrice(parseFloat(total.toFixed(2)));
      } else {
        setCartState({ cartItems: [] });
      }
    } catch (error) {
      console.error("Error retrieving cart data", error);
    }
  };

  const removeFromCart = async (fruitToRemove: CartItem) => {
    try {
      const cart = await AsyncStorage.getItem("cart");
      let cartFruits: CartItem[] = [];

      if (cart !== null) {
        cartFruits = JSON.parse(cart);
      }

      cartFruits = cartFruits.filter((fruit) => fruit.id !== fruitToRemove.id);

      await AsyncStorage.setItem("cart", JSON.stringify(cartFruits));
    } catch (error) {
      console.error("Error removing fruit from cart", error);
    } finally {
      getCart(setCartState);
    }
  };

  useEffect(() => {
    getCart(setCartState);
  }, []);

  return (
    <SafeAreaView className="flex-1 flex justify-between bg-orange-50">
      <View className="flex-row justify-start mx-5">
        <TouchableOpacity
          className="border border-gray-300 rounded-xl"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size="30" color="gray" />
        </TouchableOpacity>
      </View>
      <View className="flex-1">
        <View className="cart mx-1 flex-1">
          <Text className="text-2xl px-5 py-10">
            Your <Text className="font-bold">cart</Text>
          </Text>
          {cartState.cartItems.length === 0 ? (
            <View className="flex justify-center items-center mt-10">
              <Image
                source={require("../assets/images/emptyCart.png")}
                style={{ width: 300, height: 300 }}
              />
            </View>
          ) : (
            <ScrollView className="px-5">
              {cartState.cartItems.map((item, index) => (
                <FruitCardCart
                  fruit={item}
                  key={index}
                  removeFromCart={removeFromCart}
                />
              ))}
            </ScrollView>
          )}
          {cartState.cartItems.length !== 0 && (
            <View className="flex-row justify-end py-2 mr-7">
              <Text className="text-lg">
                Total price:
                <Text className="font-bold text-yellow-500"> {totalPrice}</Text>
              </Text>
            </View>
          )}
        </View>
        <View className="flex-row justify-between items-center mx-7">
          <TouchableOpacity
            style={{
              backgroundColor: "orange",
              opacity: cartState.cartItems.length === 0 ? 0.2 : 0.8,
              shadowColor: "orange",
              shadowRadius: 25,
              shadowOffset: { width: 0, height: 15 },
              shadowOpacity: 0.4,
            }}
            className="p-3 flex-1 rounded-xl"
            disabled={cartState.cartItems.length === 0}
            onPress={() => navigation.navigate("Order")}
          >
            <Text className="text-xl text-center text-white font-bold">
              Payment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
