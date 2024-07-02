import { CountryName } from "./countryData";

export type ItemData = {
  name: string;
  country: CountryName
  usdPrice: number;
  icon: string;
}

export const itemData: ItemData[] = [
  {
    name: 'Tuna',
    country: "Japan",
    usdPrice: 100.00,
    icon: ''
  },
  {
    name: "Maple Syrup",
    country: "Canada",
    usdPrice: 5.00,
    icon: ''
  },
  {
    name: "Vegemite",
    country: "Australia",
    usdPrice: 23.00,
    icon: ''
  },
  {
    name: "Sichuan Pepper",
    country: "China",
    usdPrice: 12.00,
    icon: ''
  },
  {
    name: "Lingonberries",
    country: "Finland",
    usdPrice: 20.00,
    icon: ''
  },
  {
    name: "Sauerkraut",
    country: "Germany",
    usdPrice: 10.00,
    icon: ''
  },
  {
    name: "Paprika",
    country: "Hungary",
    usdPrice: 23.00,
    icon: ''
  },
  {
    name : "Lemongrass",
    country: "Thailand",
    usdPrice: 34.00,
    icon: ''
  }
];