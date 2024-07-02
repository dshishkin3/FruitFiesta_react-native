import React, { FC, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../navigation/AppNavigation";

import { Fruit } from "../constants/types";

interface FruitCardProps {
  fruit: Fruit;
}

const FruitCard: FC<FruitCardProps> = ({ fruit }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View
      style={{ width: 270, borderRadius: 40, backgroundColor: fruit.color(1) }}
      className="mx-5"
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Product", {
            ...fruit,
            color: fruit.color(1),
          })
        }
      >
        <View className="flex-row justify-end">
          <TouchableOpacity
            className="p-3 rounded-full mr-4 mt-4"
            style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
            onPress={() => setIsFavourite(!isFavourite)}
          >
            <HeartIcon size="25" color={isFavourite ? fruit.shadow : "white"} />
          </TouchableOpacity>
        </View>
        <View
          className="flex-row justify-center"
          style={{
            shadowColor: fruit.shadow,
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 50 },
            shadowOpacity: 0.6,
          }}
        >
          <Image source={fruit.image} style={{ width: 230, height: 200 }} />
        </View>
        <View className="ml-4 my-4">
          <Text className="font-bold text-xl text-white shadow">
            {fruit.name}
          </Text>
          <Text className="font-bold text-lg text-white shadow tracking-widest">
            $ {fruit.price}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FruitCard;
