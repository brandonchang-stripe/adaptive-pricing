import styles from "./ItemDisplay.module.css";
import { ActiveItem, useAppStore, useCurrentCountry } from "@/app/store";
import Frame from "../Frame/Frame";
import Button from "../Button/Button";
import { relativeRound } from "@/app/util/math";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

type ItemDisplayFrameProps = {
  item: ActiveItem;
  index: number;
};

export default function ItemDisplayFrame({ item, index }: ItemDisplayFrameProps) {
  const currentCountry = useCurrentCountry()!;
  const evaluate = useAppStore((state) => state.evaluate);
  const usd = useMotionValue("ADAPTIVE");
  useEffect(() => {
    const controls = animate([
      [usd, "ADAPTIVE", { delay: 0, duration: 1.3 }],
      [usd, "PRICING", { duration: 0.2 }],
      [usd, "ENABLED", { duration: 0.2 }],
      [usd, `$${item.usdPrice.toFixed(2)}`, { duration: 1.0 }],
    ]);

    return () => controls.stop();
  }, [usd, item.usdPrice]);

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
                  ? usd
                  : `${currentCountry!.currencySymbol} ${relativeRound(
                      item.usdPrice * currentCountry.conversionRateDefault
                    )}`}
              </motion.div>
            </div>
          </div>
          <Button onClick={() => evaluate(item.merchant)}>Buy</Button>
        </motion.div>
      </div>
    </Frame>
  );
}
