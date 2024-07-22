import styles from "./ProgressBar.module.css";
import { useAppStore, useCurrentCountry, useIsLightningRound } from "@/app/store";
import Frame from "../Frame/Frame";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { stepEase } from "@/app/util/stepEase";
import { forwardRef } from "react";

export default function ProgressBar() {
  const currentItems = useCurrentCountry()?.items || [];
  const itemIndex = useAppStore((state) => state.itemIndex);

  return (
    <Frame label="Progress" position="progress-bar" type="simple" allowDrag>
      <div className={styles.progress}>
        <div className={styles.text}>Items left</div>
        <div className={styles.progressContainer}>
          <AnimatePresence initial={false} >
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
const Item = forwardRef<HTMLDivElement, ItemProps>(function Item({ item }, ref) {
  const isPresent = useIsPresent();

  return (
    <motion.div
      ref={ref}
      key={item.type}
      initial={false}
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
});
