"use client";

import React from "react";
import styles from "./page.module.css";
import { useAppStore } from "./store";
import { ScreenRefContext } from "./components/Context";
import MainMenu from "./screens/MainMenu";
import ScoreScreen from "./screens/ScoreScreen";
import InGame from "./screens/InGame";
import GameFinish from "./screens/GameFinish";
import GameTexts from "./components/GameText/GameTexts";
import Monitor from "./components/Monitor/Monitor";
import { AnimatePresence, MotionConfig } from "framer-motion";
import TravelMap from "./components/TravelMap/TravelMap";
import Background from "./components/Background/Background";
import Keyboard from "./components/Keyboard/Keyboard";

type AppProps = {
  nonce: string;
};

export default function App({ nonce }: AppProps) {
  const state = useAppStore((state) => state.state);

  return (
    <MotionConfig nonce={nonce}>
      <ScreenRefContext>
        <main className={styles.main}>
          <Background />
          <Monitor>
            <div className={styles.grid}>
              <AnimatePresence>
                <TravelMap key="travel-map" />
                {state === "MAIN_MENU" && <MainMenu key="main-menu" />}
                {(state === "GAME_PLAY" || state === "GAME_FINISH" || state === "GAME_PAUSED") && (
                  <InGame key="in-game" />
                )}
                {state === "GAME_FINISH" && <GameFinish key="game-finish" />}
                {state === "SCORE_SCREEN" && <ScoreScreen key="score-screen" />}
              </AnimatePresence>
            </div>
          </Monitor>
          <Keyboard />
          <GameTexts />
        </main>
      </ScreenRefContext>
    </MotionConfig>
  );
}
