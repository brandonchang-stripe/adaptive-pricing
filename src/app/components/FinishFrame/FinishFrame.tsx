import styles from "./FinishFrame.module.css";
import Frame from "@/app/components/Frame/Frame";
import { useEffect } from "react";
import { useAudio } from "@/app/hooks/useAudio";

export default function FinishFrame() {
  const audio = useAudio();

  useEffect(() => {
    audio("finish", 0.5);
  }, [audio]);

  return (
    <Frame index={0} label="Done purchasing" position="game-finish" allowDrag>
      <div className={styles.finishContainer}>
        <div className={styles.finishText}>
          <pre>
            {`
    ____   ____   _   __ ______ __
   / __ \\ / __ \\ / | / // ____// /
  / / / // / / //  |/ // __/  / / 
 / /_/ // /_/ // /|  // /___ /_/  
/_____/ \\____//_/ |_//_____/(_)   
`}
          </pre>
        </div>
      </div>
    </Frame>
  );
}
