export type CountryData = {
  name: string;
  currencySymbol: string;
  conversionRateDefault: number;
  currentConversionRate: number;
  position: { x: number; y: number };
};

export const countryData = [
  {
    name: "United States",
    currencySymbol: "$",
    conversionRateDefault: 1,
    currentConversionRate: 1,
    position: { x: 10, y: 20 },
  },
  {
    name: "United Kingdom",
    currencySymbol: "£",
    conversionRateDefault: 0.72,
    currentConversionRate: 0.72,
    position: { x: 30, y: 40 },
  },
  {
    name: "Canada",
    currencySymbol: "$CAD",
    conversionRateDefault: 1.25,
    currentConversionRate: 1.25,
    position: { x: 50, y: 60 },
  },
  {
    name: "Australia",
    currencySymbol: "$AUD",
    conversionRateDefault: 1.29,
    currentConversionRate: 1.29,
    position: { x: 70, y: 80 },
  },
  {
    name: "Japan",
    currencySymbol: "¥",
    conversionRateDefault: 150,
    currentConversionRate: 150,
    position: { x: 90, y: 100 },
  },
  {
    name: "France",
    currencySymbol: "€",
    conversionRateDefault: 0.82,
    currentConversionRate: 0.82,
    position: { x: 110, y: 120 },
  },
  {
    name: "Germany",
    currencySymbol: "€",
    conversionRateDefault: 0.82,
    currentConversionRate: 0.82,
    position: { x: 130, y: 140 },
  },
  {
    name: "Italy",
    currencySymbol: "€",
    conversionRateDefault: 0.82,
    currentConversionRate: 0.82,
    position: { x: 150, y: 160 },
  },
  {
    name: "Spain",
    currencySymbol: "€",
    conversionRateDefault: 0.82,
    currentConversionRate: 0.82,
    position: { x: 170, y: 180 },
  },
  {
    name: "Finland",
    currencySymbol: "€",
    conversionRateDefault: 0.82,
    currentConversionRate: 0.82,
    position: { x: 170, y: 180 },
  },
  {
    name: "Brazil",
    currencySymbol: "R$",
    conversionRateDefault: 5.27,
    currentConversionRate: 5.27,
    position: { x: 190, y: 200 },
  },
  {
    name: "China",
    currencySymbol: "¥",
    conversionRateDefault: 6.46,
    currentConversionRate: 6.46,
    position: { x: 210, y: 220 },
  },
  {
    name: "India",
    currencySymbol: "₹",
    conversionRateDefault: 73,
    currentConversionRate: 73,
    position: { x: 230, y: 240 },
  },
  {
    name: "South Africa",
    currencySymbol: "R",
    conversionRateDefault: 14.5,
    currentConversionRate: 14.5,
    position: { x: 250, y: 260 },
  },
  {
    name: "South Korea",
    currencySymbol: "₩",
    conversionRateDefault: 1130.5,
    currentConversionRate: 1130.5,
    position: { x: 270, y: 280 },
  },
  {
    name: "Sweden",
    currencySymbol: "kr",
    conversionRateDefault: 8.33,
    currentConversionRate: 8.33,
    position: { x: 290, y: 300 },
  },
  {
    name: "Thailand",
    currencySymbol: "฿",
    conversionRateDefault: 32.5,
    currentConversionRate: 32.5,
    position: { x: 310, y: 320 },
  },
  {
    name: "Switzerland",
    currencySymbol: "CHF",
    conversionRateDefault: 0.92,
    currentConversionRate: 0.92,
    position: { x: 330, y: 340 },
  },
  {
    name: "Mexico",
    currencySymbol: "$MXN",
    conversionRateDefault: 20.13,
    currentConversionRate: 20.13,
    position: { x: 350, y: 360 },
  },
  {
    name: "Denmark",
    currencySymbol: "kr",
    conversionRateDefault: 6.29,
    currentConversionRate: 6.29,
    position: { x: 370, y: 380 },
  },
  {
    name: "Norway",
    currencySymbol: "kr",
    conversionRateDefault: 8.5,
    currentConversionRate: 8.5,
    position: { x: 390, y: 400 },
  },
  {
    name: "Poland",
    currencySymbol: "zł",
    conversionRateDefault: 3.88,
    currentConversionRate: 3.88,
    position: { x: 410, y: 420 },
  },
  {
    name: "Turkey",
    currencySymbol: "₺",
    conversionRateDefault: 8.5,
    currentConversionRate: 8.5,
    position: { x: 430, y: 440 },
  },

  {
    name: "Hungary",
    currencySymbol: "Ft",
    conversionRateDefault: 305.5,
    currentConversionRate: 305.5,
    position: { x: 450, y: 460 },
  },
  {
    name: "Czech Republic",
    currencySymbol: "Kč",
    conversionRateDefault: 21.5,
    currentConversionRate: 21.5,
    position: { x: 470, y: 480 },
  },
  {
    name: "Colombia",
    currencySymbol: "$COP",
    conversionRateDefault: 3780,
    currentConversionRate: 3780,
    position: { x: 490, y: 500 },
  },
  {
    name: "Taiwan",
    currencySymbol: "NT$",
    conversionRateDefault: 27.9,
    currentConversionRate: 27.9,
    position: { x: 510, y: 520 },
  },
] as const;

export type CountryName = (typeof countryData)[number]["name"];
