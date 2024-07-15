import { useEffect } from "react";
import styles from "./ScoreFrame.module.css";
import { animate, transform, useMotionValue } from "framer-motion";

type Props = {
  spinning: boolean;
  digit: number;
};

export default function ScoreMileCounter({ spinning, digit }: Props) {
  const scroll = useMotionValue(0);
  const scrollTransform = transform([0, 1], [1000, 2000]);

  useEffect(() => {
    if (spinning) {
      animate(scroll, digit, { duration: 1.2 });
    }
  }, [spinning]);

  return (
    <div className={styles.numberSquare}>
      <div className={styles.number}>0</div>
      <div className={styles.number}>1</div>
      <div className={styles.number}>2</div>
      <div className={styles.number}>3</div>
      <div className={styles.number}>4</div>
      <div className={styles.number}>5</div>
      <div className={styles.number}>6</div>
      <div className={styles.number}>7</div>
      <div className={styles.number}>8</div>
      <div className={styles.number}>9</div>
      <div className={styles.number}>0</div>
      <div className={styles.number}>1</div>
      <div className={styles.number}>2</div>
      <div className={styles.number}>3</div>
      <div className={styles.number}>4</div>
      <div className={styles.number}>5</div>
      <div className={styles.number}>6</div>
      <div className={styles.number}>7</div>
      <div className={styles.number}>8</div>
      <div className={styles.number}>9</div>
    </div>
  );
}
