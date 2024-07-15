import styles from "./ProgressBar.module.css";
import { useAppStore, useCurrentCountry } from "@/app/store";
import Frame from "../Frame/Frame";
import { AnimatePresence, motion } from "framer-motion";
import { stepEase } from "@/app/util/stepEase";

export default function ProgressBar() {
  const currentItems = useCurrentCountry()?.items || [];
  const itemIndex = useAppStore((state) => state.itemIndex);

  return (
    <Frame label="Progress" position="progress-bar" type="simple" allowDrag>
      <div className={styles.progress}>
        <div className={styles.text}>
          <b>Items left:</b>
        </div>
        <div className={styles.progressContainer}>
          <AnimatePresence initial={false} mode="popLayout">
            {currentItems
              .filter((_, index) => index >= itemIndex)
              .map((item) => (
                <motion.div
                  key={item.type}
                  animate={{ scale: 1, transition: { duration: 0.3, ease: stepEase(4) } }}
                  exit={{
                    scale: 0,
                    transition: { duration: 0.3, ease: stepEase(3) },
                  }}
                  layout
                  className={styles.item}
                >
                  +
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </Frame>
  );
}
