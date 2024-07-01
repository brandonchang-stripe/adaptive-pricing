"use client";

import React, { use } from "react";
import PixelContext from "./components/Context";
import Map from "./components/Map";
import Panel from "./components/Panel";
import styles from "./page.module.css";
import Slider from "./components/Slider";
import usePriceUpdater from "./usePriceUpdater";

export default function Home() {
  usePriceUpdater({ purchaseRate: 2000, changeRate: 0.1, tickRate: 1000 });

  return (
    <PixelContext>
      <main className={styles.main}>
        <div className={styles.grid}>
          <Panel gridName="sta" label="Conversion">
            <Slider />
          </Panel>
          <Panel gridName="fee" label="Feed"></Panel>
          <Panel gridName="map" label="World Map">
            <Map />
          </Panel>
          <Panel gridName="rev" label="Revenue"></Panel>
        </div>
      </main>
    </PixelContext>
  );
}
