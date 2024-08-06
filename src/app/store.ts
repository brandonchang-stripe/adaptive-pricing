import { create } from "zustand";
import { CountryData, emailSubjects } from "./components/gameData";
import { randiRange } from "./util/math";
import { SoundName, playMusic, playSound, stopMusic } from "./hooks/useAudio";
import { replaceAt } from "./util/array";
import { Currencies } from "./providers/stripe";

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
  currencies: Currencies;
  localCurrency: string;
  setCurrencies: (currencies: Currencies | null, localCurrency: string) => void;

  // Game state machine
  state: GameState;
  // All state transition logic is handled here
  transitionState: (newState: GameState) => void;

  countryData: CountryData[];
  setCountryData: (countries: CountryData[]) => void;

  countryIndex: number;
  nextCountry: () => void;

  currentItems: ActiveItem[];
  itemIndex: number;
  purchasedItems: PurchasedItem[];
  purchaseItem: (item: ActiveItem, score: number, saved: number) => void;
  buyingEnabled: boolean;

  tutorialActive: boolean;
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
      case "SLEEP":
        set({ state: newState });
        stopMusic();
        break;

      case "BOOT":
      case "SPLASH":
      case "TUTORIAL":
        set({ state: newState });
        break;

      case "MAIN_MENU":
        get().initGame();
        get().initRound();
        playMusic();
        set({ state: newState });
        break;

      case "GAME_START":
        switch (currentState) {
          case "MAIN_MENU":
          case "TUTORIAL":
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
        const countryData = get().countryData;
        set({ state: newState, isTimerRunning: false });
        await new Promise((r) => setTimeout(r, 3000));
        if (get().countryIndex === countryData.length - 2 && get().tutorialActive) {
          get().transitionState("TUTORIAL");
          get().nextCountry();
          get().initRound();
        } else if (get().countryIndex === countryData.length - 1) {
          get().transitionState("SCORE_SCREEN");
        } else {
          get().transitionState("GAME_START");
        }
        break;

      case "SCORE_SCREEN":
        stopMusic();
        setTimeout(() => {
          playMusic();
        }, (get().purchasedItems.length + 5) * 300 + 5000);
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
      score: Array(get().countryData.length).fill(-1),
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
  countryData: [],
  setCountryData: (countryData) => {
    set({ countryData });
  },

  countryIndex: 0,
  nextCountry: () => {
    set((state) => {
      const nextIndex = state.countryIndex + 1;
      if (nextIndex >= state.countryData.length) {
        return state;
      }
      return { countryIndex: nextIndex };
    });
  },

  localCurrency: "usd",
  // currencies: get().countryData.reduce((acc, country) => {
  //   if (country.conversionRateDefault === null) return acc;
  //   return { ...acc, [country.currencyCode]: country.conversionRateDefault };
  // }, {} as Currencies),
  currencies: {},
  setCurrencies: (currencies, localCurrency) => {
    if (currencies !== null) {
      set({ currencies, localCurrency });
    } else {
      const defaultCurrencies = get().countryData.reduce((acc, country) => {
        if (country.conversionRateDefault === null) return acc;
        return { ...acc, [country.currencyCode]: country.conversionRateDefault };
      }, {} as Currencies);

      set({ currencies: defaultCurrencies, localCurrency });
    }
  },

  // Tutorial state
  tutorialActive: true,
  tutorialStep: 0,
  nextTutorialStep: () => {
    if (!get().tutorialActive) return;
    set((state) => ({ tutorialStep: state.tutorialStep + 1 }));
  },
  endTutorial: () => {
    set({ tutorialActive: false });
  },

  // Game meta state
  score: [],
  combo: 0,

  // Item State
  currentItems: [],
  itemIndex: 0,
  chooseRandomMerchants: (itemIndex, count = 2) => {
    const countryData = get().countryData;
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

    set({ buyingEnabled: false, isTimerRunning: false });
    await new Promise((r) => setTimeout(r, 800));
    set({ buyingEnabled: true });

    const allItems = get().countryData[get().countryIndex].items;
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
      playSound(`point${Math.min(state.combo + 1, 5)}` as SoundName);

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
    const isLastRound = get().countryIndex === get().countryData.length - 1;
    const duration = isLastRound ? 5000 : Math.max(18000 - get().combo * 1000, 5000);
    set({ timerDuration: duration });
  },
}));

export function useCurrentCountry(): CountryData {
  const countryIndex = useAppStore((state) => state.countryIndex);
  const countryData = useAppStore((state) => state.countryData);
  return countryData[countryIndex];
}

export function useUsdToCurrency(usdPrice: number, currency: string = "usd"): number {
  const currencies = useAppStore((state) => state.currencies);
  if (currency === "usd") return usdPrice;
  return (1 / currencies[currency]) * usdPrice;
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
  const countryData = useAppStore((state) => state.countryData);
  return countryIndex === countryData.length - 1;
}
