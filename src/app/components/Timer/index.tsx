import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styles from "./Timer.module.css";

export type Props = {
  onTimeout: () => void;
};

export type TimerHandle = {
  start: (duration: number) => void;
};

const Timer = forwardRef<TimerHandle, Props>(function Timer(
  { onTimeout },
  ref
) {
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const progressRef = useRef<HTMLProgressElement>(null);
  const [duration, setDuration] = useState(20000);

  useEffect(() => {
    function tick() {
      const now = Date.now();
      rafRef.current = requestAnimationFrame(tick);
      if (startTimeRef.current !== null) {
        const elapsed = now - startTimeRef.current;

        if (progressRef.current) {
          const value = 100 - (elapsed / duration) * 100;
          progressRef.current.value = value;
        }

        if (elapsed >= duration) {
          startTimeRef.current = null;
          onTimeout();
        }
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, onTimeout]);

  useImperativeHandle(
    ref,
    () => {
      return {
        start(duration: number) {
          setDuration(duration);
          startTimeRef.current = Date.now();
        },
      };
    },
    []
  );

  return (
    <div className={styles.container}>
      <progress className={styles.progress} max={100} ref={progressRef} />
    </div>
  );
});

export default Timer;
