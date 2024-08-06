import { ActiveItem } from "../store";

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
  code: string;
  currencySymbol: string;
  currencyCode: string;
  conversionRateDefault: number;
  items: ItemData[];
};

export const tutorialItems: ActiveItem[] = [
  {
    type: "Digital pet",
    merchant: "tama-gotcha.jp",
    converted: false,
    usdPrice: 12,
    icon: "pet",
  },
  {
    type: "Digital pet",
    merchant: "pet-pet.jp",
    converted: true,
    usdPrice: 10,
    icon: "pet",
  },
];

export const subCountryData: CountryData = {
  name: "United Arab Emirates",
  code: "AE",
  currencySymbol: "DH",
  currencyCode: "aed",
  conversionRateDefault: 0.027,
  items: [
    {
      type: "Guidebook",
      merchants: ["EmiratesExplorer.ae", "lovely-planet.ae"],
      baseUsdPrice: 25,
      priceIncrements: [2, 5],
      quantity: "1x",
      icon: "book",
    },
    {
      type: "Train ticket",
      merchants: ["DesertRailJourneys.ae", "4242tickets.com"],
      baseUsdPrice: 90.0,
      priceIncrements: [10, 5, 20],
      quantity: "1x pass",
      icon: "ticket",
    },
  ],
};

export const countryData: CountryData[] = [
  {
    name: "Japan",
    code: "JP",
    currencySymbol: "¥",
    currencyCode: "jpy",
    conversionRateDefault: 0.00643388,
    items: [
      {
        type: "Karaoke Microphone",
        merchants: ["mic-drop.jp", "sing-big.jp"],
        baseUsdPrice: 15,
        priceIncrements: [2, 5],
        quantity: "1x",
        icon: "microphone",
      },
      // {
      //   type: "Tabi socks",
      //   merchants: ["kawaii-socks.com", "tabi-socks.jp"],
      //   baseUsdPrice: 20.0,
      //   priceIncrements: [5, 2],
      //   quantity: "4 pairs",
      //   icon: "socks",
      // },
      {
        type: "Train pass",
        merchants: ["sakurarail.com", "fujirail.jp"],
        baseUsdPrice: 90.0,
        priceIncrements: [10, 5],
        quantity: "1x pass",
        icon: "ticket",
      },
    ],
  },
  {
    name: "Brazil",
    code: "BR",
    currencySymbol: "R$",
    currencyCode: "brl",
    conversionRateDefault: 0.175098,
    items: [
      {
        type: "Futbol",
        merchants: ["amazonian-air.br", "flybrazil.br"],
        baseUsdPrice: 30,
        priceIncrements: [1, 3, 9],
        quantity: "1x",
        icon: "ball",
      },
      // {
      //   type: "Guidebook",
      //   merchants: ["discoverbrazil.br", "brazilguide.br"],
      //   baseUsdPrice: 20,
      //   priceIncrements: [8, 5],
      //   quantity: "1x",
      //   icon: "book",
      // },
      {
        type: "Swimsuit",
        merchants: ["bacana-bikinis.br", "swimbrazil.br"],
        baseUsdPrice: 57.0,
        priceIncrements: [3, 5, 10],
        quantity: "1 set",
        icon: "bikini",
      },
    ],
  },
  {
    name: "Mexico",
    code: "MX",
    currencyCode: "mxn",
    currencySymbol: "$MX",
    conversionRateDefault: 0.0538664,
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
    name: "New Zealand",
    code: "NZ",
    currencySymbol: "NZ$",
    currencyCode: "nzd",
    conversionRateDefault: 0.586931,
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
        type: "Suitcase",
        merchants: ["belt-bagz.nz", "fast-packs.nz"],
        baseUsdPrice: 80.0,
        priceIncrements: [10, 5],
        quantity: "1x",
        icon: "suitcase",
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
      // {
      //   type: "Plane ticket",
      //   merchants: ["airkiwi.com", "nz-air.nz"],
      //   baseUsdPrice: 1210.0,
      //   priceIncrements: [5.0],
      //   quantity: "1x",
      //   icon: "ticket",
      // },
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
