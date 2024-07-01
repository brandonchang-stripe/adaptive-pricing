import { useAppStore, useSelectedCountryData } from "@/app/store";
import styles from "./Slider.module.css";

export default function Slider() {
  const setSelectedCountryRate = useAppStore((state) => state.setSelectedCountryRate);
  const selectedCountryData = useSelectedCountryData();

  return (
    <div className={styles.container}>
      <div className={styles.country}>
        <div className={styles.countryName}>{selectedCountryData?.name || "."}</div>
        <div className={styles.countryFlag}></div>
      </div>
      <div className={styles.wrapper}>
        {selectedCountryData && (
          <>
            <input
              type="range"
              min={0}
              max={selectedCountryData.conversionRateDefault * 2}
              step={0.01}
              className={styles.input}
              onChange={(e) => setSelectedCountryRate(Number(e.target.value))}
              value={selectedCountryData.currentConversionRate}
            />
            <div>{selectedCountryData.currentConversionRate.toFixed(2)}</div>
          </>
        )}
      </div>
    </div>
  );
}
