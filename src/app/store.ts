import { create } from "zustand";
import { countryData, type CountryData } from "./components/countryData";
import { itemData, ItemData } from "./components/itemData";
import { randiRange, relativeRound } from "./util/math";
import { soundBoard } from "./hooks/useAudio";

type ActiveItem = {
  localPrice: number;
  usdPrice: number;
  budget: number;
} & ItemData;

type Choice = "buy" | "skip";

interface AppState {
  currentItem: ActiveItem | null;
  score: number;
  itemCount: number;
  timeLimit: number;
  priceRange: number;
  budgetRange: number;
  chooseRandomItem: () => void;
  evaluate: (choice: Choice) => void;
  losePoint: () => void;
  gainPoint: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentItem: null,
  score: 0,
  itemCount: 1,
  timeLimit: 10,
  priceRange: 0.3,
  budgetRange: 0.4,
  chooseRandomItem: () => {
    set((state) => {
      const item = itemData[randiRange(0, itemData.length - 1)];
      const country = getItemCountry(item)!;
      const usdPrice = randiRange(
        item.usdPrice - item.usdPrice * state.priceRange,
        item.usdPrice + item.usdPrice * state.priceRange
      );
      let localPrice = relativeRound(country.conversionRateDefault * usdPrice);

      const budget = randiRange(
        Math.floor(item.usdPrice - item.usdPrice * state.budgetRange),
        Math.floor(item.usdPrice + item.usdPrice * state.budgetRange)
      );

      return {
        currentItem: { ...item, localPrice, budget },
      };
    });
  },
  evaluate: (choice: Choice) => {
    const item = get().currentItem!;
    let points = 0;
    if (choice == "buy") {
      points = item.budget >= item.usdPrice ? 1 : 0;
    } else {
      points = item.budget < item.usdPrice ? 1 : 0;
    }

    if (points > 0) {
      get().gainPoint();
    } else {
      get().losePoint();
    }
  },

  gainPoint: () => {
    soundBoard.correct.play();
    set((state) => ({
      score: state.score + 1,
      itemCount: state.itemCount + 1,
    }));
    get().chooseRandomItem();
  },

  losePoint: () => {
    soundBoard.error.play();
    set((state) => ({ itemCount: state.itemCount + 1 }));
    get().chooseRandomItem();
  },
}));

export function useCurrentCountry(): CountryData | null {
  return useAppStore((state) => {
    const item = state.currentItem;
    if (!item) return null;
    return getItemCountry(item);
  });
}

function getItemCountry(item: ItemData): CountryData | null {
  return countryData.find((country) => country.name == item.country) || null;
}
