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
import RoundEndFrame from "./components/RoundFinishFrame/RoundFinishFrame";
import StartFrame from "./components/StartFrame/StartFrame";
import SleepScreen from "./screens/Sleep";
import Boot from "./screens/Boot";
import Splash from "./screens/Splash";

type AppProps = {
  nonce: string;
};

export default function App({ nonce }: AppProps) {
  const state = useAppStore((state) => state.state);

  return (
    <MotionConfig nonce={nonce}>
      <ScreenRefContext>
        <main id="main" className={styles.main}>
          <Background />
          <Monitor>
            <div className={styles.grid}>
              {state !== "SLEEP" && state !== "BOOT" && state !== "SPLASH" && <TravelMap key="travel-map" />}
              {state === "SLEEP" && <SleepScreen key="sleep" />}
              {state === "BOOT" && <Boot key="boot" />}
              {state === "SPLASH" && <Splash key="splash" />}
              {state === "MAIN_MENU" && <MainMenu key="main-menu" />}
              {(state === "GAME_PLAY" ||
                state === "GAME_FINISH" ||
                state === "TUTORIAL" ||
                state === "GAME_START" ||
                state === "ROUND_FINISH") && <InGame key="in-game" />}
              {state === "GAME_START" && <StartFrame key="start" />}
              {state === "ROUND_FINISH" && <RoundEndFrame key="round" />}
              {state === "GAME_FINISH" && <GameFinish key="game-finish" />}
              {state === "SCORE_SCREEN" && <ScoreScreen key="score-screen" />}
            </div>
          </Monitor>
          <GameTexts />
        </main>
      </ScreenRefContext>
    </MotionConfig>
  );
}
