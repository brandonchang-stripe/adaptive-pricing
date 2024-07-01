import { create } from "zustand";
import { countryData, CountryData } from "./components/data";

const ZOOM_MIN = 1;
const ZOOM_MAX = 5;

interface AppState {
  countries: CountryData[];
  selectedCountry: number | null;
  setSelectedCountry: (index: number | null) => void;
  setSelectedCountryRate: (rate: number) => void;
  setCountries: (countries: CountryData[]) => void;
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  countries: [...countryData],
  selectedCountry: null,
  setSelectedCountry: (index) => {
    set((state) => {
      if (state.selectedCountry === index || index === null) {
        // Play deselect sound
        return { selectedCountry: null };
      } else {
        // Play select sound
        return { selectedCountry: index };
      }
    });
  },
  setSelectedCountryRate: (rate) => {
    set((state) => {
      if (state.selectedCountry !== null) {
        const updatedCountry = {
          ...state.countries[state.selectedCountry],
          currentConversionRate: rate,
        };

        return {
          countries: state.countries.map((country, index) => {
            if (index !== state.selectedCountry) return country;
            return updatedCountry;
          }),
          selectedCountryData: updatedCountry,
        };
      } else {
        return state;
      }
    });
  },
  setCountries: (countries) => set({ countries }),
  selectedCountryData: null,
  zoom: 1,
  zoomIn: () => set((state) => ({ zoom: Math.max(state.zoom - 1, ZOOM_MIN) })),
  zoomOut: () => set((state) => ({ zoom: Math.min(state.zoom + 1, ZOOM_MAX) })),
}));

export function useSelectedCountryData() {
  return useAppStore((state) =>
    state.selectedCountry ? state.countries[state.selectedCountry] : null
  );
}
