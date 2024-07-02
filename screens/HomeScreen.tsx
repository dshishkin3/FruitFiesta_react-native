import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Bars3CenterLeftIcon,
  ShoppingCartIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import FruitCard from "../components/FruitCard";
import FruitCardSales from "../components/FruitCardSales";
import { RootStackParamList } from "../navigation/AppNavigation";

import { categories, fruitsData } from "../constants";
import { Fruit } from "../constants/types";

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [selectedCategory, setSelectedCategory] = useState("Oranges");

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const fruitsToShow: Fruit[] = fruitsData.filter(
    (fruit) => fruit.category === selectedCategory
  );

  return (
    <SafeAreaView className="flex 1 bg-orange-50">
      <View className="mx-5 flex-row justify-between items-center">
        <Bars3CenterLeftIcon size="30" color="black" />
        <TouchableOpacity
          onPress={() => navigation.navigate("Cart")}
          className="p-2 rounded-xl bg-orange-100"
        >
          <ShoppingCartIcon size="25" color="orange" />
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        <Text className="text-2xl tracking-widest font-medium ml-5">
          Seasonal
        </Text>
        <Text className="text-3xl font-semibold ml-5">
          Fruit and Vegetables
        </Text>
        <ScrollView
          horizontal
          className="mt-8 px-5"
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((category: string) => {
            const isActive = category === selectedCategory;
            const textClass = `text-xl ${isActive ? "font-bold" : ""}`;
            return (
              <TouchableOpacity
                key={category}
                onPress={() => selectCategory(category)}
                className="mr-8 relative"
              >
                <Text className={textClass}>{category}</Text>
                {isActive && (
                  <Text className="font-extrabold text-orange-400 -mt-3 ml-2">
                    __ __
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View className="mt-8">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {fruitsToShow.map((fruit) => (
            <FruitCard fruit={fruit} key={fruit.id} />
          ))}
        </ScrollView>
      </View>

      <View className="mt-8 pl-5 pb-5 space-y-1">
        <Text className="text-xl font-bold">Hot Sales</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ overflow: "visible" }}
        >
          {[...fruitsData]
            .slice(5, 11)
            .reverse()
            .map((fruit) => (
              <FruitCardSales fruit={fruit} key={fruit.id} />
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
