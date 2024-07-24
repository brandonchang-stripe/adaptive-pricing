"use client";

import React, { useRef } from "react";
import styles from "./page.module.css";
import { useAppStore } from "./store";
import { ScreenRefContext } from "./components/Context";
import MainMenu from "./screens/MainMenu";
import ScoreScreen from "./screens/ScoreScreen";
import InGame from "./screens/InGame";
import Monitor from "./components/Monitor/Monitor";
import { MotionConfig, motion, useMotionValue } from "framer-motion";
import Background from "./components/Background/Background";
import RoundEndFrame from "./components/RoundFinishFrame/RoundFinishFrame";
import StartFrame from "./components/StartFrame/StartFrame";
import SleepScreen from "./screens/Sleep";
import Boot from "./screens/Boot";
import Splash from "./screens/Splash";
import Wallpaper from "./components/Wallpaper/Wallpaper";
import Mute from "./components/Mute/Mute";
import ViewControl from "./components/ViewControl/ViewControl";

type AppProps = {
  nonce: string;
};

export default function App({ nonce }: AppProps) {
  const state = useAppStore((state) => state.state);
  const ref = useRef<HTMLDivElement>(null);
  const pan = useMotionValue(0);
  const handlePan = (x: number) => {
    pan.set(x * -8);
  }

  return (
    <MotionConfig nonce={nonce}>
      <ScreenRefContext>
        <motion.main id="main" className={styles.main} ref={ref} style={{x: pan}}>
          <Background />
          <Monitor>
            <div className={styles.grid}>
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
              {state === "SCORE_SCREEN" && <ScoreScreen key="score-screen" />}
              <Mute />
            </div>
          </Monitor>
        </motion.main>
        <ViewControl onUpdate={handlePan} />
      </ScreenRefContext>
    </MotionConfig>
  );
}
