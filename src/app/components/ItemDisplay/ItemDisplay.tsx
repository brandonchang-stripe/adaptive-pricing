import styles from "./ItemDisplay.module.css";
import { ActiveItem, useAppStore, useCurrentCountry } from "@/app/store";
import Frame from "../Frame/Frame";
import Button from "../Button/Button";
import { relativeRound } from "@/app/util/math";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";
import { useAudio } from "@/app/hooks/useAudio";
import { createPortal } from "react-dom";
import { stepEase } from "@/app/util/stepEase";
import { usePixelSize } from "@/app/hooks/usePixelSize";

type ItemDisplayFrameProps = {
  item: ActiveItem;
  index: number;
};

export default function ItemDisplayFrame({ item, index }: ItemDisplayFrameProps) {
  const tutorialStep = useAppStore((state) => state.tutorialStep);
  const currentCountry = useCurrentCountry()!;
  const evaluate = useAppStore((state) => state.evaluate);
  const ref = useRef<HTMLDivElement>(null);
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
    <>
      <Frame allowDrag key={item.type} label={item.merchant} position={`item-${index}`} index={index}>
        <div className={styles.itemDisplayOuter} ref={ref}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { backgroundColor: "var(--color-200)" },
              visible: { backgroundColor: "var(--color-200)" },
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

            {item.converted &&
              createPortal(<Popover targetRef={ref} />, document.getElementById("main")!, item.merchant)}
          </motion.div>
        </div>
      </Frame>
    </>
  );
}

type PopoverRef = {
  targetRef: RefObject<HTMLDivElement>;
};

function Popover({ targetRef }: PopoverRef) {
  const [targetBounds, setTargetBounds] = useState<DOMRect | null>(null);
  const pixelSize = usePixelSize();

  useEffect(() => {
    const updateBounds = () => {
      if (targetRef.current) {
        setTargetBounds(targetRef.current.getBoundingClientRect());
      }
    };
    updateBounds();

    // Add resize observer to handle window resizing
    window.addEventListener("resize", updateBounds);

    return () => {
      window.removeEventListener("resize", updateBounds);
      setTargetBounds(null);
    };
  }, [targetRef, pixelSize]);

  return (
    <motion.div
      variants={{
        hidden: {
          scale: 0,
          x: targetBounds ? targetBounds.x + (pixelSize * 40) : 0,
          y: targetBounds ? targetBounds.y - (pixelSize * 50) : 0,
        },
        visible: {
          scale: [null, 1, 1, 0],
          transition: { times: [0, 0.2, 0.8, 1], ease: stepEase(3), duration: 1.2, delay: 1.3 },
        },
      }}
      initial="hidden"
      animate={targetBounds && pixelSize !== 0 ? "visible" : "hidden"}
      className={styles.popover}
    >
      Price
      <br />
      Adapted!
    </motion.div>
  );
}
