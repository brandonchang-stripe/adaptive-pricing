import { useAppStore } from "@/app/store";
import { type MouseEventHandler, useCallback } from "react";
import style from "./Decider.module.css";
import { useAudio } from "@/app/hooks/useAudio";

export default function Decider() {
  const chooseRandomItem = useAppStore((state) => state.chooseRandomItem);
  const evaluate = useAppStore((state) => state.evaluate);
  const play = useAudio();

  const handleBuy: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      play("click");
      evaluate("buy");
      chooseRandomItem();
    },
    [chooseRandomItem]
  );

  const handleSkip: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      play("click");
      evaluate("skip");
      chooseRandomItem();
    },
    [chooseRandomItem]
  );

  return (
    <div className={style.container}>
      <button className={`${style.button} ${style.buy}`} onClick={handleBuy}>
        Buy
      </button>
      <button className={`${style.button} ${style.skip}`} onClick={handleSkip}>
        Skip
      </button>
    </div>
  );
}
