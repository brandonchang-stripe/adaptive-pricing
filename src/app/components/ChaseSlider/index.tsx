import styles from "./Slider.module.css";
import { ChangeEventHandler } from "react";

export type Props = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: number;
  step?: number;
};

export default function ChaseSlider({ value, onChange, step = 0.5 }: Props) {
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
      </div>
    </div>
  );
}
