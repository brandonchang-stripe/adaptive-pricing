"use client";

import React, { ChangeEventHandler, useCallback, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { useAppStore, useCurrentCountry } from "../store";
import PixelContext from "../components/Context";
import Panel from "../components/Panel";
import { ItemDisplay } from "../components/ItemDisplay";
import Budget from "../components/Budget";
import Decider from "../components/Decider";
import Score from "../components/Score";
import StartScreen from "../components/StartScreen";
import { relativeRound } from "../util/math";
import { useDrag } from "../hooks/useDrag";

export default function Home() {
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
              Use the Conversion tool Slider to find the price of the goods in
              USD, then decide to BUY if the item is in your budget, or SKIP if
              the item is over budget.
            </p>
            <p>You only have a few seconds to make a choice, choose wisely.</p>
          </>
        </StartScreen>
      ) : (
        <main className={styles.main}>
          <div className={styles.grid}>
            <Panel gridName="covn" label="Conversion">
              <Conversion />
            </Panel>
            <Panel gridName="item" label="Item">
              <ItemDisplay />
            </Panel>
            <Panel gridName="budt" label="Budget">
              <Budget />
            </Panel>
            <Panel gridName="butn" label="Buttons">
              <Decider />
            </Panel>
            <Panel gridName="scor" label="Score">
              <Score />
            </Panel>
          </div>
        </main>
      )}
    </PixelContext>
  );
}

function Conversion() {
  const country = useCurrentCountry();
  const [rate, setRate] = useState(1.0);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setRate(parseFloat(e.target.value));
    },
    [setRate]
  );

  return (
    <div className={styles.conversionContainer}>
      {country && (
        <div className={`${styles.price} price`}>
          {country.currencySymbol}{" "}
          {relativeRound(country.conversionRateDefault * rate)} = $USD {rate}
        </div>
      )}
      <ChaseSlider onChange={handleChange} value={rate} step={0.1} />
    </div>
  );
}

export type ChaseSliderProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: number;
  step?: number;
  min?: number;
  max?: number;
};

function ChaseSlider({
  value,
  onChange,
  step = 0.5,
  min = 0,
  max = 100,
}: ChaseSliderProps) {
  const count = Math.floor((max - min) / step);
  const [dragRef, dragData] = useDrag<HTMLDivElement>({
    momentum: 1.0
  });
  const rafRef = useRef<number|null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function tick() {
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(${dragData.offset.x}px)`;
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [sliderRef, rafRef, dragData])

  const arr = Array(count).fill(0);
  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderWrapper} ref={dragRef}>
        <div className={styles.sliderControl} ref={sliderRef}>
          {arr.map((_, i) => {
            return <div className={styles.sliderNotch} key={i} />;
          })}
        </div>
        <div className={styles.sliderIndicator}></div>
      </div>
    </div>
  );
}
