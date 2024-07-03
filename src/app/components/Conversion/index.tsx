import { useCurrentCountry } from "@/app/store";
import styles from "./Conversion.module.css";
import Slider from "../Slider";
import { ChangeEventHandler, useCallback, useState } from "react";
import { relativeRound } from "@/app/util/math";

export type Props = {
  includeSlider?: boolean;
};

export function Conversion({ includeSlider }: Props) {
  const country = useCurrentCountry();
  const [rate, setRate] = useState(1.0);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setRate(parseFloat(e.target.value));
    },
    [setRate]
  );
  return (
    <div className={styles.container}>
      {country && (
        <div className={`${styles.price} price`}>
          {country.currencySymbol}{" "}
          {relativeRound(country.conversionRateDefault * rate)} = $USD {rate}
        </div>
      )}
      {includeSlider && <Slider onChange={handleOnChange} value={rate} /> }
    </div>
  );
}
