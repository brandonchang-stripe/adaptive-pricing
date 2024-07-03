import { CountryName } from "./countryData";

export type ItemData = {
  name: string;
  country: CountryName;
  usdPrice: number;
  icon: string;
};

export const itemData: ItemData[] = [
  {
    name: "Tuna",
    country: "Japan",
    usdPrice: 50.0,
    icon: "",
  },
  {
    name: "Maple Syrup",
    country: "Canada",
    usdPrice: 5.0,
    icon: "",
  },
  {
    name: "Vegemite",
    country: "Australia",
    usdPrice: 23.0,
    icon: "",
  },
  {
    name: "Sichuan Pepper",
    country: "China",
    usdPrice: 12.0,
    icon: "",
  },
  {
    name: "Lingonberries",
    country: "Finland",
    usdPrice: 20.0,
    icon: "",
  },
  {
    name: "Sauerkraut",
    country: "Germany",
    usdPrice: 10.0,
    icon: "",
  },
  {
    name: "Paprika",
    country: "Hungary",
    usdPrice: 23.0,
    icon: "",
  },
  {
    name: "Lemongrass",
    country: "Thailand",
    usdPrice: 34.0,
    icon: "",
  },
];
