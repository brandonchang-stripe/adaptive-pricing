"use client";

import "./global.css";
import React from "react";
import styles from "./page.module.css";
import { PixelContext, ScreenRefContext } from "../components/Context";
import GameTexts from "../components/GameText/GameTexts";
import { useAppStore } from "./store";
import Frame from "../components/Frame/Frame";
import Monitor from "../components/Monitor/Monitor";
import localFont from "next/font/local";
import MainMenu from "./screens/MainMenu/MainMenu";
import ScoreScreen from "./screens/ScoreScreen/ScoreScreen";
import InGame from "./screens/InGame/InGame";

const dogica = localFont({
  src: "../../../public/fonts/dogica/dogicapixel.ttf",
  display: "block",
  variable: "--font-dogica",
});

export default function App() {
  const state = useAppStore((state) => state.state);

  return (
    <ScreenRefContext>
      <PixelContext pixelSize={2}>
        <main className={`${styles.main} ${dogica.className}`}>
          <Monitor>
            <div className={styles.grid}>
              <TravelMap key="travel-map" />
              {state === "MAIN_MENU" && <MainMenu />}
              {state === "IN_GAME" && <InGame />}
              {state === "SCORE_SCREEN" && <ScoreScreen />}
            </div>
          </Monitor>
          <GameTexts />
        </main>
      </PixelContext>
    </ScreenRefContext>
  );
}

type TravelMapProps = {
  index?: number;
};

function TravelMap({ index = 0 }: TravelMapProps) {
  return (
    <Frame allowDrag label="Travel map" position="map" index={index}>
      <div className={styles.travelMap}>
        <div className={styles.travelMapContainer}>
          <img
            draggable={false}
            className={styles.travelMapImage}
            src="/sprites/map.png"
            alt="Travel map"
          />
        </div>
      </div>
    </Frame>
  );
}
