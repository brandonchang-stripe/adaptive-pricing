import { useState } from "react";
import styles from "./Conversion.module.css";
import Frame from "../Frame/Frame";
import { relativeRound } from "@/app/util/math";
import ConversionSlider from "../ConversionSlider/ConversionSlider";
import { useCurrentCountry, useIsLightningRound } from "@/app/store";
import useDeviceDetails from "@/app/hooks/useDeviceDetails";

type ConversionWindowProps = {
  position: string;
  index?: number;
};

export default function Conversion({ position, index = 0 }: ConversionWindowProps) {
  const { isMobile } = useDeviceDetails();
  const country = useCurrentCountry();
  const [usd, setUsd] = useState(1);
  const isLightningRound = useIsLightningRound();

  return (
    <Frame label="Currency Converter" position={position} index={index} type={isMobile ? "simple" : "regular"}>
      {isLightningRound ? (
        <div className={styles.lightninground}>
          <b>LIGHTNING ROUND</b><br/>
          ALL PRICES ARE IN USD
        </div>
      ) : (
        <div className={styles.conversionContainer}>
          <div className={styles.conversionPrice}>
            <div className={styles.left}>
              {country.currencySymbol} {relativeRound(country.conversionRateDefault * usd)}
            </div>
            <div className={styles.center}>=</div>
            <div className={styles.right}>${usd}.00 USD</div>
          </div>
          <ConversionSlider onChange={(v) => setUsd(v)} />
          <div className={styles.conversionPriceHorizontal}>
            <div className={styles.rightHorizontal}>${usd}.00 USD</div>
          </div>
        </div>
      )}
    </Frame>
  );
}
