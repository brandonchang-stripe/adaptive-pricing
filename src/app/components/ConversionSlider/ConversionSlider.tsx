import styles from "./ConversionSlider.module.css";
import { SoundName, useAudio } from "@/app/hooks/useAudio";
import { ResolvedValues, motion, useDragControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { throttle } from "throttle-debounce";

type ConversionSliderProps = {
  step?: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

export default function ConversionSlider({ step = 1, min = 0, max = 100, onChange }: ConversionSliderProps) {
  const [notchWidth, setNotchWidth] = useState(2);
  const dragControls = useDragControls();

  const count = Math.floor((max - min) / step);
  const slideRef = useRef<HTMLDivElement>(null);
  const lastVal = useRef(0);
  const play = useAudio();
  const throttleFunc = useRef(
    throttle(60, (sound: SoundName, rate: number) => {
      play(sound, rate);
    })
  ).current;

  function startDrag(event: React.PointerEvent) {
    dragControls.start(event, { snapToCursor: false });
  }

  function handleUpdate(latest: ResolvedValues) {
    const val = Math.round(-latest.x / notchWidth);
    if (val !== lastVal.current) {
      // const rate = Math.abs(latest.x - latest.) * 0.005 + 0.9;
      if (val < min || val > count) {
        throttleFunc("tick", 0.4);
      } else {
        throttleFunc("tick", 0.8 + val * 0.006);
      }
      onChange(Math.max(Math.min(val, count), 0));
    }

    lastVal.current = val;
  }

  useEffect(() => {
    function handleResize() {
      if (slideRef.current) {
        const width = slideRef.current.scrollWidth;
        setNotchWidth(width / count);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [count]);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderWrapper} onPointerDown={startDrag}>
        <motion.div
          className={styles.sliderControl}
          drag="x"
          // whileDrag={{ opacity: 0.2, transition: { duration: 0.2, ease: stepEase(2) } }}
          dragConstraints={{ left: -notchWidth * count, right: 0 }}
          dragTransition={{ bounceStiffness: 1000, bounceDamping: 100 }}
          dragElastic={0.05}
          dragListener={false}
          dragControls={dragControls}
          onUpdate={handleUpdate}
          ref={slideRef}
        >
          {Array(count + 1)
            .fill(0)
            .map((_, i) => {
              return <div className={styles.sliderNotch} key={i} />;
            })}
        </motion.div>
        <div className={styles.sliderIndicator}></div>
      </div>
    </div>
  );
}
