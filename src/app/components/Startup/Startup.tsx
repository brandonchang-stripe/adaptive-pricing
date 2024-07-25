import { useAppStore } from "@/app/store";
import styles from "./Startup.module.css";
import { useEffect, useState } from "react";
import { useAudio } from "@/app/hooks/useAudio";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

export default function Startup() {
  const audio = useAudio();
  const transitionState = useAppStore((state) => state.transitionState);
  const index = useMotionValue(0);
  const [cutoff, setCutoff] = useState(0);

  const lines = [
    <div className={styles.line}>
      <div className={styles.block} />
      <div>STRIPE BIOS -- V42.42</div> 
      <div className={styles.block} />
    </div>,
    <br/>,
    <div><b>12 degrees POST driver</b></div>,
    <br />,
    <div>--- System health check start ---</div>,
    <div className={styles.line}>Exothermic radiator<div className={styles.spacer} />[ OK ]</div>,
    <div className={styles.line}>Feedback loop module<div className={styles.spacer} />[ SEEKING ]</div>,
    <div className={styles.line}>User priority <div className={styles.spacer} />[ FIRST ]</div>,
    <div className={styles.line}>Macros <div className={styles.spacer} />[ OPTIMIZED ]</div>,
    <div className={styles.line}>Global financial infrastructure <div className={styles.spacer} />[ ONLINE ]</div>,
    <div className={styles.line}>System resilience <div className={styles.spacer} />[ OK ]</div>,
    <div className={styles.line}>Primary disk check <div className={styles.spacer} />[ OK ]</div>,
    <div className={styles.line}>Display adapter <div className={styles.spacer} />[ OK ]</div>,
    <div>--- System health check end ---</div>,
    <br />,
    <div>420Mhz clock rate</div>,
    <div>RESOLUTION 420 x 640 (HI-RES)</div>,
    <div className={styles.spacer} />,
    <div>PRESS [42] to enter SETUP</div>,
    <div>07/15/1984-WPP-BOOT-5.7</div>,
    <div>Boot sequence start</div>,
    <div>Price Adapter loading...</div>,
  ];

  useTransform(index, (latest) => {
    const val = Math.ceil(latest);
    if (val !== cutoff) setCutoff(val);
  });

  useEffect(() => {
    const animation = animate(index, lines.length, { duration: 2 });

    audio("boot", 1.5);
    audio("beep");
    setTimeout(() => {
      transitionState("SPLASH");
    }, 2200);

    return () => {
      animation.stop();
    };
  }, []);

  return (
    <div className={styles.container}>
      {lines.slice(0, cutoff)}
    </div>
  );
}