import styles from "./ConversionSlider.module.css";
import { SoundName, useAudio } from "@/app/hooks/useAudio";
import { useDrag } from "@/app/hooks/useDrag";
import { useAppStore } from "@/app/store";
import { PanInfo, ResolvedValues, motion, useDragControls } from "framer-motion";
import { useEffect, useRef } from "react";
import { throttle } from "throttle-debounce";

type ConversionSliderProps = {
  step?: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

export default function ConversionSlider({ step = 1, min = 0, max = 100, onChange }: ConversionSliderProps) {
  const dragControls = useDragControls();

  const notchWidth = 10;
  const count = Math.floor((max - min) / step);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const lastVal = useRef(0);
  const arr = Array(count + 1).fill(0);
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
      if (val < 0 || val > 100) {
        throttleFunc("tick", 0.4);
      } else {
        throttleFunc("tick", 0.8 + val * 0.006);
      }
      onChange(Math.max(Math.min(val, 100), 0));
    }

    lastVal.current = val;
  }

  // useEffect(() => {
  //   function tick() {
  //     const { offset, lastOffset } = dragData;
  //     if (sliderRef.current) {
  //       sliderRef.current.style.transform = `translateX(${offset.x}px)`;
  //     }

  //     const val = Math.round(-offset.x / notchWidth);
  //     if (val !== lastVal.current) {
  //       const rate = Math.abs(offset.x - lastOffset.x) * 0.005 + 0.9;
  //       throttleFunc("tick", rate);
  //       onChange(val);
  //     }
  //     lastVal.current = val;

  //     rafRef.current = requestAnimationFrame(tick);
  //   }

  //   rafRef.current = requestAnimationFrame(tick);
  //   return () => {
  //     if (rafRef.current) cancelAnimationFrame(rafRef.current);
  //   };
  // }, [sliderRef, rafRef, dragData]);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderWrapper} onPointerDown={startDrag}>
        <motion.div
          className={styles.sliderControl}
          drag="x"
          dragConstraints={{ left: -notchWidth * 100, right: 0 }}
          dragTransition={{ bounceStiffness: 1000, bounceDamping: 100 }}
          dragElastic={0.05}
          dragListener={false}
          dragControls={dragControls}
          onUpdate={handleUpdate}
        >
          {arr.map((_, i) => {
            return <div className={styles.sliderNotch} key={i} />;
          })}
        </motion.div>
        <div className={styles.sliderIndicator} ref={indicatorRef}></div>
      </div>
    </div>
  );
}
