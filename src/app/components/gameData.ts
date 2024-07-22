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
  icon: string;
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
        type: "Digital pet",
        merchants: ["tama-gotcha.jp", "pet-pet.jp"],
        baseUsdPrice: 10,
        priceIncrements: [2, 5],
        quantity: "1x",
        icon: "pet",
      },
      {
        type: "Tabi socks",
        merchants: ["kawaii-socks.com", "tabi-socks.jp"],
        baseUsdPrice: 20.0,
        priceIncrements: [5, 2],
        quantity: "4 pairs",
        icon: "socks",
      },
      {
        type: "Train pass",
        merchants: ["sakurarail.com", "fujirail.jp"],
        baseUsdPrice: 100.0,
        priceIncrements: [10, 5, 20],
        quantity: "1x pass",
        icon: "ticket",
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
        type: "Sunglasses",
        merchants: ["chido-gafas.com", "go-sunnies.mx"],
        baseUsdPrice: 20.0,
        priceIncrements: [3, 5],
        quantity: "1x",
        icon: "shades",
      },
      {
        type: "Plane ticket",
        merchants: ["aero-via.mx", "4242tix.mx"],
        baseUsdPrice: 1000,
        priceIncrements: [100, 50],
        quantity: "1x",
        icon: "ticket",
      },
      {
        type: "Surfboard",
        merchants: ["surf-mex.mx", "surfboards.mx"],
        baseUsdPrice: 620.0,
        priceIncrements: [120, 210],
        quantity: "1x",
        icon: "surfboard",
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
        type: "Soccer ball",
        merchants: ["amazonian-air.br", "flybrazil.br"],
        baseUsdPrice: 30,
        priceIncrements: [1, 3, 9],
        quantity: "1x",
        icon: "ball",
      },
      {
        type: "Swimsuit",
        merchants: ["bacana-bikinis.br", "swimbrazil.br"],
        baseUsdPrice: 57.0,
        priceIncrements: [3, 5, 10],
        quantity: "1 set",
        icon: "bikini",
      },
      {
        type: "Plane ticket",
        merchants: ["amazonian-air.com", "flybrazil.br"],
        baseUsdPrice: 930,
        priceIncrements: [100, 50],
        quantity: "1x",
        icon: "ticket",
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
        type: "Fanny pack",
        merchants: ["belt-bagz.nz", "fast-packs.nz"],
        baseUsdPrice: 32.0,
        priceIncrements: [3, 8],
        quantity: "1x",
        icon: "fanny-pack",
      },
      {
        type: "Hiking boots",
        baseUsdPrice: 100.0,
        priceIncrements: [5, 20],
        merchants: ["wop-wops-tennies.nz", "tramping-shoes.nz"],
        quantity: "1x pair",
        icon: "boots",
      },
      {
        type: "Swim suit",
        baseUsdPrice: 40.0,
        priceIncrements: [15, 4, 7],
        merchants: ["togs.nz", "sweet-as-swimmers.com"],
        quantity: "1x",
        icon: "swim-trunks",
      },
      {
        type: "Plane ticket",
        merchants: ["airkiwi.com", "nz-air.nz"],
        baseUsdPrice: 1210.0,
        priceIncrements: [5.0],
        quantity: "1x",
        icon: "ticket",
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
