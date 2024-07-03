"use client";

import React, { use, useEffect } from "react";
import styles from './page.module.css'
import { useAppStore } from "../store";
import PixelContext from "../components/Context";
import Panel from "../components/Panel";
import { Conversion } from "../components/Conversion";
import { ItemDisplay } from "../components/ItemDisplay";
import Budget from "../components/Budget";
import Decider from "../components/Decider";
import Score from "../components/Score";

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
            <Conversion includeSlider />
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
