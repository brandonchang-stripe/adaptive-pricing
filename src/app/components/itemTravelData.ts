import { CountryName } from "./countryData";

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
  type: ItemType;
  merchants: string[];
  baseUsdPrice: number;
  priceIncrements: number[];
  quantity: string;
};

export type TravelItemData = Partial<Record<CountryName, ItemData[]>>;

export const itemData: TravelItemData = {
  Japan: [
    {
      type: "Luggage tag",
      merchants: ["congo.com", "well-traveled.com", "luggagetags.com"],
      baseUsdPrice: 10.0,
      priceIncrements: [1.0],
      quantity: "1x",
    },
    {
      type: "Plug adaptor",
      merchants: ["congo.com", "sockets.com", "Home Reserves"],
      baseUsdPrice: 10,
      priceIncrements: [5],
      quantity: "1x",
    },
    {
      type: "Plane ticket",
      merchants: [
        "japanairways.jp",
        "japan-aviation.jp",
        "sakura-skyways.jp",
        "edo-express.jp",
      ],
      baseUsdPrice: 1000,
      priceIncrements: [100, 200],
      quantity: "1x",
    },
    {
      type: "Train ticket",
      merchants: [
        "zen-expresspass.jp",
        "fujirail.jp",
        "sakurarail.com",
        "japan-commute.jp",
      ],
      baseUsdPrice: 100,
      priceIncrements: [10, 15],
      quantity: "1x",
    },
    {
      type: "Visa",
      merchants: ["evisa.jp", "quickvisa.com"],
      baseUsdPrice: 10.0,
      priceIncrements: [2, 5],
      quantity: "1x",
    },
    {
      type: "Hotel",
      merchants: [
        "sakurainn.jp",
        "shogun-suites.jp",
        "besthotels.com",
        "capsule-co.jp",
      ],
      baseUsdPrice: 100.0,
      priceIncrements: [25, 10],
      quantity: "3 nights",
    },
    {
      type: "Guidebook",
      merchants: [
        "infinitejapan.jp",
        "discoverjapan.com",
        "japanguidebooks.com",
        "lovely-planet.com",
      ],
      baseUsdPrice: 20.0,
      priceIncrements: [5, 10],
      quantity: "1x",
    },
    {
      type: "Taxi",
      baseUsdPrice: 100.0,
      priceIncrements: [25, 10, 15, 5],
      merchants: ["hitch-a-ride.com", "taxi.com", "online-taxi-pass.com"],
      quantity: "10x",
    },
  ],
};

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
