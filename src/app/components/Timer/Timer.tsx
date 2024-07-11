import { useEffect, useRef, useState } from "react";
import styles from "./Timer.module.css";
import { useAppStore } from "@/app/store";
import Frame from "../Frame/Frame";
import { toMMSS } from "@/app/util/math";

type TimerProps = {
  onTimeout: () => void;
  index?: number;
};

export default function TimerFrame({ onTimeout, index }: TimerProps) {
  const [seconds, setSeconds] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const running = useAppStore((state) => state.isTimerRunning);
  const duration = useAppStore((state) => state.timerDuration);

  useEffect(() => {
    function tick() {
      const now = Date.now();
      rafRef.current = requestAnimationFrame(tick);
      if (startTimeRef.current !== null && duration > 0) {
        const elapsed = now - startTimeRef.current;

        if (progressRef.current) {
          const value = 100 - (elapsed / duration) * 100;
          const timeInSeconds = Math.ceil((duration - elapsed) / 1000);
          if (seconds !== timeInSeconds) {
            progressRef.current.style.width = `${value}%`;
            setSeconds(timeInSeconds);
          }
        }

        if (elapsed >= duration) {
          startTimeRef.current = null;
          if (progressRef.current) {
            progressRef.current.style.width = `0%`;
          }
          setSeconds(0);
          onTimeout();
        }
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, onTimeout, seconds]);

  useEffect(() => {
    startTimeRef.current = running ? Date.now() : null;
  }, [running]);

  return (
    <Frame allowDrag label="Time left to purchase" position="timer" index={index}>
      <div className={styles.timerContainer}>
        <div className={styles.timerNumberTop}>{toMMSS(seconds)}</div>
        <div className={styles.timerProgress} ref={progressRef}>
          <div className={styles.timerNumber}>{toMMSS(seconds)}</div>
        </div>
      </div>
    </Frame>
  );
}
