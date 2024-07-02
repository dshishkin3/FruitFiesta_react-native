import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import StarRating from "react-native-star-rating";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RootStackParamList } from "../navigation/AppNavigation";

import { Fruit } from "../constants/types";

const ProductScreen = (props: any) => {
  const fruit: Fruit = props.route.params;

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const addToCart = async (fruit: Fruit) => {
    try {
      const cart = await AsyncStorage.getItem("cart");
      let cartFruits: Fruit[] = [];

      if (cart !== null) {
        cartFruits = JSON.parse(cart);
      }

      cartFruits.push(fruit);

      await AsyncStorage.setItem("cart", JSON.stringify(cartFruits));
    } catch (error) {
      console.error("Error adding fruit to cart", error);
    } finally {
      navigation.navigate("Cart");
    }
  };

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: fruit.color.toString() }}
    >
      <SafeAreaView>
        <View className="flex-row justify-start mx-5">
          <TouchableOpacity
            className="border border-gray-50 rounded-xl"
            style={{ backgroundColor: "rgba(255,255,255,0.2" }}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size="30" color="white" />
          </TouchableOpacity>
        </View>
        <View
          className="flex-row justify-center mt-5 pb-10"
          style={{
            shadowColor: fruit.shadow,
            shadowRadius: 50,
            shadowOffset: { width: 0, height: 50 },
            shadowOpacity: 0.7,
          }}
        >
          <Image source={fruit.image} style={{ width: 310, height: 290 }} />
        </View>
      </SafeAreaView>
      <View
        className="bg-orange-50 flex-1 px-6 space-y-2"
        style={{
          borderTopLeftRadius: 45,
          borderTopRightRadius: 45,
        }}
      >
        <Text className="mt-8 text-2xl font-bold">{fruit.name}</Text>
        <View className="flex-row justify-between mb-3">
          <Text className="text-gray-500 font-semibold">{fruit.desc}</Text>
          <Text className="text-gray-800 font-extrabold">Sold 239</Text>
        </View>
        <StarRating
          disabled
          starSize={18}
          containerStyle={{ width: 120 }}
          maxStars={5}
          rating={fruit.stars}
          emptyStarColor="lightgray"
          fullStar={require("../assets/images/fullStar.png")}
        />
        <View style={{ height: 165 }}>
          <Text className="tracking-widest py-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-3xl">$ {fruit.price}</Text>
          <TouchableOpacity
            className="text-3xl p-3 ml-6 flex-1 rounded-xl"
            style={{
              backgroundColor: fruit.shadow,
              opacity: 0.6,
              shadowColor: fruit.shadow,
              shadowRadius: 25,
              shadowOffset: { width: 0, height: 15 },
              shadowOpacity: 0.5,
            }}
            onPress={() => addToCart(fruit)}
          >
            <Text className="text-xl text-center text-white font-bold">
              Add To Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductScreen;
