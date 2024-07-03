import { useCurrentCountry } from "@/app/store";
import styles from "./Slider.module.css";
import { ChangeEventHandler } from "react";

export type Props = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: number;
};

export default function Slider({value, onChange}: Props) {
  const country = useCurrentCountry();

  return country ? (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <input
          type="range"
          min={0}
          max={80}
          step={0.5}
          className={styles.input}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  ) : null;
}
