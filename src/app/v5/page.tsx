"use client";

import React, { useEffect, useRef, useState } from "react";
import "./global.css";
import styles from "./page.module.css";
import PixelContext from "../components/Context";
import Window from "../components/Window/Window";
import GameTexts from "../components/GameText/GameTexts";
import { DotGothic16 } from "next/font/google";
import { ActiveItem, useAppStore, useCurrentCountry } from "./store";
import { CountryName, countryData } from "../components/countryData";
import { itemData } from "../components/itemTravelData";
import { relativeRound } from "../util/math";
import { useDrag } from "../hooks/useDrag";
import { SoundName, useAudio } from "../hooks/useAudio";
import { throttle } from "throttle-debounce";
import Frame from "../components/Frame/Frame";
import Monitor from "../components/Monitor/Monitor";
import Button from "../components/Button/Button";
import localFont from "next/font/local";
import { AnimatePresence, motion } from "framer-motion";
import { stepEase } from "../util/stepEase";

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
        <AnimatePresence>
          <Monitor>
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
              variants={{
                hidden: {
                  opacity: 0,
                  scaleY: 0,
                  transition: {
                    when: "beforeChildren",
                  },
                },
                visible: {
                  opacity: 1,
                  scaleY: 1,
                  transition: {
                    staggerChildren: 0.15,
                    when: "beforeChildren",
                  },
                },
              }}
              className={styles.grid}
            >
              <Frame label="Travel map" position="map"></Frame>
              <Frame label="Notes" position="starting-notes" type="note">
                <>
                  <p>NOTES TO SELF!</p>
                  <p>
                    Its finally time for my trip around the world, but before I
                    go I need to buy everything I need for the trip.
                  </p>
                  <p>PS: Dont leave everything for the last minute again</p>
                </>
              </Frame>

              <Frame label="List" position="level-select-note" type="note">
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
            </motion.div>
          </Monitor>
        </AnimatePresence>
        <GameTexts />
      </main>
    </PixelContext>
  );
}

type NotesWindowProps = {
  label: string;
  children?: JSX.Element;
};
function NotesWindow({ label, children }: NotesWindowProps) {
  return (
    <Window label={label}>
      <div className={styles.notesContents}>{children}</div>
    </Window>
  );
}

type CountrySelectWindowProps = {
  label: string;
};
function CountrySelectWindow({ label }: CountrySelectWindowProps) {
  const setCurrentCountry = useAppStore((state) => state.setCurrentCountry);

  return (
    <Window label={label} width={600} height={500}>
      <div className={styles.countryList}>
        {countryData.map((country) => (
          <button
            className={styles.countryItem}
            key={country.name}
            onClick={() => setCurrentCountry(country.name)}
          >
            {country.name}
          </button>
        ))}
      </div>
    </Window>
  );
}

function ItemListWindow() {
  const setState = useAppStore((state) => state.setState);
  const country = useAppStore((state) => state.currentCountry)!;
  const items = itemData[country]!;
  if (!items) return null;

  return (
    <Window label={`${country} travel list`}>
      <div className={styles.itemListContainer}>
        {items.map((item) => (
          <div key={item.type} className={styles.itemListItem}>
            <div className={styles.itemListType}>{item.type}</div>
          </div>
        ))}

        <button className={styles.button} onClick={() => setState("IN_GAME")}>
          START
        </button>
      </div>
    </Window>
  );
}

type ConversionWindowProps = {
  country: CountryName;
};

function ConversionWindowButtons({ country }: ConversionWindowProps) {
  const data = countryData.find((c) => c.name === country)!;
  const [usd, setUsd] = useState(1);

  function handleButtonClick(amount: number) {
    setUsd(Math.max(amount, 0));
  }

  return (
    <Window label="currencyconvert.com" height={160}>
      <div className={styles.conversionContainer}>
        <div className={styles.conversionCountry}>{country}</div>
        <div className={styles.conversionPrice}>
          {data.currencySymbol}{" "}
          {relativeRound(data.conversionRateDefault * usd)} = ${usd}.00 USD
        </div>
        <div>
          <button onClick={() => setUsd(1)}>$1</button>
          <button onClick={() => handleButtonClick(2)}>$2</button>
          <button onClick={() => handleButtonClick(10)}>$10</button>
          <button onClick={() => handleButtonClick(100)}>$100</button>
          <button onClick={() => handleButtonClick(1000)}>$1000</button>
        </div>
      </div>
    </Window>
  );
}

function ConversionWindowSlider({ country }: ConversionWindowProps) {
  const data = countryData.find((c) => c.name === country)!;
  const [usd, setUsd] = useState(1);

  return (
    <Window label="currencyconvert.com" height={160}>
      <div className={styles.conversionContainer}>
        <div className={styles.conversionPrice}>
          {data.currencySymbol}{" "}
          {relativeRound(data.conversionRateDefault * usd)} = ${usd}.00 USD
        </div>
        <ChaseSlider onChange={(v) => setUsd(v)} />
      </div>
    </Window>
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

type ItemPurchaseWindowProps = {
  item: ActiveItem;
};

function ItemPurchaseWindow({ item }: ItemPurchaseWindowProps) {
  const currentCountry = useCurrentCountry()!;
  const evaluate = useAppStore((state) => state.evaluate);

  return (
    <Window key={item.type} label={item.merchant}>
      <div className={styles.itemPurchaseContainer}>
        <div>{item.type}</div>
        <div className={styles.itemPrice}>
          {item.converted
            ? `$${item.usdPrice.toFixed(2)} USD`
            : `${currentCountry!.currencySymbol} ${relativeRound(
                item.usdPrice * currentCountry.conversionRateDefault
              )}`}
        </div>
        <br />
        <button
          className={styles.button}
          onClick={() => evaluate(item.merchant)}
        >
          Buy
        </button>
      </div>
    </Window>
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

// type TimerProps = {
//   onTimeout: () => void;
// };
// function Timer({ onTimeout }: TimerProps) {
//   const rafRef = useRef<number | null>(null);
//   const startTimeRef = useRef<number | null>(null);
//   const progressRef = useRef<HTMLProgressElement>(null);
//   const running = useAppStore((state) => state.isTimerRunning);
//   const duration = useAppStore((state) => state.timerDuration);

//   useEffect(() => {
//     function tick() {
//       const now = Date.now();
//       rafRef.current = requestAnimationFrame(tick);
//       if (startTimeRef.current !== null && duration > 0) {
//         const elapsed = now - startTimeRef.current;

//         if (progressRef.current) {
//           const value = 100 - (elapsed / duration) * 100;
//           progressRef.current.value = value;
//         }

//         if (elapsed >= duration) {
//           startTimeRef.current = null;
//           onTimeout();
//         }
//       }
//     }

//     rafRef.current = requestAnimationFrame(tick);
//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, [duration, onTimeout]);

//   useEffect(() => {
//     startTimeRef.current = running ? Date.now() : null;
//   }, [running]);

//   return (
//     <div className={styles.timerContainer}>
//       <progress className={styles.timerProgress} max={100} ref={progressRef} />
//     </div>
//   );
// }
