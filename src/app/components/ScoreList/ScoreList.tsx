import styles from "./ScoreList.module.css";

import { useEffect, useRef, useState } from "react";
import { cancelFrame, frame, motion } from "framer-motion";
import { useAppStore } from "../../store";
import { useAudio } from "@/app/hooks/useAudio";
import PurchaseEmailListItem from "@/app/components/PurchaseEmailListItem/PurchaseEmailListItem";
import EmailListItem from "@/app/components/EmailListItem/EmailListItem";
import Frame from "@/app/components/Frame/Frame";

type Props = {
  index?: number;
  onListAnimationComplete?: () => void;
};

export default function ScoreList({ index = 1, onListAnimationComplete }: Props) {
  const audio = useAudio();
  const purchasedItems = useAppStore((state) => state.purchasedItems);
  const scrollRef = useRef<HTMLDivElement>(null);

  const tick = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const handleListAnimationComplete = () => {
    cancelFrame(tick);
    if (onListAnimationComplete) {
      onListAnimationComplete();
    }
  };

  // after all items have animated in, stop scrolling to the bottom
  useEffect(() => {
    frame.render(tick, true);

    return () => {
      cancelFrame(tick);
    };
  }, [tick]);

  return (
    <Frame allowDrag label="s-mail.com" index={index} position="score-list">
      <div className={styles.scoreListContainer}>
        <div className={styles.scoreListToolbar}>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <img
                key={i}
                className={styles.scoreListButton}
                src={`/sprites/email-icon-${i + 1}.png`}
                alt=""
                draggable={false}
                onClick={() => audio("clickShort")}
              />
            ))}
          <img className={styles.scoreListDivider} src="/sprites/email-icon-divider.png" alt="" draggable={false} />
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <img
                key={i}
                className={styles.scoreListButton}
                src={`/sprites/email-icon-${i + 4}.png`}
                alt=""
                draggable={false}
                onClick={() => audio("clickShort")}
              />
            ))}
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.3,
                delayChildren: 0.6,
              },
            },
          }}
          onAnimationComplete={handleListAnimationComplete}
          className={styles.scoreListContents}
          ref={scrollRef}
        >
          {purchasedItems.map((item, i) => (
            <PurchaseEmailListItem key={i} item={item} index={i} />
          ))}

          <EmailListItem
            index={purchasedItems.length}
            openSounds={["open"]}
            subject="Your travel total"
            from="Travel Budgeter"
            imageSrc=""
          />
        </motion.div>
      </div>
    </Frame>
  );
}
