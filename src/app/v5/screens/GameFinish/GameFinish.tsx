import { useAppStore } from "@/app/v5/store";
import styles from "./GameFinish.module.css";
import Frame from "@/app/components/Frame/Frame";
import { useEffect } from "react";
import { useAudio } from "@/app/hooks/useAudio";

type Props = {
  delay?: number;
};

export default function GameFinish({ delay = 3000 }: Props) {
  const audio = useAudio();
  const setState = useAppStore((state) => state.setState);

  useEffect(() => {
    audio("finish", 0.5);
    const timeout = setTimeout(() => {
      setState("SCORE_SCREEN");
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [setState]);

  return (
    <>
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
    </>
  );
}
