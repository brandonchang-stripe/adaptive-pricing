"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { useAppStore } from "../store";
import { PixelContext } from "../components/Context";
import Panel from "../components/Panel";
import { Conversion } from "../components/Conversion";
import { ItemDisplay } from "../components/ItemDisplay";
import Budget from "../components/Budget";
import Decider from "../components/Decider";
import Score from "../components/Score";
import StartScreen from "../components/StartScreen";

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
              Use the Conversion tool to help you calculate if you should BUY
              the item in your budget, or SKIP if the item is over budget.
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
