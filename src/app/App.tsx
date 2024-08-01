"use client";

import styles from "./page.module.css";
import React, { useEffect, useRef } from "react";
import { MotionConfig, clamp, motion, useMotionValue } from "framer-motion";
import { useAppStore } from "./store";
import { ScreenRefContext } from "./components/Context";
import { usePixelSize } from "./hooks/usePixelSize";
import type { Currencies } from "./providers/stripe";

import MainMenu from "./screens/MainMenu";
import ScoreScreen from "./screens/ScoreScreen";
import InGame from "./screens/InGame";
import Boot from "./screens/Boot";
import Splash from "./screens/Splash";
import SleepScreen from "./screens/Sleep";

import Monitor from "./components/Monitor/Monitor";
import Background from "./components/Background/Background";
import RoundEndFrame from "./components/RoundFinishFrame/RoundFinishFrame";
import StartFrame from "./components/StartFrame/StartFrame";
import Mute from "./components/Mute/Mute";
import ViewControl from "./components/ViewControl/ViewControl";
import PreviewMainMenu from "./screens/PreviewMainMenu";
import Keyboard from "./components/Keyboard/Keyboard";
import Books from "./components/Books/Books";
import { CountryData } from "./components/gameData";

type AppProps = {
  nonce: string;
  currencies: Currencies | null;
  localCurrency: string;
  countryData: CountryData[];
  isPreview?: boolean;
};

export default function App({ nonce, currencies, localCurrency, countryData, isPreview = false}: AppProps) {
  const state = useAppStore((state) => state.state);
  const setCurrencies = useAppStore((state) => state.setCurrencies);
  const setCountryData = useAppStore((state) => state.setCountryData);
  const ref = useRef<HTMLDivElement>(null);
  const pixelSize = usePixelSize();
  const pan = useMotionValue(0);
  const handlePan = (x: number) => {
    pan.set(clamp(-4000 * pixelSize, 4000 * pixelSize, x * -8));
  };

  useEffect(() => {
    setCountryData(countryData);
    setCurrencies(currencies, localCurrency);
  }, [currencies, setCurrencies, localCurrency, countryData]);

  return (
    <MotionConfig nonce={nonce}>
      <ScreenRefContext>
        <motion.main id="main" className={styles.main} ref={ref} style={{ x: pan }}>
          <Background />
          <Monitor>
            <div className={styles.grid}>
              {state === "SLEEP" && <SleepScreen key="sleep" />}
              {state === "BOOT" && <Boot key="boot" />}
              {state === "SPLASH" && <Splash key="splash" />}
              {state === "MAIN_MENU" && !isPreview && <MainMenu key="main-menu" />}
              {state === "MAIN_MENU" && isPreview && <PreviewMainMenu key="preview-menu" />}
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
          <Keyboard />
          <Books />
        </motion.main>
        <ViewControl onUpdate={handlePan} />
      </ScreenRefContext>
    </MotionConfig>
  );
}
