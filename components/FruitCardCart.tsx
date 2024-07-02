import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { FC } from "react";
import { TrashIcon } from "react-native-heroicons/solid";

import { CartItem } from "../constants/types";

interface FruitCardCartProps {
  fruit: CartItem;
  removeFromCart: (fruitToRemove: CartItem) => void;
}

const FruitCardCart: FC<FruitCardCartProps> = ({ fruit, removeFromCart }) => {
  return (
    <View className="flex-row justify-between items-center space-x-5 mb-5">
      <View className="ml-5">
        <View className="flex-row justify-center -mb-14 -ml-8 shadow-lg z-20">
          <Image
            source={fruit.image}
            style={{
              height: 65,
              width: 65,
              shadowColor: fruit.shadow,
              overflow: "visible",
              shadowRadius: 15,
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.4,
            }}
          />
        </View>

        <View
          style={{ backgroundColor: fruit.color, height: 60, width: 60 }}
          className="rounded-3xl flex justify-end items-center"
        ></View>
      </View>
      <View className="flex-1 space-y-1">
        <Text className="text-base font-bold">{fruit.name}</Text>
        <Text className="text-yellow-500 font-extrabold">$ {fruit.price}</Text>
      </View>
      <View className="flex-row items-center space-x-2">
        <TouchableOpacity
          onPress={() => removeFromCart(fruit)}
          className="bg-gray-200 p-1 rounded-lg"
        >
          <TrashIcon size="20" color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FruitCardCart;
