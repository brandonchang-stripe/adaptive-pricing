import { useState } from "react";
import styles from "./Conversion.module.css";
import Frame from "../Frame/Frame";
import { relativeRound } from "@/app/util/math";
import ConversionSlider from "../ConversionSlider/ConversionSlider";
import { useCurrentCountry } from "@/app/store";

type ConversionWindowProps = {
  position: string;
  index?: number;
};

export default function Conversion({ position, index = 0 }: ConversionWindowProps) {
  const country = useCurrentCountry();
  const [usd, setUsd] = useState(1);

  return (
    <Frame label="Currency Converter" position={position} index={index}>
      <div className={styles.conversionContainer}>
        <div className={styles.conversionPrice}>
          <div className={styles.left}>
            {country.currencySymbol} {relativeRound(country.conversionRateDefault * usd)}
          </div>
          <div className={styles.center}>=</div>
          <div className={styles.right}>${usd}.00 USD</div>
        </div>
        <ConversionSlider onChange={(v) => setUsd(v)} />
      </div>
    </Frame>
  );
}
