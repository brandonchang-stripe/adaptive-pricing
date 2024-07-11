import styles from "./ConversionSlider.module.css";
import { SoundName, useAudio } from "@/app/hooks/useAudio";
import { useDrag } from "@/app/hooks/useDrag";
import { useAppStore } from "@/app/store";
import { useEffect, useRef } from "react";
import { throttle } from "throttle-debounce";

type ConversionSliderProps = {
  step?: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

export default function ConversionSlider({ step = 1, min = 0, max = 100, onChange }: ConversionSliderProps) {
  const notchWidth = 10;
  const count = Math.floor((max - min) / step);
  const [dragRef, dragData] = useDrag<HTMLDivElement>({
    minX: count * -notchWidth,
    maxX: 0,
    damp: 0.98,
  });
  const rafRef = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const lastVal = useRef(0);
  const arr = Array(count + 1).fill(0);
  const play = useAudio();
  const setPosition = useAppStore((state) => state.setPosition);
  const throttleFunc = useRef(
    throttle(60, (sound: SoundName, rate: number) => {
      play(sound, rate);
    })
  ).current;

  useEffect(() => {
    function handleResize() {
      if (indicatorRef.current) {
        const { width, height, left, top } = indicatorRef.current.getBoundingClientRect();
        setPosition("indicator", { x: width / 2 + left, y: height / 2 + top });
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function tick() {
      const { offset, lastOffset } = dragData;
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(${offset.x}px)`;
      }

      const val = Math.round(-offset.x / notchWidth);
      if (val !== lastVal.current) {
        const rate = Math.abs(offset.x - lastOffset.x) * 0.005 + 0.9;
        throttleFunc("tick", rate);
        onChange(val);
      }
      lastVal.current = val;

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [sliderRef, rafRef, dragData]);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderWrapper} ref={dragRef}>
        <div className={styles.sliderControl} ref={sliderRef}>
          {arr.map((_, i) => {
            return <div className={styles.sliderNotch} key={i} />;
          })}
        </div>
        <div className={styles.sliderIndicator} ref={indicatorRef}></div>
      </div>
    </div>
  );
}
