import styles from "./StartFrame.module.css";
import Frame from "@/app/components/Frame/Frame";
import { useEffect } from "react";
import { useAudio } from "@/app/hooks/useAudio";

export default function StartFrame() {
  const audio = useAudio();

  useEffect(() => {
    audio("start");
  }, [audio]);

  return (
    <Frame index={0} label="GET SHOPPING" position="game-start" allowDrag type="simple">
      <div className={styles.container}>
        <div className={styles.text}>
          START
        </div>
      </div>
    </Frame>
  );
}
