import styles from "./ProgressBar.module.css";
import { useAppStore, useCountryItems } from "@/app/store";
import Frame from "../Frame/Frame";
import { AnimatePresence, motion } from "framer-motion";
import { stepEase } from "@/app/util/stepEase";
import { randRange } from "@/app/util/math";

export default function ProgressBar() {
  const currentItems = useCountryItems();
  const itemIndex = useAppStore((state) => state.itemIndex);

  return (
    <Frame label="Progress" position="progress-bar" type="simple" allowDrag>
      <div className={styles.progress}>
        <div className={styles.text}>
          <b>Items left:</b>
        </div>
        <div className={styles.progressContainer}>
          <AnimatePresence mode="popLayout">
            {currentItems
              .filter((_, index) => index >= itemIndex)
              .map((item, index) => (
                <motion.div
                  key={item.type}
                  animate={{ opacity: 1, transition: { duration: 0.3, ease: stepEase(4) } }}
                  exit={{
                    opacity: 1,
                    y: 100,
                    rotate: randRange(-10, 10),
                    transition: {
                      type: "spring",
                      velocity: 3,
                      mass: 0.5,
                      duration: 1.0,
                    },
                  }}
                  layout
                  className={`${styles.item} ${index === itemIndex ? styles.isCurrent : ""}`}
                >
                  {index === itemIndex ? " " : "X"}
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </Frame>
  );
}
