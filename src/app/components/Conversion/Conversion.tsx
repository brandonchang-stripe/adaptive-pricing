import { useState } from "react";
import styles from "./Conversion.module.css";
import { CountryName, countryData } from "../countryData";
import Frame from "../Frame/Frame";
import { relativeRound } from "@/app/util/math";
import ConversionSlider from "../ConversionSlider/ConversionSlider";

type ConversionWindowProps = {
  country: CountryName;
  position: string;
  index?: number;
};

export default function Conversion({ country, position, index = 0 }: ConversionWindowProps) {
  const data = countryData.find((c) => c.name === country)!;
  const [usd, setUsd] = useState(1);

  return (
    <Frame label="currency-slider.com" position={position} index={index}>
      <div className={styles.conversionContainer}>
        <div className={styles.conversionPrice}>
          {data.currencySymbol} {relativeRound(data.conversionRateDefault * usd)} = ${usd}.00 USD
        </div>
        <ConversionSlider onChange={(v) => setUsd(v)} />
      </div>
    </Frame>
  );
}
