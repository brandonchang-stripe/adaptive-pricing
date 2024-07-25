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
    <div key={1} className={styles.line}>
      <div className={styles.block} />
      <div>STRIPE BIOS -- V42.42</div>
      <div className={styles.block} />
    </div>,
    <br key={2} />,
    <div key={3}>
      <b>12 degrees POST driver</b>
    </div>,
    <br key={4} />,
    <div key={5}>--- System health check start ---</div>,
    <div key={6} className={styles.line}>
      Exothermic radiator
      <div className={styles.spacer} />[ OK ]
    </div>,
    <div key={7} className={styles.line}>
      Feedback loop module
      <div className={styles.spacer} />[ SEEKING ]
    </div>,
    <div key={8} className={styles.line}>
      User priority <div className={styles.spacer} />[ FIRST ]
    </div>,
    <div key={9} className={styles.line}>
      Macros <div className={styles.spacer} />[ OPTIMIZED ]
    </div>,
    <div key={10} className={styles.line}>
      Global financial infrastructure <div className={styles.spacer} />[ ONLINE ]
    </div>,
    <div key={11} className={styles.line}>
      System resilience <div className={styles.spacer} />[ OK ]
    </div>,
    <div key={12} className={styles.line}>
      Primary disk check <div className={styles.spacer} />[ OK ]
    </div>,
    <div key={13} className={styles.line}>
      Display adapter <div className={styles.spacer} />[ OK ]
    </div>,
    <div key={14}>--- System health check end ---</div>,
    <br key={15} />,
    <div key={16}>420Mhz clock rate</div>,
    <div key={17}>RESOLUTION 420 x 640 (HI-RES)</div>,
    <div key={18} className={styles.spacer} />,
    <div key={19}>PRESS [42] to enter SETUP</div>,
    <div key={20}>07/15/1984-WPP-BOOT-5.7</div>,
    <div key={21}>Boot sequence start</div>,
    <div key={22}>Price Adapter loading...</div>,
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

  return <div className={styles.container}>{lines.slice(0, cutoff)}</div>;
}
