"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import PixelContext from "../components/Context";
import Window from "../components/Window/Window";
import GameTexts from "../components/GameText/GameTexts";
import { DotGothic16 } from "next/font/google";
import { ActiveItem, useAppStore, useCurrentCountry } from "./store";
import { CountryName, countryData } from "../components/countryData";
import { itemData } from "../components/itemTravelData";
import { relativeRound } from "../util/math";
import { SoundName, useAudio } from "../hooks/useAudio";
import { throttle } from "throttle-debounce";
import { useDrag } from "../hooks/useDrag";
import { on } from "events";

const dotGothic = DotGothic16({
  subsets: ["latin", "latin-ext"],
  display: "block",
  weight: "400",
  variable: "--font-dot-gothic",
});

export default function App() {
  const state = useAppStore((state) => state.state);
  const country = useAppStore((state) => state.currentCountry);
  const currentItems = useAppStore((state) => state.currentItems);

  return (
    <PixelContext>
      <main className={`${styles.main} ${dotGothic.className}`}>
        {(state === "MAIN_MENU" || state === "ITEM_LIST") && (
          <>
            <CountrySelectWindow label="Worldtour list" />
            <NotesWindow label="Notes">
              <>
                <p>NOTES TO SELF!</p>
                <p>
                  Im going on a trip around the world, but before I go I need to
                  buy everything I need for the trip.
                </p>
                <p>PS: Dont leave everything for the last minute again</p>
              </>
            </NotesWindow>
          </>
        )}

        {state === "ITEM_LIST" && <ItemListWindow />}
        {country && <ConversionWindow country={country} />}
        {state === "IN_GAME" && (
          <>
            {currentItems.map((item) => (
              <ItemPurchaseWindow key={item.merchant} item={item} />
            ))}
          </>
        )}

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

export function ItemListWindow() {
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

function ConversionWindow({ country }: ConversionWindowProps) {
  const data = countryData.find((c) => c.name === country)!;
  const [usd, setUsd] = useState(1);

  function handleButtonClick(amount: number) {
    setUsd(Math.max(usd + amount, 1));
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
          <button onClick={() => handleButtonClick(-1000)}>-1000</button>
          <button onClick={() => handleButtonClick(-100)}>-100</button>
          <button onClick={() => handleButtonClick(-10)}>-10</button>
          <button onClick={() => handleButtonClick(-5)}>-5</button>

          <button onClick={() => setUsd(1)}>$1</button>

          <button onClick={() => handleButtonClick(5)}>+5</button>
          <button onClick={() => handleButtonClick(10)}>+10</button>
          <button onClick={() => handleButtonClick(100)}>+100</button>
          <button onClick={() => handleButtonClick(1000)}>+1000</button>
        </div>
      </div>
    </Window>
  );
}

type ItemPurchaseWindowProps = {
  item: ActiveItem;
};

export function ItemPurchaseWindow({ item }: ItemPurchaseWindowProps) {
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
