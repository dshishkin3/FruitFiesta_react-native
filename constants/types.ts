import { ImageSourcePropType } from "react-native";

export type Fruit = {
  id: number;
  name: string;
  category: string;
  price: string;
  stars: number;
  desc: string;
  shadow: string;
  image: ImageSourcePropType;
  color: (opacity: number) => string;
};

export type CartItem = {
  id: number;
  name: string;
  price: string;
  desc: string;
  shadow: string;
  image: ImageSourcePropType;
  color: (opacity: number) => string;
  qty: number;
};
