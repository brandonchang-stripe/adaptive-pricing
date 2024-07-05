"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { useAppStore, useCurrentCountry } from "./store";
import PixelContext from "../components/Context";
import Panel from "../components/Panel";
import StartScreen from "../components/StartScreen";
import { relativeRound } from "../util/math";
import { useDrag } from "../hooks/useDrag";
import { SoundName, useAudio } from "../hooks/useAudio";
import { throttle } from "throttle-debounce";
import GameTexts from "../components/GameText/GameTexts";

export default function App() {
  const chooseRandomItem = useAppStore((store) => store.chooseRandomItem);
  const [start, setStart] = useState(false);
  function handleStart() {
    setStart(true);
    chooseRandomItem();
  }

  return (
    <PixelContext>
      {!start ? (
        <StartScreen onStart={handleStart}>
          <>
            <h1>Global Shopper (Name TBD)</h1>
            <p>
              You are a buyer (Theme TBD) making purchases across the world,
              purchasing products in their local currency.
            </p>
            <p>
              Use the Conversion Slider to convert the price of the item in USD
              before you hit Buy before time runs out.
            </p>
          </>
        </StartScreen>
      ) : (
        <main className={styles.main}>
          <div className={styles.grid}>
            <div style={{ gridArea: "scor", paddingTop: "20px" }}>
              <Score />
            </div>
            <Panel gridName="covn" label="Conversion">
              <Conversion />
            </Panel>
            <Panel gridName="item" label="Item">
              <ItemDisplay />
            </Panel>
            <Panel gridName="butn" label="Buttons">
              <Decider />
            </Panel>
          </div>
          <GameTexts />
        </main>
      )}
    </PixelContext>
  );
}

function Conversion() {
  const country = useCurrentCountry();
  const sliderValue = useAppStore((state) => state.sliderValue);

  return (
    <div className={styles.conversionContainer}>
      {country && (
        <div className={`${styles.conversionPrice} price`}>
          <div className={styles.conversionLeft}>
            {country.currencySymbol}{" "}
            {relativeRound(country.conversionRateDefault * sliderValue)}
          </div>
          <div className={styles.conversionCenter}>=</div>
          <div className={styles.conversionRight}>$ USD {sliderValue} </div>
        </div>
      )}
      <ChaseSlider step={1} max={500} />
    </div>
  );
}

export type ChaseSliderProps = {
  step?: number;
  min?: number;
  max?: number;
};

function ChaseSlider({ step = 1, min = 0, max = 100 }: ChaseSliderProps) {
  const setSliderValue = useAppStore((state) => state.setSliderValue);

  const notchWidth = 18;
  const count = Math.floor((max - min) / step);
  const [dragRef, dragData] = useDrag<HTMLDivElement>({
    minX: count * -notchWidth,
    maxX: 0,
    damp: 0.99,
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
        const { width, height, left, top } =
          indicatorRef.current.getBoundingClientRect();
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
        setSliderValue(val);
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

function ItemDisplay() {
  const item = useAppStore((state) => state.currentItem);
  const country = useCurrentCountry();
  const isValid = item && country;

  return (
    isValid && (
      <div className={styles.itemDisplay}>
        <div className={styles.itemDisplayImage}></div>
        <div className={styles.itemDisplayData}>
          <div className={styles.itemDisplayText}>
            {item.name} from {country.name}
          </div>
          <div className={styles.itemDisplayPrice}>
            {item.converted ? (
              <> $ USD {item.usdPrice} </>
            ) : (
              <>
                {country.currencySymbol}{" "}
                {relativeRound(item.usdPrice * country.conversionRateDefault)}
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
}

function Score() {
  const score = useAppStore((state) => state.score);
  return <div>score : {score}</div>;
}

function Decider() {
  const evaluate = useAppStore((state) => state.evaluate);
  const losePoint = useAppStore((state) => state.losePoints);
  const combo = useAppStore((state) => state.combo);
  const startTimer = useAppStore((state) => state.startTimer);
  const autoConvert = useAppStore((state) => state.autoConvert);
  const converts = useAppStore((state) => state.converts);
  const setPosition = useAppStore((state) => state.setPosition);
  const convertButtonRef = useRef<HTMLButtonElement>(null);
  const play = useAudio();

  useEffect(() => {
    function handleResize() {
      if (convertButtonRef.current) {
        const { width, height, left, top } =
          convertButtonRef.current.getBoundingClientRect();
        setPosition("convert", { x: width / 2 + left, y: height / 2 + top });
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBuy = useCallback(() => {
    play("click");
    evaluate();
    startTimer();
  }, [combo]);

  const handleAutoConvert = useCallback(() => {
    play("click");
    autoConvert();
  }, []);

  const handleTimeout = () => {
    losePoint(0);
    startTimer();
  };

  useEffect(() => {
    setTimeout(() => {
      startTimer();
    }, 200);
  }, []);

  useEffect(() => {
    function handleKey(e: globalThis.KeyboardEvent) {
      if (e.key === "b") {
        handleBuy();
      }

      if (e.key === "a") {
        handleAutoConvert();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className={styles.deciderContainer}>
      <Timer onTimeout={handleTimeout} />
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleBuy}>
          Buy
        </button>
        <button
          className={styles.button}
          onClick={handleAutoConvert}
          ref={convertButtonRef}
        >
          Auto Convert
          <br />[
          {Array(3)
            .fill(0)
            .map((_, i) => (converts > i ? "+" : "_"))}
          ]
        </button>
      </div>
    </div>
  );
}

type TimerProps = {
  onTimeout: () => void;
};
function Timer({ onTimeout }: TimerProps) {
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const progressRef = useRef<HTMLProgressElement>(null);
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

  useEffect(() => {
    startTimeRef.current = running ? Date.now() : null;
  }, [running]);

  return (
    <div className={styles.timerContainer}>
      <progress className={styles.timerProgress} max={100} ref={progressRef} />
    </div>
  );
}
