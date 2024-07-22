import { motion } from "framer-motion";
import styles from "./Logo.module.css";
import { useEffect } from "react";
import { stepEase } from "@/app/util/stepEase";
import { useAudio } from "@/app/hooks/useAudio";
import { useAppStore } from "@/app/store";

export default function Logo() {
  const audio = useAudio();
  const transitionState = useAppStore((state) => state.transitionState);

  useEffect(() => {
    const s = setTimeout(() => {
      audio("splash");
    }, 200);

    const t = setTimeout(() => {
      transitionState("MAIN_MENU");
    }, 2500);
    return () => {
      clearTimeout(t);
      clearTimeout(s);
    };
  }, []);

  return (
    <div className={styles.container}>
      <motion.img
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { duration: 1, ease: stepEase(10) } }}
        draggable={false}
        className={styles.logo}
        src="/sprites/price-adapter-logo.png"
        alt="Price adapter"
      />
    </div>
  );
}
