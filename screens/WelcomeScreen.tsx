import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../navigation/AppNavigation";

const WelcomeScreen = () => {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const welcomeImage = require("../assets/images/welcome.png");

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;

    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      100
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
      300
    );

    setTimeout(() => navigation.navigate("Home"), 2000);
  }, []);

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-400">
      <StatusBar style="light" />
      <Animated.View
        className="bg-white/20 rounded-full"
        style={{ padding: ring2padding }}
      >
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{ padding: ring1padding }}
        >
          <Image
            source={welcomeImage}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>
      <View className="flex items-center space-y-2">
        <Text
          className="font-bold text-white tracking-widest"
          style={{ fontSize: hp(5) }}
        >
          FruitFiesta
        </Text>
        <Text
          className="font-medium text-white tracking-widest"
          style={{ fontSize: hp(2) }}
        >
          Savor Natures Sweetness Instantly!
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
