import styles from "./Keyboard.module.css";
import { stopAll, useAudio } from "@/app/hooks/useAudio";
import { useAppStore } from "@/app/store";
import { randiRange } from "@/app/util/math";
import { useEffect, useState } from "react";

export default function Keyboard() {
  const audio = useAudio();
  const [typed, setTyped] = useState("");
  const gameState = useAppStore((state) => state.state);
  const transitionState = useAppStore((state) => state.transitionState);

  const keySound = () => {
    if (randiRange(0, 1) === 0) {
      audio("key1");
    } else {
      audio("key2");
    }
  };

  const handleKeyDown = (key?: string) => {
    // Keep the last 12 characters
    if (key) {
      setTyped((state) => (state + key).slice(-12));
    }
    keySound();
  };

  const handleReturnDown = () => {
    keySound();
    if (gameState === "SLEEP") {
      transitionState("BOOT");
    }
  };

  const handleEscDown = () => {
    keySound();
    if (gameState !== "SLEEP") {
      stopAll();
      transitionState("SLEEP");
      audio("shutdown");
    }
  };

  useEffect(() => {
    if (
      typed.slice(-4) === "4242" ||
      typed.slice(-4) === "1337" ||
      typed.slice(-4) === "0451" ||
      typed.slice(-10) === "uuddlrlrba" ||
      typed.slice(-3) === "420"
    ) {
      audio("startLightning");
      setTyped("");
    }
  }, [typed]);

  return (
    <div className={styles.board}>
      <div className={styles.keyContainer}>
        <div className={styles.row}>
          <div className={styles.keyBlank} onPointerDown={handleEscDown} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("1")} />
          <div className={styles.key2} onPointerDown={() => handleKeyDown("2")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("3")} />
          <div className={styles.key4} onPointerDown={() => handleKeyDown("4")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("5")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("6")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("7")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("8")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("9")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("0")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("-")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("=")} />
          <div className={styles.keyMed} onPointerDown={() => handleKeyDown()} />
          <div className="spacer" />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className="spacer" />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("/")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("*")} />
        </div>

        <div className={styles.row}>
          <div className={styles.keyMed} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("q")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("w")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("e")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("r")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("t")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("y")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("u")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("i")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("o")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("p")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("[")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("]")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("\\")} />
          <div className="spacer" />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className="spacer" />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("7")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("8")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("9")} />
        </div>

        <div className={styles.row}>
          <div className={styles.keyTab} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("a")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("s")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("d")} />
          <div className={styles.keyNub} onPointerDown={() => handleKeyDown("f")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("g")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("h")} />
          <div className={styles.keyNub} onPointerDown={() => handleKeyDown("j")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("k")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("l")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("m")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown(";")} />
          <div className={styles.keyReturn} onPointerDown={handleReturnDown} />
          <div className="spacer" />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("4")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("5")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("6")} />
        </div>

        <div className={styles.row}>
          <div className={styles.keyLShift} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyRShift} onPointerDown={() => handleKeyDown()} />
          <div className="spacer" />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className="spacer" />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("1")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("2")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("3")} />
        </div>

        <div className={styles.row}>
          <div className={styles.keyMed} onPointerDown={() => handleKeyDown()} />
          <div className="spacer" />
          <div className={styles.keyMed} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keySpace} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyMed} onPointerDown={() => handleKeyDown()} />
          <div className="spacer" />
          <div className={styles.keyMed} onPointerDown={() => handleKeyDown()} />
          <div className="spacer" />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className="spacer" />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown("0")} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
          <div className={styles.keyBlank} onPointerDown={() => handleKeyDown()} />
        </div>
      </div>
    </div>
  );
}
