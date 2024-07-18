import styles from "./ProgressBar.module.css";
import { useAppStore, useCurrentCountry } from "@/app/store";
import Frame from "../Frame/Frame";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { stepEase } from "@/app/util/stepEase";
import { useEffect } from "react";

export default function ProgressBar() {
  const currentItems = useCurrentCountry()?.items || [];
  const itemIndex = useAppStore((state) => state.itemIndex);

  return (
    <Frame label="Progress" position="progress-bar" type="simple" allowDrag>
      <div className={styles.progress}>
        <div className={styles.text}>Items left</div>
        <div className={styles.progressContainer}>
          <AnimatePresence initial={false} mode="popLayout">
            {currentItems
              .filter((_, index) => index >= itemIndex)
              .map((item) => (
                <Item key={item.type} item={item} />
              ))}
          </AnimatePresence>
        </div>
      </div>
    </Frame>
  );
}

type ItemProps = {
  item: { type: string };
};
function Item({ item }: ItemProps) {
  const isPresent = useIsPresent();

  return (
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
      [{isPresent ? " " : "x"}] {item.type}
    </motion.div>
  );
}
