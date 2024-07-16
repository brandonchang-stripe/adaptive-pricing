import type { Vector2 } from "@/types/Vector2";
import { create } from "zustand";
import { nanoid } from "nanoid";
import { CountryData, ItemType, emailSubjects, countryData } from "./components/gameData";
import { randiRange } from "./util/math";
import { playSound } from "./hooks/useAudio";
import { Props as GameTextProps } from "./components/GameText";

type GameState =
  | "SPLASH"
  | "BOOT"
  | "MAIN_MENU"
  | "TUTORIAL"
  | "GAME_START"
  | "GAME_PLAY"
  | "ROUND_FINISH"
  | "GAME_FINISH"
  | "SCORE_SCREEN";

export type PurchasedItem = {
  score: number;
  title: string;
  saved: number;
} & ActiveItem;

export type ActiveItem = {
  type: ItemType;
  merchant: string;
  usdPrice: number;
  converted: boolean;
};

interface AppState {
  state: GameState;
  transitionState: (newState: GameState) => void;

  countryIndex: number;
  nextCountry: () => void;

  currentItems: ActiveItem[];
  itemIndex: number;
  purchasedItems: PurchasedItem[];
  purchaseItem: (item: ActiveItem, score: number, saved: number) => void;

  tutorialStep: number;
  nextTutorialStep: () => void;
  endTutorial: () => void;

  score: number;
  level: number;
  combo: number;
  startGame: () => void;
  initGame: () => void;
  chooseRandomMerchants: (itemIndex: number, count?: number) => void;
  evaluate: (merchant: string | boolean) => void;
  skipItem: () => void;

  losePoints: (points: number) => void;
  gainPoints: (points: number) => void;
  // timer state
  timerDuration: number;
  isTimerRunning: boolean;
  initTimerDuration: () => void;
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
  transitionState: async (newState: GameState) => {
    const currentState = get().state;
    switch (currentState) {
      case "MAIN_MENU":
        switch (newState) {
          case "TUTORIAL":
            get().initGame();
            set({ state: "TUTORIAL" });
            break;

          // Right now, only transition to game paused state
          case "GAME_PLAY":
            get().initGame();
            get().startGame();
            set({ state: "GAME_PLAY" });
            break;

          default:
            console.error(`Invalid state transition from ${currentState} to ${newState}`);
        }
        break;

      case "TUTORIAL":
        switch (newState) {
          case "GAME_PLAY":
            get().startGame();
            set({ state: "GAME_PLAY", tutorialStep: -1 });
            break;
        }
        break;

      case "GAME_PLAY":
        switch (newState) {
          case "TUTORIAL":
            set({ state: "TUTORIAL", isTimerRunning: false });
            break;

          case "GAME_FINISH":
            set({ state: "GAME_FINISH", isTimerRunning: false });

            await new Promise((r) => setTimeout(r, 2000));
            get().transitionState("SCORE_SCREEN");
            break;

          default:
            console.error(`Invalid state transition from ${currentState} to ${newState}`);
        }
        break;

      case "GAME_FINISH":
        switch (newState) {
          case "SCORE_SCREEN":
            set({ state: newState });
            break;

          default:
            console.error(`Invalid state transition from ${currentState} to ${newState}`);
        }
        break;

      case "SCORE_SCREEN":
        switch (newState) {
          case "MAIN_MENU":
            set({ state: newState });
            break;

          default:
            console.error(`Invalid state transition from ${currentState} to ${newState}`);
        }
        break;
    }
  },

  initGame: async () => {
    get().chooseRandomMerchants(0);
    get().initTimerDuration();
    set({ purchasedItems: [], itemIndex: 0 });
  },

  startGame: async () => {
    await new Promise((r) => setTimeout(r, 1000));
    set({ isTimerRunning: true });
  },

  // Country state
  countryIndex: 0,
  nextCountry: () => {
    get().transitionState("MAIN_MENU");
    set((state) => {
      const nextIndex = state.countryIndex + 1;
      if (nextIndex >= countryData.length) {
        return state;
      }
      return { countryIndex: nextIndex };
    });
  },

  // Tutorial state
  tutorialStep: 0, // -1 for no tutorial
  nextTutorialStep: () => {
    set((state) => {
      if (state.tutorialStep === -1) return state;
      return { tutorialStep: state.tutorialStep + 1 };
    });
  },
  endTutorial: () => {
    set({ tutorialStep: -1 });
  },

  // Game meta state
  score: 0,
  level: 1,
  combo: 0,

  // Item State
  currentItems: [],
  itemIndex: 0,
  chooseRandomMerchants: (itemIndex, count = 2) => {
    const country = countryData[get().countryIndex];
    const currentItemData = country.items[itemIndex];
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
        const increment = currentItemData.priceIncrements[randiRange(0, currentItemData.priceIncrements.length - 1)];
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

  purchasedItems: [],

  purchaseItem(item: ActiveItem, score: number, saved: number) {
    set({
      purchasedItems: [
        ...get().purchasedItems,
        {
          ...item,
          score,
          saved,
          title: emailSubjects[randiRange(0, emailSubjects.length - 1)],
        },
      ],
    });
  },

  evaluate: async (merchant: string | boolean = false) => {
    if (get().state !== "GAME_PLAY") return;

    // Evaluate a selection by the merchant name
    if (typeof merchant === "string") {
      const currentItems = get().currentItems;
      const item = currentItems.find((i) => i.merchant === merchant);
      if (!item) return;

      const lowest = currentItems.map((i) => i.usdPrice).reduce((a, b) => Math.min(a, b));

      const highest = currentItems.map((i) => i.usdPrice).reduce((a, b) => Math.max(a, b));

      if (item.usdPrice === lowest) {
        get().gainPoints(1);
        get().purchaseItem(item, 1, highest - item.usdPrice);
      } else {
        get().losePoints(1);
        get().purchaseItem(item, -1, 0);
      }
    } else {
      // If the merchant is a boolean, the game has forced a decision,
      // either by timeout or some other means
      if (merchant) {
        get().gainPoints(1);
      } else {
        get().losePoints(1);
      }
    }

    const allItems = countryData[get().countryIndex].items;
    const itemIndex = get().itemIndex;
    if (itemIndex < allItems.length - 1) {
      const nextItemIndex = itemIndex + 1;
      set({ itemIndex: nextItemIndex, isTimerRunning: false });
      get().chooseRandomMerchants(nextItemIndex);

      await new Promise((r) => setTimeout(r, 1000));
      get().initTimerDuration();
      set({ isTimerRunning: true });
    } else {
      set({ itemIndex: itemIndex + 1, isTimerRunning: false });
      get().transitionState("GAME_FINISH");
    }
  },
  skipItem: () => {
    set((state) => ({
      itemIndex: state.itemIndex + 1,
    }));
  },

  gainPoints: (points: number) => {
    set((state) => {
      playSound("correct", Math.min(get().combo * 0.1 + 0.8, 1.8));

      return {
        score: state.score + points,
        level: state.level + 1,
        combo: state.combo + 1,
      };
    });
  },

  losePoints: () => {
    playSound("error");
    set((state) => ({
      level: state.level + 1,
      combo: 0,
    }));
  },

  timerDuration: 0,
  isTimerRunning: false,

  initTimerDuration: () => {
    const duration = Math.max(15000 - get().combo * 1000, 5000);
    set({ timerDuration: duration });
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
  const countryIndex = useAppStore((state) => state.countryIndex);
  return countryData[countryIndex];
}
