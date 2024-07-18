import { Vector2 } from "@/types/Vector2";

export type ItemType =
  | "Luggage tag"
  | "Plug adaptor"
  | "Plane ticket"
  | "Train ticket"
  | "Visa"
  | "Hotel"
  | "Vacation rental"
  | "Guidebook"
  | "Gifts"
  | "Guided tour"
  | "Taxi";

export type ItemData = {
  type: string;
  merchants: string[];
  baseUsdPrice: number;
  priceIncrements: number[];
  quantity: string;
};

export type CountryData = {
  name: string;
  currencySymbol: string;
  conversionRateDefault: number;
  currentConversionRate: number;
  position: Vector2;
  items: ItemData[];
};

export const countryData: CountryData[] = [
  {
    name: "Japan",
    currencySymbol: "¥",
    conversionRateDefault: 161,
    currentConversionRate: 161,
    position: { x: 90, y: 100 },
    items: [
      {
        type: "Luggage tag",
        merchants: ["congo.com", "well-traveled.com", "luggagetags.com"],
        baseUsdPrice: 10.0,
        priceIncrements: [1.0],
        quantity: "1x",
      },
      {
        type: "Plane ticket",
        merchants: ["japanairways.jp", "japan-aviation.jp", "sakura-skyways.jp", "edo-express.jp"],
        baseUsdPrice: 1000,
        priceIncrements: [100, 200],
        quantity: "1x",
      },
      {
        type: "Hotel",
        merchants: ["sakurainn.jp", "shogun-suites.jp", "besthotels.com", "capsule-co.jp"],
        baseUsdPrice: 100.0,
        priceIncrements: [25, 10],
        quantity: "3 nights",
      },
      {
        type: "Guidebook",
        merchants: ["infinitejapan.jp", "discoverjapan.com", "japanguidebooks.com", "lovely-planet.com"],
        baseUsdPrice: 20.0,
        priceIncrements: [5, 10],
        quantity: "1x",
      },
    ],
  },
  {
    name: "Mexico",
    currencySymbol: "$MXN",
    conversionRateDefault: 20.13,
    currentConversionRate: 20.13,
    position: { x: 350, y: 360 },
    items: [
      {
        type: "Plane ticket",
        merchants: ["aero-via.mx", "mexio-air.mx"],
        baseUsdPrice: 850,
        priceIncrements: [100, 50],
        quantity: "1x",
      },
      {
        type: "Hotel",
        merchants: ["sakurainn.jp", "shogun-suites.jp", "besthotels.com", "capsule-co.jp"],
        baseUsdPrice: 110.0,
        priceIncrements: [15, 10],
        quantity: "2 nights",
      },
      {
        type: "Guidebook",
        merchants: ["explore-mex.mx", "press.stripe.com"],
        baseUsdPrice: 15.0,
        priceIncrements: [3, 5],
        quantity: "1x",
      },
      {
        type: "Sunglasses",
        merchants: ["cool-shades.mx", "go-sunnies.mx"],
        baseUsdPrice: 20.0,
        priceIncrements: [3, 5],
        quantity: "1x",
      },
    ],
  },
  {
    name: "Brazil",
    currencySymbol: "R$",
    conversionRateDefault: 5.43,
    currentConversionRate: 5.43,
    position: { x: 350, y: 360 },
    items: [
      {
        type: "Plane ticket",
        merchants: ["amazonian-air.br", "flybrazil.br"],
        baseUsdPrice: 920,
        priceIncrements: [30, 50, 25],
        quantity: "1x",
      },
      {
        type: "Hotel",
        merchants: ["rio-resorts.br", "copacabanabayresort.br"],
        baseUsdPrice: 200.0,
        priceIncrements: [15, 10, 50],
        quantity: "4 nights",
      },
      {
        type: "Guidebook",
        merchants: ["explore-brasil.br", "press.stripe.com"],
        baseUsdPrice: 15.0,
        priceIncrements: [4, 5],
        quantity: "1x",
      },
      {
        type: "Swimsuit",
        merchants: ["cool-shades.mx", "go-sunnies.mx"],
        baseUsdPrice: 20.0,
        priceIncrements: [3, 5],
        quantity: "1x",
      },
    ],
  },
  {
    name: "New Zealand",
    currencySymbol: "NZ$",
    conversionRateDefault: 1.65,
    currentConversionRate: 1.65,
    position: { x: 310, y: 320 },
    items: [
      {
        type: "Plane ticket",
        merchants: ["airkiwi.com", "nz-air.nz"],
        baseUsdPrice: 1210.0,
        priceIncrements: [5.0],
        quantity: "1x",
      },
      {
        type: "Hotel",
        merchants: ["queenstown-lodge.nz", "alpine-chalet.nz"],
        baseUsdPrice: 182.0,
        priceIncrements: [20, 13, 4],
        quantity: "3 nights",
      },
      {
        type: "Excursion",
        merchants: ["serenityspa.nz", "bunjeejump.com"],
        baseUsdPrice: 92.0,
        priceIncrements: [2, 3],
        quantity: "1x",
      },
      {
        type: "Hiking boots",
        baseUsdPrice: 100.0,
        priceIncrements: [5, 20],
        merchants: ["outdoorapparel.nz", "woodland.nz"],
        quantity: "1x",
      },
      {
        type: "Backpack",
        baseUsdPrice: 130.0,
        priceIncrements: [15, 4, 7],
        merchants: ["outdoorapparel.nz", "woodland.nz"],
        quantity: "1x",
      },
    ],
  },
];

export type CountryName = (typeof countryData)[number]["name"];

export const emailSubjects = [
  "Thank you!",
  "Your order confirmation",
  "Your purchase details",
  "Order confirmed!",
  "Your receipt",
  "Order summary",
  "Thanks for shopping!",
  "Order details",
  "Your order is confirmed",
  "Order receipt",
  "Purchase confirmation",
  "Order received",
  "Order confirmation",
];
