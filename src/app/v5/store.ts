import type { Vector2 } from "@/types/Vector2";
import { create } from "zustand";
import { nanoid } from "nanoid";
import { ItemType, itemData } from "../components/itemTravelData";
import { randiRange } from "../util/math";
import { playSound } from "../hooks/useAudio";
import {
  CountryData,
  CountryName,
  countryData,
} from "../components/countryData";
import { Props as GameTextProps } from "../components/GameText";

type GameState = "MAIN_MENU" | "IN_GAME" | "GAME_OVER";

export type ActiveItem = {
  type: ItemType;
  merchant: string;
  usdPrice: number;
  converted: boolean;
};

interface AppState {
  state: GameState;
  setState: (newState: GameState) => void;

  currentCountry: CountryName | null;
  setCurrentCountry: (countryName: CountryName) => void;
  currentItems: ActiveItem[];
  itemIndex: number;

  score: number;
  level: number;
  timeLimit: number;
  combo: number;
  chooseRandomMerchants: (itemIndex: number, count?: number) => void;
  evaluate: (merchant: string) => void;

  losePoints: (points: number) => void;
  gainPoints: (points: number) => void;
  // timer state
  timerDuration: number;
  isTimerRunning: boolean;
  startTimer: () => void;
  // game texts
  createGameText: (text: string, position: Vector2) => void;
  popGameText: (id: string) => void;
  gameTexts: GameTextProps[];
  // positions
  positions: Record<string, Vector2>;
  setPosition: (id: string, position: Vector2) => void;
  getPosition: (id: string) => Vector2;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Game state machine
  state: "MAIN_MENU",
  setState: (newState: GameState) => {
    set({ state: newState });
  },

  // Country state
  currentCountry: null,

  setCurrentCountry: (countryName: CountryName) => {
    switch (get().state) {
      case "MAIN_MENU":
      case "ITEM_LIST":
        set({
          currentCountry: countryName,
          state: "ITEM_LIST",
          itemIndex: 0,
        });

        get().chooseRandomMerchants(0);
        break;
    }
  },

  // Game meta state
  score: 0,
  level: 1,
  combo: 0,
  timeLimit: 10,

  // Item State
  currentItems: [],
  itemIndex: 0,
  chooseRandomMerchants: (itemIndex, count = 2) => {
    const country = get().currentCountry;
    if (!country) return;
    const itemCountry = itemData[country];
    if (!itemCountry) return;
    const currentItemData = itemCountry[itemIndex];

    const items: ActiveItem[] = [];

    // Pick count random merchants
    const usedIndexes = new Set<number>();
    let merchantIndex = randiRange(0, currentItemData.merchants.length - 1);
    for (let i = 0; i < count; i++) {
      // Don't re-use merchants
      while (usedIndexes.has(merchantIndex)) {
        merchantIndex = randiRange(0, currentItemData.merchants.length - 1);
      }

      const merchant = currentItemData.merchants[merchantIndex];
      const converted = i === 1;

      let price = currentItemData.baseUsdPrice;

      // Only change the price of the conversion item
      if (converted) {
        // Pick an increment at random
        const increment =
          currentItemData.priceIncrements[
            randiRange(0, currentItemData.priceIncrements.length - 1)
          ];
        // 50/50 chance the increment subtracts instead of adds
        const negative = Math.round(Math.random()) * 2 - 1;

        price += increment * negative;
      }

      items.push({
        merchant,
        converted,
        type: currentItemData.type,
        usdPrice: price,
      });

      usedIndexes.add(merchantIndex);
    }

    set({ currentItems: items });
  },

  evaluate: (merchant) => {
    const items = get().currentItems;
    const item = items.find((i) => i.merchant === merchant);
    if (!item) return;

    const lowest = items
      .map((i) => i.usdPrice)
      .reduce((a, b) => Math.min(a, b));

    if (item.usdPrice === lowest) {
      get().gainPoints(1);
    } else {
      get().losePoints(1);
    }

    const nextItemIndex = get().itemIndex + 1;
    set({ itemIndex: nextItemIndex });
    get().chooseRandomMerchants(nextItemIndex);
  },

  gainPoints: (points: number) => {
    set((state) => {
      playSound("correct", Math.min(get().combo * 0.1 + 0.8, 2.0));

      return {
        score: state.score + points,
        level: state.level + 1,
        combo: state.combo + 1,
      };
    });
  },

  losePoints: (point: number) => {
    playSound("error");
    set((state) => ({
      level: state.level + 1,
      combo: 0,
    }));
  },

  timerDuration: 0,
  isTimerRunning: false,

  startTimer: () => {
    const duration = Math.max(20000 - get().combo * 2000, 4000);
    set({ isTimerRunning: false, timerDuration: 0 });
    setTimeout(() => {
      set({ isTimerRunning: true, timerDuration: duration });
    }, 1);
  },

  createGameText: (text: string, position: Vector2) => {
    const texts = get().gameTexts;
    const newText = { text, position, id: nanoid() };
    set({
      gameTexts: [...texts, newText],
    });
  },

  popGameText: (id: string) => {
    const texts = get().gameTexts;
    const index = texts.findIndex((t) => t.id === id);
    set({
      gameTexts: [...texts.slice(0, index), ...texts.slice(index + 1)],
    });
  },

  gameTexts: [],

  positions: {},
  setPosition: (id: string, position: Vector2) => {
    set({ positions: { ...get().positions, [id]: position } });
  },
  getPosition: (id: string) => {
    return get().positions[id];
  },
}));

export function useCurrentCountry(): CountryData {
  const country = useAppStore((state) => state.currentCountry);
  return countryData.find((c) => c.name === country)!;
}
