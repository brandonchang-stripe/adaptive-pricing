import { create } from "zustand";
import { CountryData, emailSubjects, countryData } from "./components/gameData";
import { randiRange, relativeRound } from "./util/math";
import { playMusic, playSound, stopMusic } from "./hooks/useAudio";
import { replaceAt } from "./util/array";
import { Currencies } from "./providers/stripe";
import ItemDisplayFrame from "./components/ItemDisplay/ItemDisplay";

type GameState =
  | "SLEEP"
  | "BOOT"
  | "SPLASH"
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
  type: string;
  merchant: string;
  usdPrice: number;
  converted: boolean;
  icon: string;
};

interface AppState {
  currencies: Currencies | null;
  setCurrencies: (currencies: Currencies | null) => void;

  // Game state machine
  state: GameState;
  // All state transition logic is handled here
  transitionState: (newState: GameState) => void;

  countryIndex: number;
  nextCountry: () => void;

  currentItems: ActiveItem[];
  itemIndex: number;
  purchasedItems: PurchasedItem[];
  purchaseItem: (item: ActiveItem, score: number, saved: number) => void;
  buyingEnabled: boolean;

  tutorialStep: number;
  nextTutorialStep: () => void;
  endTutorial: () => void;

  score: number[];
  combo: number;
  initGame: () => void;
  initRound: () => void;
  chooseRandomMerchants: (itemIndex: number, count?: number) => void;
  evaluate: (merchant: string | boolean) => Promise<void>;
  skipItem: () => void;

  losePoints: () => void;
  gainPoints: (points: number) => void;
  // timer state
  timerDuration: number;
  isTimerRunning: boolean;
  initTimerDuration: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Game state machine
  state: "SLEEP",
  transitionState: async (newState: GameState) => {
    const currentState = get().state;
    switch (newState) {
      case "BOOT":
      case "SPLASH":
        set({ state: newState });
        break;

      case "MAIN_MENU":
        get().initGame();
        get().initRound();
        playMusic();
        set({ state: newState });
        break;

      case "TUTORIAL":
        set({ state: newState });
        break;

      case "GAME_START":
        switch (currentState) {
          // End the tutorial on game start
          case "TUTORIAL":
            set({ state: newState, tutorialStep: -1 });
            break;

          // Start new game without tutorial (Play again)
          case "MAIN_MENU":
            set({ state: newState });
            break;

          // Starting new round
          case "ROUND_FINISH":
            get().nextCountry();
            get().initRound();
            set({ state: newState });
            break;
        }
        // TODO: Move this out to start frame component to handle the transition
        await new Promise((r) => setTimeout(r, 1800));
        get().transitionState("GAME_PLAY");
        break;

      case "GAME_PLAY":
        set({ state: newState, isTimerRunning: true });
        break;

      case "ROUND_FINISH":
        set({ state: newState, isTimerRunning: false });
        await new Promise((r) => setTimeout(r, 3000));
        if (get().countryIndex === countryData.length - 1) {
          get().transitionState("SCORE_SCREEN");
        } else {
          get().transitionState("GAME_START");
        }
        break;

      case "SCORE_SCREEN":
        stopMusic();
        setTimeout(() => {
          playMusic();
        }, (get().purchasedItems.length + 5) * 300 + 6000);
        set({ state: newState });
        break;

      default:
        console.error(`Invalid state transition from ${currentState} to ${newState}`);
    }
  },

  initGame: async () => {
    set({
      purchasedItems: [],
      countryIndex: 0,
      itemIndex: 0,
      isTimerRunning: false,
      score: Array(countryData.length).fill(-1),
    });
  },

  initRound: () => {
    get().chooseRandomMerchants(0);
    get().initTimerDuration();
    set((state) => ({
      isTimerRunning: false,
      itemIndex: 0,
      score: replaceAt(state.score, state.countryIndex, 0),
      combo: 0,
    }));
  },

  // Country state
  currencies: null,
  setCurrencies: (currencies) => {
    set({ currencies });
  },

  countryIndex: 0,
  nextCountry: () => {
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
  score: Array(countryData.length).fill(0),
  combo: 0,

  // Item State
  currentItems: [],
  itemIndex: 0,
  chooseRandomMerchants: (itemIndex, count = 2) => {
    const countryIndex = get().countryIndex;
    const country = countryData[countryIndex];
    const currentItemData = country.items[itemIndex];
    const items: ActiveItem[] = [];

    // Pick count random merchants
    const usedIndexes = new Set<number>();
    let merchantIndex = randiRange(0, currentItemData.merchants.length - 1);
    for (let i = 0; i < count; i++) {
      // Don't re-use merchants. This may be irrelevant now that there are always 2 merchants.
      while (usedIndexes.has(merchantIndex)) {
        merchantIndex = randiRange(0, currentItemData.merchants.length - 1);
      }

      const merchant = currentItemData.merchants[merchantIndex];
      const converted = i === 1 || countryIndex === countryData.length - 1;

      let price = currentItemData.baseUsdPrice;
      // Only change the price of the second item
      if (i === 1) {
        // Pick an increment at random
        const increment = currentItemData.priceIncrements[randiRange(0, currentItemData.priceIncrements.length - 1)];
        // 50/50 chance the increment subtracts instead of adds
        const negative = Math.round(Math.random()) * 2 - 1;

        price += increment * negative;
      }

      items.push({
        merchant,
        converted,
        icon: currentItemData.icon,
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
  buyingEnabled: true,

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
        get().losePoints();
        get().purchaseItem(item, -1, 0);
      }
    } else {
      // If the merchant is a boolean, the game has forced a decision,
      // either by timeout or some other means
      if (merchant) {
        get().gainPoints(1);
      } else {
        get().losePoints();
      }
    }

    set({ buyingEnabled: false });
    await new Promise((r) => setTimeout(r, 800));
    set({ buyingEnabled: true });

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
      get().transitionState("ROUND_FINISH");
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

      const countryIndex = get().countryIndex;
      const newScore = state.score[countryIndex] + points;
      return {
        score: replaceAt(state.score, countryIndex, newScore),
        combo: state.combo + 1,
      };
    });
  },

  losePoints: () => {
    playSound("error");
    set({ combo: 0 });
  },

  timerDuration: 0,
  isTimerRunning: false,

  initTimerDuration: () => {
    const isLastRound = get().countryIndex === countryData.length - 1;
    const duration = isLastRound ? 5000 : Math.max(15000 - get().combo * 1000, 5000);
    set({ timerDuration: duration });
  },
}));

export function useCurrentCountry(): CountryData {
  const countryIndex = useAppStore((state) => state.countryIndex);
  return countryData[countryIndex];
}

export function useConvertedPrice(usdPrice: number, converted: boolean = false): string {
  const currentCountry = useCurrentCountry();
  const currencies = useAppStore((state) => state.currencies);

  if (currencies === null) {
    // No currencies loaded, assume player is in the US
    if (converted) {
      return formatDisplayPrice((1 / currentCountry.conversionRateDefault) * usdPrice, currentCountry.currencyCode);
    } else {
      return formatDisplayPrice(usdPrice, "usd");
    }
  } else {
    if (!converted) {
      return formatDisplayPrice(
        (1 / currencies.rates[currentCountry.currencyCode]) * usdPrice,
        currentCountry.currencyCode
      );
    } else {
      if (currencies.toCurrency === "usd") {
        return formatDisplayPrice(usdPrice, "usd");
      } else {
        return formatDisplayPrice((1 / currencies.rates["usd"]) * usdPrice, currencies.toCurrency);
      }
    }
  }
}

// Convert the currency of the user's locale. relativeRound() lops off any relatively insignificant digits
export function formatDisplayPrice(price: number, currency: string): string {
  return Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: price >= 100 ? 0 : undefined,
  }).format(price);
}

export function useIsLightningRound(): boolean {
  const countryIndex = useAppStore((state) => state.countryIndex);
  return countryIndex === countryData.length - 1;
}
