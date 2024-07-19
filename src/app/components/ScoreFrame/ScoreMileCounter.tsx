import { useEffect } from "react";
import styles from "./ScoreFrame.module.css";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useAudio } from "@/app/hooks/useAudio";

type Props = {
  digit: number;
  index: number;
};

export default function ScoreMileCounter({ digit, index }: Props) {
  const audio = useAudio();
  const scroll = useMotionValue(0);
  const scrollNumber = useTransform(scroll, (v) => {
    return (Math.round(v) % 10).toString();
  });

  useEffect(() => {
    const controls = animate(scroll, digit + 20, { duration: 1.2, delay: index * 0.3 + 0.5 });
    controls.then(() => {
      audio("scroll");
    });
    return () => controls.stop();
  }, [index, scroll, digit]);

  return (
    <div className={styles.numberSquare}>
      <motion.div className={styles.number}>{scrollNumber}</motion.div>
    </div>
  );
}
