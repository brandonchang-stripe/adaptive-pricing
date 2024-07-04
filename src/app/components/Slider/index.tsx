import { useAppStore, useCurrentCountry } from "@/app/store";
import styles from "./Slider.module.css";
import { ChangeEventHandler, useEffect } from "react";
import { relativeRound, remap } from "@/app/util/math";

export type Props = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: number;
  step?: number;
};

export default function Slider({ value, onChange, step = 1 }: Props) {
  const item = useAppStore((state) => state.currentItem);
  const country = useCurrentCountry();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <input
          type="range"
          min={0}
          max={100}
          step={step}
          className={styles.input}
          onChange={onChange}
          value={value}
        />
        {item && country && (
          <div
            className={styles.indicator}
            style={{ left: remap(item.usdPrice, 0, 100, 1.4, 98.6) + "%" }}
          ></div>
        )}
      </div>
    </div>
  );
}
