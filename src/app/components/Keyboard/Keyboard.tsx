import styles from "./Keyboard.module.css"
import { useAudio } from "@/app/hooks/useAudio"
import { useAppStore } from "@/app/store";
import { randiRange } from "@/app/util/math";

export default function Keyboard() {
  const audio = useAudio();
  const gameState = useAppStore((state) => state.state);
  const transitionState = useAppStore((state) => state.transitionState);

  const handleKeyDown = () => { 
    if (randiRange(0, 1) === 0) {
      audio("key1");
    } else {
      audio("key2");
    }
    // if (gameState === "SLEEP") { 
    //   transitionState("BOOT");
    // }
  }

  return (
    <div className={styles.board}>
      <div className={styles.keyContainer}>
        <div className={styles.row}>
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.key2} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.key4} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyMed} onPointerDown={handleKeyDown} />
          <div className="spacer" />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className="spacer" />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
        </div>

        <div className={styles.row}>
          <div className={styles.keyMed} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className="spacer" />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className="spacer" />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
        </div>

        <div className={styles.row}>
          <div className={styles.keyTab} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyNub} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyNub} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyReturn} onPointerDown={handleKeyDown} />
          <div className="spacer" />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
        </div>

        <div className={styles.row}>
          <div className={styles.keyLShift} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyRShift} onPointerDown={handleKeyDown} />
          <div className="spacer" />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className="spacer" />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
        </div>

        <div className={styles.row}>
          <div className={styles.keyMed} onPointerDown={handleKeyDown} />
          <div className="spacer" />
          <div className={styles.keyMed} onPointerDown={handleKeyDown} />
          <div className={styles.keySpace} onPointerDown={handleKeyDown} />
          <div className={styles.keyMed} onPointerDown={handleKeyDown} />
          <div className="spacer" />
          <div className={styles.keyMed} onPointerDown={handleKeyDown} />
          <div className="spacer" />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className="spacer" />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
          <div className={styles.keyBlank} onPointerDown={handleKeyDown} />
        </div>
      </div>
    </div>
  )
}