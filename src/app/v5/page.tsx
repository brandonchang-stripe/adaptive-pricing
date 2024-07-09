"use client";

import "./global.css";
import React, { useEffect, useRef, useState } from "react";
import { throttle } from "throttle-debounce";
import styles from "./page.module.css";
import PixelContext from "../components/Context";
import GameTexts from "../components/GameText/GameTexts";
import { ActiveItem, useAppStore, useCurrentCountry } from "./store";
import { CountryName, countryData } from "../components/countryData";
import { relativeRound, toMMSS } from "../util/math";
import { useDrag } from "../hooks/useDrag";
import { SoundName, useAudio } from "../hooks/useAudio";
import Frame from "../components/Frame/Frame";
import Monitor from "../components/Monitor/Monitor";
import Button from "../components/Button/Button";
import localFont from "next/font/local";

const dogica = localFont({
  src: "../../../public/fonts/dogica/dogicapixel.ttf",
  display: "block",
  variable: "--font-dogica",
});

export default function App() {
  const state = useAppStore((state) => state.state);
  const setState = useAppStore((state) => state.setState);
  const country = useAppStore((state) => state.currentCountry);
  const currentItems = useAppStore((state) => state.currentItems);

  function handleStart() {
    setState("IN_GAME");
  }

  return (
    <PixelContext pixelSize={2}>
      <main className={`${styles.main} ${dogica.className}`}>
        <Monitor>
          <div className={styles.grid}>
            <TravelMap />
            {state === "MAIN_MENU" && (
              <>
                <Frame
                  label="Notes"
                  position="starting-notes"
                  type="note"
                  index={2}
                >
                  <>
                    <p>NOTES TO SELF!</p>
                    <p>
                      Its finally time for my trip around the world, but before
                      I go I need to buy everything I need for the trip.
                    </p>
                    <p>PS: Dont leave everything for the last minute again</p>
                  </>
                </Frame>

                <Frame
                  label="List"
                  position="level-select-note"
                  type="note"
                  index={3}
                >
                  <>
                    <p>Buy before trip:</p>
                    <p>
                      - thing one
                      <br />
                      - thing two
                      <br />
                      - other thing
                      <br />
                      - listing
                      <br />
                      - all the things
                      <br />
                      - one more
                      <br />
                      - final thing
                      <br />
                    </p>
                    <Button onClick={handleStart}>Start shopping</Button>
                  </>
                </Frame>
              </>
            )}

            {state === "IN_GAME" && (
              <>
                {currentItems.map((item, i) => (
                  <ItemDisplayFrame
                    key={item.merchant}
                    item={item}
                    index={i + 1}
                  />
                ))}
                <Frame
                  label="How to play"
                  position="how-to-play"
                  type="note"
                  index={4}
                >
                  <>
                    <p>
                      Buy the cheapest option available. Some merchants only
                      sell in their local currency, so i&apos;ll need to convert
                      the price to USD to compare.
                    </p>
                  </>
                </Frame>

                <ConversionSlider
                  country={country!}
                  position="slider"
                  index={3}
                />

                <TimerFrame onTimeout={() => {}} index={5} />
              </>
            )}
          </div>
        </Monitor>
        <GameTexts />
      </main>
    </PixelContext>
  );
}

type ConversionWindowProps = {
  country: CountryName;
  position: string;
  index?: number;
};

function ConversionSlider({
  country,
  position,
  index = 0,
}: ConversionWindowProps) {
  const data = countryData.find((c) => c.name === country)!;
  const [usd, setUsd] = useState(1);

  return (
    <Frame label="currency-slider.com" position={position} index={index}>
      <div className={styles.conversionContainer}>
        <div className={styles.conversionPrice}>
          {data.currencySymbol}{" "}
          {relativeRound(data.conversionRateDefault * usd)} = ${usd}.00 USD
        </div>
        <ChaseSlider onChange={(v) => setUsd(v)} />
      </div>
    </Frame>
  );
}

type ChaseSliderProps = {
  step?: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

function ChaseSlider({
  step = 1,
  min = 0,
  max = 100,
  onChange,
}: ChaseSliderProps) {
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

type ItemDisplayFrameProps = {
  item: ActiveItem;
  index: number;
};

function ItemDisplayFrame({ item, index }: ItemDisplayFrameProps) {
  const currentCountry = useCurrentCountry()!;
  const evaluate = useAppStore((state) => state.evaluate);

  return (
    <Frame
      key={item.type}
      label={item.merchant}
      position={`item-${index}`}
      index={index}
    >
      <div className={styles.itemDisplay}>
        <div className={styles.itemDisplayContainer}>
          <div className={styles.itemDisplayImage} />
          <div className={styles.itemDisplayData}>
            <div>{item.type}</div>
            <div className={styles.itemDisplayPrice}>
              {item.converted
                ? `$${item.usdPrice.toFixed(2)}`
                : `${currentCountry!.currencySymbol} ${relativeRound(
                    item.usdPrice * currentCountry.conversionRateDefault
                  )}`}
            </div>
          </div>
        </div>
        <Button onClick={() => evaluate(item.merchant)}>Buy</Button>
      </div>
    </Frame>
  );
}

type TravelMapProps = {
  index?: number;
};

function TravelMap({ index = 0 }: TravelMapProps) {
  return (
    <Frame label="Travel map" position="map" index={index}>
      <div className={styles.travelMap}>
        <div className={styles.travelMapContainer}>
          <img
            className={styles.travelMapImage}
            src="/sprites/map.png"
            alt="Travel map"
          />
        </div>
      </div>
    </Frame>
  );
}

type TimerProps = {
  onTimeout: () => void;
  index?: number;
};

function TimerFrame({ onTimeout, index }: TimerProps) {
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
    <Frame label="Time until flight" position="timer" index={index}>
      <div className={styles.timerContainer}>
        {/* <progress
          className={styles.timerProgress}
          max={100}
          ref={progressRef}
          value={10}
        /> */}
        <div className={styles.timerNumberTop}>{toMMSS(seconds)}</div>
        <div className={styles.timerProgress} ref={progressRef}>
          <div className={styles.timerNumber}>{toMMSS(seconds)}</div>
        </div>
      </div>
    </Frame>
  );
}

// function ItemDisplay() {
//   const item = useAppStore((state) => state.currentItem);
//   const country = useCurrentCountry();
//   const isValid = item && country;

//   return (
//     isValid && (
//       <div className={styles.itemDisplay}>
//         <div className={styles.itemDisplayImage}></div>
//         <div className={styles.itemDisplayData}>
//           <div className={styles.itemDisplayText}>
//             {item.name} from {country.name}
//           </div>
//           <div className={styles.itemDisplayPrice}>
//             {item.converted ? (
//               <> $ USD {item.usdPrice} </>
//             ) : (
//               <>
//                 {country.currencySymbol}{" "}
//                 {relativeRound(item.usdPrice * country.conversionRateDefault)}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     )
//   );
// }

// function Score() {
//   const score = useAppStore((state) => state.score);
//   return <div>score : {score}</div>;
// }

// function Decider() {
//   const evaluate = useAppStore((state) => state.evaluate);
//   const losePoint = useAppStore((state) => state.losePoints);
//   const combo = useAppStore((state) => state.combo);
//   const startTimer = useAppStore((state) => state.startTimer);
//   const autoConvert = useAppStore((state) => state.autoConvert);
//   const converts = useAppStore((state) => state.converts);
//   const setPosition = useAppStore((state) => state.setPosition);
//   const convertButtonRef = useRef<HTMLButtonElement>(null);
//   const play = useAudio();

//   useEffect(() => {
//     function handleResize() {
//       if (convertButtonRef.current) {
//         const { width, height, left, top } =
//           convertButtonRef.current.getBoundingClientRect();
//         setPosition("convert", { x: width / 2 + left, y: height / 2 + top });
//       }
//     }

//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleBuy = useCallback(() => {
//     play("click");
//     evaluate();
//     startTimer();
//   }, [combo]);

//   const handleAutoConvert = useCallback(() => {
//     play("click");
//     autoConvert();
//   }, []);

//   const handleTimeout = () => {
//     losePoint(0);
//     startTimer();
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       startTimer();
//     }, 200);
//   }, []);

//   useEffect(() => {
//     function handleKey(e: globalThis.KeyboardEvent) {
//       if (e.key === "b") {
//         handleBuy();
//       }

//       if (e.key === "a") {
//         handleAutoConvert();
//       }
//     }
//     document.addEventListener("keydown", handleKey);
//     return () => document.removeEventListener("keydown", handleKey);
//   }, []);

//   return (
//     <div className={styles.deciderContainer}>
//       <Timer onTimeout={handleTimeout} />
//       <div className={styles.buttonContainer}>
//         <button className={styles.button} onClick={handleBuy}>
//           Buy
//         </button>
//         <button
//           className={styles.button}
//           onClick={handleAutoConvert}
//           ref={convertButtonRef}
//         >
//           Auto Convert
//           <br />[
//           {Array(3)
//             .fill(0)
//             .map((_, i) => (converts > i ? "+" : "_"))}
//           ]
//         </button>
//       </div>
//     </div>
//   );
// }
