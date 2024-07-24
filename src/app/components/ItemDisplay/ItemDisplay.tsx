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
import useDeviceDetails from "@/app/hooks/useDeviceDetails";

type ItemDisplayFrameProps = {
  item: ActiveItem;
  index: number;
};

export default function ItemDisplayFrame({ item, index }: ItemDisplayFrameProps) {
  const [purchased, setPurchased] = useState(false);
  const tutorialStep = useAppStore((state) => state.tutorialStep);
  const buyingEnabled = useAppStore((state) => state.buyingEnabled);
  const currentItems = useAppStore((state) => state.currentItems);
  const currentCountry = useCurrentCountry()!;
  const isBestDeal = currentItems.every((i) => i.usdPrice >= item.usdPrice);
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
    setPurchased(false);
    const s = setTimeout(() => {
      if (item.converted) audio("convert", 1.4);
    }, 1000);

    return () => {
      clearTimeout(s);
    };
  }, [item, audio]);

  useEffect(() => {
    motionValue.set(-range);
    const controls = animate([[motionValue, slots * 2 + range, { duration: 1, delay: 1.0 }]]);
    return () => controls.stop();
  }, [slots, motionValue, item]);

  const handlePurchase = async () => {
    if (!buyingEnabled) return;
    setPurchased(true);
    evaluate(item.merchant);
  };

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
              <img className={styles.itemDisplayImage} src={`/sprites/icons/${item.icon}.png`} />
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
            <Button onClick={handlePurchase} disabled={tutorialStep >= 0}>
              Buy
            </Button>

            {item.converted &&
              createPortal(<AdaptivePricingPopover targetRef={ref} />, document.getElementById("main")!, item.merchant)}
            {purchased &&
              createPortal(
                <PurchasePopover targetRef={ref} isBestDeal={isBestDeal} />,
                document.getElementById("main")!,
                item.merchant + "p"
              )}
          </motion.div>
        </div>
      </Frame>
    </>
  );
}

type AdaptivePricingPopoverRef = {
  targetRef: RefObject<HTMLDivElement>;
};

function AdaptivePricingPopover({ targetRef }: AdaptivePricingPopoverRef) {
  const [targetBounds, setTargetBounds] = useState<DOMRect | null>(null);
  const { isMobile } = useDeviceDetails();
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

  function calculateOffset() {
    if (!targetBounds) return { x: 0, y: 0 };

    if (isMobile) {
      return {
        x: targetBounds.x + window.innerWidth / 2 - pixelSize * 600,
        y: targetBounds.y - pixelSize * 430,
      };
    } else {
      const center = {
        x: targetBounds.x + targetBounds.width / 2,
        y: targetBounds.y + targetBounds.height / 2,
      };
      return {
        x: center.x + pixelSize * 50,
        y: center.y - pixelSize * 40,
      };
    }
  }

  return (
    <motion.div
      variants={{
        hidden: {
          scale: 0,
          x: calculateOffset().x,
          y: calculateOffset().y,
        },
        visible: {
          scale: [null, 1, 1, 0],
          transition: { times: [0, 0.1, 0.9, 1], ease: stepEase(3), duration: 1.6, delay: 1.3 },
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

type PurchasePopoverProps = {
  targetRef: RefObject<HTMLDivElement>;
  isBestDeal: boolean;
};

function PurchasePopover({ targetRef, isBestDeal }: PurchasePopoverProps) {
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const { isMobile } = useDeviceDetails();
  const pixelSize = usePixelSize();

  useEffect(() => {
    const updateBounds = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        if (isMobile) {
          setTargetPos({
            x: window.innerWidth / 2 - pixelSize * 100,
            y: rect.y + pixelSize * 100,
          });
        } else {
          setTargetPos({
            x: rect.x + rect.width / 2 - pixelSize * 35,
            y: rect.y + rect.height / 2 - pixelSize * 25,
          });
        }
      }
    };
    updateBounds();

    // Add resize observer to handle window resizing
    window.addEventListener("resize", updateBounds);

    return () => {
      window.removeEventListener("resize", updateBounds);
    };
  }, [targetRef, pixelSize, isMobile]);

  return (
    <motion.div
      variants={{
        hidden: {
          scale: 0,
        },
        visible: {
          scale: [null, 1, 1, 0],
          x: [targetPos.x, targetPos.x, targetPos.x, targetPos.x],
          y: [targetPos.y, targetPos.y, targetPos.y, targetPos.y - 50],
          transition: { times: [0, 0.1, 0.9, 1], ease: stepEase(6), duration: 1.6 },
        },
      }}
      initial="hidden"
      animate={targetPos.x !== 0 && pixelSize !== 0 ? "visible" : "hidden"}
      className={`${styles.purchasePopover} ${styles.popover} ${isBestDeal ? styles.bestDeal : styles.badDeal}`}
    >
      {isBestDeal ? `+100` : "Bad deal"}
    </motion.div>
  );
}
