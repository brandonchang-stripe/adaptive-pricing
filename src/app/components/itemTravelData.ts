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
};

export type TravelItemData = Partial<Record<CountryName, ItemData[]>>;

export const itemData: TravelItemData = {
  Japan: [
    {
      type: "Luggage tag",
      merchants: ["congo.com", "Well Traveled", "luggagetags.com"],
      baseUsdPrice: 1.0,
      priceIncrements: [0],
    },
    {
      type: "Plug adaptor",
      merchants: ["congo.com", "sockets.com", "Home Reserves"],
      baseUsdPrice: 10,
      priceIncrements: [5],
    },
    {
      type: "Plane ticket",
      merchants: [
        "Japan Airways",
        "Japan Aviation",
        "Sakura Skyways",
        "Edo Express",
      ],
      baseUsdPrice: 1000,
      priceIncrements: [100, 200],
    },
    {
      type: "Train ticket",
      merchants: [
        "Zen Express Pass",
        "Fuji Rail",
        "Sakura Rail",
        "Japan Commuter Pass",
      ],
      baseUsdPrice: 100,
      priceIncrements: [10, 0],
    },
    {
      type: "Visa",
      merchants: ["eVisa", "quickvisa.com"],
      baseUsdPrice: 10.0,
      priceIncrements: [2, 5],
    },
    {
      type: "Hotel",
      merchants: ["Sakura Inn", "Shogun Suites", "besthotels.com", "CapsuleCo"],
      baseUsdPrice: 100.0,
      priceIncrements: [25, 10],
    },
    {
      type: "Guidebook",
      merchants: [
        "Infinite Japan",
        "Discover Japan",
        "japanguidebooks.com",
        "Lovely Planet",
      ],
      baseUsdPrice: 20.0,
      priceIncrements: [5, 10],
    },
    {
      type: "Taxi",
      baseUsdPrice: 100.0,
      priceIncrements: [25, 10, 15, 5],
      merchants: ["Uber", "FAST", "getthere.com"],
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
