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

export type CountryData = {
  name: string;
  currencySymbol: string;
  conversionRateDefault: number;
  currentConversionRate: number;
  position: { x: number; y: number };
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
        type: "Plug adaptor",
        merchants: ["congo.com", "sockets.com", "Home Reserves"],
        baseUsdPrice: 10,
        priceIncrements: [5],
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
        type: "Train ticket",
        merchants: ["zen-expresspass.jp", "fujirail.jp", "sakurarail.com", "japan-commute.jp"],
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
      {
        type: "Taxi",
        baseUsdPrice: 100.0,
        priceIncrements: [25, 10, 15, 5],
        merchants: ["hitch-a-ride.com", "taxi.com", "online-taxi-pass.com"],
        quantity: "10x",
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
        type: "Luggage tag",
        merchants: ["congo.com", "well-traveled.com", "luggagetags.com"],
        baseUsdPrice: 10.0,
        priceIncrements: [2.0],
        quantity: "1x",
      },
      {
        type: "Plug adaptor",
        merchants: ["congo.com", "sockets.com", "Home Reserves"],
        baseUsdPrice: 8,
        priceIncrements: [2],
        quantity: "1x",
      },
      {
        type: "Plane ticket",
        merchants: ["aero-via.mx", "mexio-air.mx"],
        baseUsdPrice: 850,
        priceIncrements: [100, 50],
        quantity: "1x",
      },
      {
        type: "Visa",
        merchants: ["evisa.jp", "quickvisa.com"],
        baseUsdPrice: 14.0,
        priceIncrements: [1, 6],
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
        merchants: ["explore-mex.mx", "discovermx.com"],
        baseUsdPrice: 20.0,
        priceIncrements: [3, 5],
        quantity: "1x",
      },
      {
        type: "Taxi",
        baseUsdPrice: 65.0,
        priceIncrements: [25, 15, 5],
        merchants: ["hitch-a-ride.com", "taxi.com", "online-taxi-pass.com"],
        quantity: "8x",
      },
      {
        type: "Guided tour",
        baseUsdPrice: 65.0,
        priceIncrements: [25, 15, 5],
        merchants: ["hitch-a-ride.com", "taxi.com", "online-taxi-pass.com"],
        quantity: "8x",
      },
    ],
  },
  {
    name: "Thailand",
    currencySymbol: "฿",
    conversionRateDefault: 32.5,
    currentConversionRate: 32.5,
    position: { x: 310, y: 320 },
    items: [
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
        baseUsdPrice: 12,
        priceIncrements: [2],
        quantity: "1x",
      },
      {
        type: "Plane ticket",
        merchants: ["aero-via.mx", "mexio-air.mx"],
        baseUsdPrice: 850,
        priceIncrements: [25, 32, 19],
        quantity: "1x",
      },
      {
        type: "Visa",
        merchants: ["evisa.jp", "quickvisa.com"],
        baseUsdPrice: 9.0,
        priceIncrements: [1, 2],
        quantity: "1x",
      },
      {
        type: "Hotel",
        merchants: ["sakurainn.jp", "shogun-suites.jp", "besthotels.com", "capsule-co.jp"],
        baseUsdPrice: 65.0,
        priceIncrements: [12, 9, 4],
        quantity: "2 nights",
      },
      {
        type: "Guidebook",
        merchants: ["explore-mex.mx", "discovermx.com"],
        baseUsdPrice: 10.0,
        priceIncrements: [2, 3],
        quantity: "1x",
      },
      {
        type: "Taxi",
        baseUsdPrice: 32.0,
        priceIncrements: [1, 3, 5, 8],
        merchants: ["hitch-a-ride.com", "taxi.com", "online-taxi-pass.com"],
        quantity: "8x",
      },
      {
        type: "Guided tour",
        baseUsdPrice: 40.0,
        priceIncrements: [15, 4, 7],
        merchants: ["hitch-a-ride.com", "taxi.com", "online-taxi-pass.com"],
        quantity: "8x",
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
