import styles from "./StartFrame.module.css";
import Frame from "@/app/components/Frame/Frame";
import { useEffect } from "react";
import { useAudio } from "@/app/hooks/useAudio";
import { useCurrentCountry } from "@/app/store";

export default function StartFrame() {
  const audio = useAudio();
  const country = useCurrentCountry();

  useEffect(() => {
    audio("start");
  }, [audio]);

  return (
    <Frame index={0} label="" position="game-start" allowDrag type="simple">
      <div className={styles.container}>
        <div className={styles.text}>
          {country.name}<br/>
          START
        </div>
      </div>
    </Frame>
  );
}
