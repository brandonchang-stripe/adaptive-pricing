"use client";

import React from "react";
import styles from "./page.module.css";
import { PixelContext, ScreenRefContext } from "./components/Context";
import GameTexts from "./components/GameText/GameTexts";
import { useAppStore } from "./store";
import Monitor from "./components/Monitor/Monitor";
import localFont from "next/font/local";
import MainMenu from "./screens/MainMenu";
import ScoreScreen from "./screens/ScoreScreen";
import InGame from "./screens/InGame";
import GameFinish from "./screens/GameFinish";

export default function App() {
  const state = useAppStore((state) => state.state);

  return (
    <ScreenRefContext>
      <PixelContext pixelSize={2}>
        <main className={styles.main}>
          <Monitor>
            <div className={styles.grid}>
              {state === "MAIN_MENU" && <MainMenu />}
              {(state === "IN_GAME" || state === "GAME_FINISH") && <InGame />}
              {state === "GAME_FINISH" && <GameFinish />}
              {state === "SCORE_SCREEN" && <ScoreScreen />}
            </div>
          </Monitor>
          <GameTexts />
        </main>
      </PixelContext>
    </ScreenRefContext>
  );
}
