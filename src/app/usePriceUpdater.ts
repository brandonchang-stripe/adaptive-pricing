import { useEffect, useRef } from "react";
import { createNoise2D, NoiseFunction2D } from "simplex-noise";
import { useAppStore } from "./store";

export type Props = {
  tickRate: number;
  changeRate: number;
  purchaseRate: number;
};

export default function usePriceUpdater({ tickRate, changeRate }: Props) {
  const noise = useRef<NoiseFunction2D>(createNoise2D(() => Math.random()));
  const countries = useAppStore((state) => state.countries);
  const setCountries = useAppStore((state) => state.setCountries);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountries = countries.map((country, i) => ({
        ...country,
        currentConversionRate: noise.current((Date.now() / 10000) * changeRate, i * 100),
      }));
      // const newValue = noise.current((Date.now() / 10000) * changeRate, 1.0);
      setCountries(newCountries);
      console.log((noise.current((Date.now() / 10000) * changeRate, 1.0) + 1.0) / 2);
    }, tickRate);

    return () => {
      clearInterval(interval);
    };
  }, []);
}
