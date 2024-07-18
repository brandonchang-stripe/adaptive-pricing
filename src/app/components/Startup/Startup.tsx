import { useAppStore } from "@/app/store";
import styles from "./Startup.module.css";
import { useEffect } from "react";
import { useAudio } from "@/app/hooks/useAudio";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

export default function Startup() {
  const audio = useAudio();
  const transitionState = useAppStore((state) => state.transitionState);
  const index = useMotionValue(0);

  const lines = [
    "12 Degrees -- STRIPE BIOS 1984 -- V42.42",
    "420Mhz clock rate",
    "RESOLUTION [ 420x640 ]",
    "______________________",
    "",
    "",
    "> System health check start",
    "Endothermic radiator [ OK ]",
    "Global financial infrastructure [ OK ]",
    "Primary disk check [ OK ]",
    "User directory check [ OK ]",
    "Ethernet connection [ OK ]",
    "Display adapter [ OK ]",
    "> System health check end",
    "",
    "> Boot sequence start",
    "> Price Adapter loading...",
    "",
    "",
    "PRESS [42] to enter SETUP",
    "07/15/1984-WPP-BOOT-5.7",
  ];

  const rounded = useTransform(index, (latest) => {
    return lines.slice(0, Math.ceil(latest)).join("\n");
  });

  useEffect(() => {
    animate(index, lines.length, { duration: 2 });

    audio("boot", 1.5);
    audio("beep");
    setTimeout(() => {
      transitionState("SPLASH");
    }, 2200);
  }, []);

  return (
    <div className={styles.container}>
      <motion.pre className={styles.text}>{rounded}</motion.pre>
    </div>
  );
}
