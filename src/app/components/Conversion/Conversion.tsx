import { useState } from "react";
import styles from "./Conversion.module.css";
import Frame from "../Frame/Frame";
import { relativeRound } from "@/app/util/math";
import ConversionSlider from "../ConversionSlider/ConversionSlider";
import { CountryName, countryData } from "../gameData";
import { useCurrentCountry } from "@/app/store";

type ConversionWindowProps = {
  position: string;
  index?: number;
};

export default function Conversion({ position, index = 0 }: ConversionWindowProps) {
  const country = useCurrentCountry();
  const [usd, setUsd] = useState(1);

  return (
    <Frame label="currency-slider.com" position={position} index={index}>
      <div className={styles.conversionContainer}>
        <div className={styles.conversionPrice}>
          {country.currencySymbol} {relativeRound(country.conversionRateDefault * usd)} = ${usd}.00 USD
        </div>
        <ConversionSlider onChange={(v) => setUsd(v)} />
      </div>
    </Frame>
  );
}
