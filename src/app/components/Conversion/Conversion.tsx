import { use, useState } from "react";
import styles from "./Conversion.module.css";
import Frame from "../Frame/Frame";
import ConversionSlider from "../ConversionSlider/ConversionSlider";
import { formatDisplayPrice, useAppStore, useCurrentCountry, useIsLightningRound, useUsdToCurrency } from "@/app/store";
import useDeviceDetails from "@/app/hooks/useDeviceDetails";

type ConversionWindowProps = {
  position: string;
  index?: number;
};

export default function Conversion({ position, index = 0 }: ConversionWindowProps) {
  const { isMobile } = useDeviceDetails();
  const country = useCurrentCountry();
  const localCurrency = useAppStore((state) => state.localCurrency);
  const [usdValue, setUsdValue] = useState(1);
  const fromValue = useUsdToCurrency(usdValue, country.currencyCode);
  const toValue = useUsdToCurrency(usdValue, localCurrency);
  const isLightningRound = useIsLightningRound();

  return (
    <Frame label="Currency Converter" position={position} index={index} type={isMobile ? "simple" : "regular"}>
      {isLightningRound ? (
        <div className={styles.lightninground}>
          <img className={styles.lightningroundLogo} src="/sprites/lightning-round.png" alt="Lightning Round" />
          ALL PRICES ARE ADAPTED
        </div>
      ) : (
        <div className={styles.conversionContainer}>
          <div className={styles.conversionPrice}>
            <div className={styles.left}>{formatDisplayPrice(fromValue, country.currencyCode)}</div>
            <div className={styles.center}>=</div>
            <div className={styles.right}>{formatDisplayPrice(toValue, localCurrency)}</div>
          </div>
          <ConversionSlider onChange={(v) => setUsdValue(v)} />
          <div className={styles.conversionPriceHorizontal}>
            <div className={styles.rightHorizontal}>
              {formatDisplayPrice(toValue, localCurrency)}
            </div>
          </div>
        </div>
      )}
    </Frame>
  );
}
