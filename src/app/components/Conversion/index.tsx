import { useCurrentCountry } from "@/app/store";
import styles from "./Conversion.module.css";
import Slider from "../Slider";
import { ChangeEventHandler, useCallback, useState } from "react";
import { relativeRound } from "@/app/util/math";
import { useAudio } from "@/app/hooks/useAudio";

export type Props = {
  includeSlider?: boolean;
};

export function Conversion({ includeSlider }: Props) {
  const country = useCurrentCountry();
  const [rate, setRate] = useState(1.0);
  const play = useAudio();

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setRate(parseFloat(e.target.value));
      // play('tick');
    },
    [setRate]
  );
  return (
    <div className={styles.container}>
      {country && (
        <div className={`${styles.price} price`}>
          <div className={styles.section}>
            {country.currencySymbol}{" "}
            {relativeRound(country.conversionRateDefault * rate)}
          </div>
          =
          <div className={styles.section}>$USD {rate}</div>
        </div>
      )}
      {includeSlider && <Slider onChange={handleOnChange} value={rate} /> }
    </div>
  );
}
