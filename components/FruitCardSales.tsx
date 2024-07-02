import React, { FC } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../navigation/AppNavigation";

import { Fruit } from "../constants/types";

interface FruitCardProps {
  fruit: Fruit;
}

const FruitCardSales: FC<FruitCardProps> = ({ fruit }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View className="mr-6">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Product", {
            ...fruit,
            color: fruit.color(1),
          })
        }
        className="flex-row justify-center -mb-9 shadow-lg z-20"
      >
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
      </TouchableOpacity>
      <View
        style={{ backgroundColor: fruit.color(0.4), height: 75, width: 80 }}
        className="rounded-3xl flex justify-end items-center"
      >
        <Text className="font-semibold text-center text-gray-800 pb-3 tracking-widest">
          $ {fruit.price}
        </Text>
      </View>
    </View>
  );
};

export default FruitCardSales;
