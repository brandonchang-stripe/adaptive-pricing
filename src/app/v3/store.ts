import { create } from "zustand";
import { ItemData, itemData } from "../components/itemData";
import { randiRange } from "../util/math";
import { playSound } from "../hooks/useAudio";
import { CountryData, countryData } from "../components/countryData";
import { Vector2, Props as GameTextProps } from "../components/GameText";
import { nanoid } from "nanoid";

type ActiveItem = {
  usdPrice: number;
  converted: boolean;
} & ItemData;

interface AppState {
  currentItem: ActiveItem | null;
  score: number;
  level: number;
  timeLimit: number;
  priceRange: number;
  sliderValue: number;
  combo: number;
  setSliderValue: (val: number) => void;
  chooseRandomItem: () => void;
  evaluate: () => void;

  converts: number;
  autoConvert: () => void;

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
  currentItem: null,
  score: 0,
  level: 1,
  timeLimit: 10,
  priceRange: 0.3,
  budgetRange: 0.4,
  sliderValue: 0,
  setSliderValue: (val: number) => {
    set({ sliderValue: val });
  },
  chooseRandomItem: () => {
    set((state) => {
      const item = itemData[randiRange(0, itemData.length - 1)];
      let usdPrice = randiRange(
        Math.ceil(item.usdPrice - item.usdPrice * state.priceRange),
        Math.floor(item.usdPrice + item.usdPrice * state.priceRange)
      );

      usdPrice = Math.min(usdPrice * 5.0, 500);

      return {
        currentItem: { ...item, usdPrice, converted: false },
      };
    });
  },
  evaluate: () => {
    const item = get().currentItem!;
    const distance =
      Math.abs(item.usdPrice - get().sliderValue) / item.usdPrice;

    if (distance < 0.02) {
      get().gainPoints(10);
      get().createGameText("PERFECT +10", get().positions["indicator"]);
    } else if (distance < 0.05) {
      get().createGameText("Nice +5", get().positions["indicator"]);
      get().gainPoints(6);
    } else if (distance < 0.1) {
      get().gainPoints(3);
      get().createGameText("Good +3", get().positions["indicator"]);
    } else {
      get().losePoints(0);
      get().createGameText("Miss", get().positions["indicator"]);
    }
  },

  converts: 0,
  autoConvert: async () => {
    const item = get().currentItem;
    const converts = get().converts;
    if (item && converts > 0) {
      set({
        currentItem: { ...item, converted: true },
        isTimerRunning: false,
        converts: converts - 1,
      });
      playSound("auto");

      await new Promise((r) => setTimeout(r, 800));

      playSound("correct", Math.min(get().combo * 0.1 + 0.8, 2.0));
      get().gainPoints(1);
      get().chooseRandomItem();
      get().startTimer();
    }
  },

  combo: 0,

  gainPoints: (points: number) => {
    // playSound("correct", get().combo * 0.1 - 0.2);
    set((state) => {
      const gainConvert = (state.combo + 1) % 5 === 0 && state.converts < 3;
      playSound("correct", Math.min(get().combo * 0.1 + 0.8, 2.0));
      if (gainConvert) {
        playSound("gain");
        get().createGameText("+1 ", get().positions["convert"]);
      }

      return {
        score: state.score + points,
        level: state.level + 1,
        combo: state.combo + 1,
        converts: gainConvert ? state.converts + 1 : state.converts,
      };
    });
    get().chooseRandomItem();
  },

  losePoints: (point: number) => {
    playSound("error");
    set((state) => ({
      level: state.level + 1,
      combo: 0,
    }));
    get().chooseRandomItem();
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
