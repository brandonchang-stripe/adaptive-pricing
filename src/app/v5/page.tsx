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
  src: [
    {
      path: "../../../public/fonts/dogica/dogicapixel.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/dogica/dogicapixel.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/dogica/dogicapixelbold.woff2",
      weight: "800",
      style: "bold",
    },
    {
      path: "../../../public/fonts/dogica/dogicapixelbold.ttf",
      weight: "800",
      style: "bold",
    },
    {
      path: "../../../public/fonts/dogica/dogicapixelbold.otf",
      weight: "800",
      style: "bold",
    },
  ],
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
