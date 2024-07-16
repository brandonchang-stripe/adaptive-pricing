import styles from "./ItemDisplay.module.css";
import { ActiveItem, useAppStore, useCurrentCountry } from "@/app/store";
import Frame from "../Frame/Frame";
import Button from "../Button/Button";
import { relativeRound } from "@/app/util/math";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useAudio } from "@/app/hooks/useAudio";

type ItemDisplayFrameProps = {
  item: ActiveItem;
  index: number;
};

export default function ItemDisplayFrame({ item, index }: ItemDisplayFrameProps) {
  const tutorialStep = useAppStore((state) => state.tutorialStep);
  const currentCountry = useCurrentCountry()!;
  const evaluate = useAppStore((state) => state.evaluate);
  const audio = useAudio();

  const motionValue = useMotionValue(-3);
  const usd = `$${item.usdPrice.toFixed(2)}`;

  const slots = usd.length;
  const range = 3;
  const string = useTransform(motionValue, (v) => {
    const rounded = Math.round(v);
    let output = "";
    for (let i = 0; i < slots; i++) {
      if (rounded - i <= slots) {
        output += Math.abs(i - rounded) < range ? "*" : "+";
      } else {
        output += usd[i] || "";
      }
    }
    return output;
  });

  useEffect(() => {
    const s = setTimeout(() => {
      if (item.converted) audio("convert", 1.4);
    }, 1000);

    return () => {
      clearTimeout(s);
    };
  }, [item]);

  useEffect(() => {
    motionValue.set(-range);
    const controls = animate([[motionValue, slots * 2 + range, { duration: 1, delay: 1.0 }]]);
    return () => controls.stop();
  }, [slots, motionValue, item]);

  return (
    <Frame allowDrag key={item.type} label={item.merchant} position={`item-${index}`} index={index}>
      <div className={styles.itemDisplayOuter}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { backgroundColor: "var(--color-200)" },
            visible: {
              backgroundColor: "var(--color-200)",
              // backgroundColor: ["var(--color-200)", "var(--color-300)", "var(--color-200)"],
              // transition: { duration: 0.1, delay: 0.3 * (index + 1) + 0.1 },
            },
          }}
          className={styles.itemDisplay}
        >
          <div className={styles.itemDisplayContainer}>
            <div className={styles.itemDisplayImage} />
            <div className={styles.itemDisplayData}>
              <div>{item.type}</div>
              <motion.div className={styles.itemDisplayPrice}>
                {item.converted
                  ? string
                  : `${currentCountry!.currencySymbol} ${relativeRound(
                      item.usdPrice * currentCountry.conversionRateDefault
                    )}`}
              </motion.div>
            </div>
          </div>
          <Button onClick={() => evaluate(item.merchant)} disabled={tutorialStep >= 0}>
            Buy
          </Button>
        </motion.div>
      </div>
    </Frame>
  );
}
