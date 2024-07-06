"use client";

import React, { useEffect } from "react";
import PixelContext from "./components/Context";
import Panel from "./components/Panel";
import styles from "./page.module.css";
import { Conversion } from "./components/Conversion";
import { useAppStore } from "./store";
import { ItemDisplay } from "./components/ItemDisplay";
import Budget from "./components/Budget";
import Decider from "./components/Decider";
import Score from "./components/Score";

export default function Home() {
  const chooseRandomItem = useAppStore(store => store.chooseRandomItem);

  useEffect(() => {
    chooseRandomItem();
  }, [chooseRandomItem])

  return (
    <PixelContext>
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
    </PixelContext>
  );
}
