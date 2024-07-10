import styles from "./ScoreScreen.module.css";

import { useEffect, useRef } from "react";
import { cancelFrame, frame, motion } from "framer-motion";
import { useAppStore } from "../../store";
import { useAudio } from "@/app/hooks/useAudio";
import PurchaseEmailListItem from "@/app/components/PurchaseEmailListItem/PurchaseEmailListItem";
import EmailListItem from "@/app/components/EmailListItem/EmailListItem";
import Frame from "@/app/components/Frame/Frame";

export default function ScoreScreen() {
  return (
    <>
      <ScoreList />;
      <ScoreFrame />;
    </>
  );
}

type ScoreListProps = {
  index?: number;
};
function ScoreList({ index = 1 }: ScoreListProps) {
  const audio = useAudio();
  const purchasedItems = useAppStore((state) => state.purchasedItems);
  const scrollRef = useRef<HTMLDivElement>(null);

  const tick = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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
          <img
            className={styles.scoreListDivider}
            src="/sprites/email-icon-divider.png"
            alt=""
            draggable={false}
          />
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
                staggerChildren: 0.4,
                delayChildren: 0.4,
              },
            },
          }}
          onAnimationComplete={() => {
            cancelFrame(tick);
          }}
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
          ></EmailListItem>
        </motion.div>
      </div>
    </Frame>
  );
}

function ScoreFrame() {
  const country = useAppStore((state) => state.currentCountry);
  const score = useAppStore((state) => state.score);
  const scoreDigits = (score * 100).toString().split("");

  return (
    <Frame allowDrag label="Your travel total" position="score-frame" index={1}>
      <div className={styles.scoreFrame}>
        <div className={styles.scoreFrameContainer}>
          <table className={styles.scoreFrameMeta}>
            <tr>
              <td>from:</td>
              <td>Travel Budgeter</td>
            </tr>
            <tr>
              <td>sent:</td>
              <td>today</td>
            </tr>
            <tr>
              <td>subject:</td>
              <td>Your travel total</td>
            </tr>
          </table>

          <table className={styles.scoreFrameSpending}>
            <tr>
              <td>Your {country} trip spend:</td>
              <td>$99999</td>
            </tr>
            <tr>
              <td>Total savings:</td>
              <td>$99999</td>
            </tr>
          </table>

          <div className={styles.scoreFrameMilesContainer}>
            <div>Total miles earned:</div>
            <div className={styles.scoreFrameMilesSquares}>
              {scoreDigits.map((digit, i) => (
                <div className={styles.scoreFrameMilesSquare}>
                  <div className={styles.scoreFrameMilesDigit}>{digit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <img
          className={styles.scoreFrameImage}
          src="/sprites/plane-image.png"
          draggable={false}
          alt=""
        />
      </div>
    </Frame>
  );
}
