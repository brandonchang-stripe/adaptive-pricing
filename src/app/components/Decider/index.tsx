import { useAppStore } from "@/app/store";
import { type MouseEventHandler, useRef, useEffect } from "react";
import style from "./Decider.module.css";
import { useAudio } from "@/app/hooks/useAudio";
import Timer, { TimerHandle } from "../Timer";

export default function Decider() {
  const evaluate = useAppStore((state) => state.evaluate);
  const losePoint = useAppStore((state) => state.losePoint);
  const level = useAppStore((state) => state.level);
  const timerRef = useRef<TimerHandle>(null);
  const play = useAudio();

  const handleBuy: MouseEventHandler<HTMLButtonElement> = (e) => {
    play("click");
    evaluate("buy");
    startTimer();
  };

  const handleSkip: MouseEventHandler<HTMLButtonElement> = (e) => {
    play("click");
    evaluate("skip");
    startTimer();
  };

  const handleTimeout = () => {
    losePoint();
    startTimer();
  };

  const startTimer = () => {
    if (timerRef.current) {
      const time = Math.max((30000 - level * 1500), 6000)
      timerRef.current.start(time);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      startTimer();
    }, 200)
  }, [])

  return (
    <div className={style.container}>
      <Timer ref={timerRef} onTimeout={handleTimeout} />
      <div className={style.buttonContainer}>
        <button className={`${style.button} ${style.buy}`} onClick={handleBuy}>
          Buy
        </button>
        <button
          className={`${style.button} ${style.skip}`}
          onClick={handleSkip}
        >
          Skip
        </button>
      </div>
    </div>
  );
}
