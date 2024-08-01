import styles from "./RoundFinishFrame.module.css";
import Frame from "../Frame/Frame";
import { useAppStore } from "@/app/store";
import { useEffect, useState } from "react";
import { useAudio } from "@/app/hooks/useAudio";

export default function RoundEndFrame() {
  const audio = useAudio();
  const countryIndex = useAppStore((state) => state.countryIndex);
  const countryData = useAppStore((state) => state.countryData);
  const [offset, setOffset] = useState(-1);
  const score = useAppStore((state) => state.score);

  useEffect(() => {
    setTimeout(() => {
      audio("check");
      setOffset(0);
    }, 1500);
  }, []);

  return (
    <Frame allowDrag label="ITINERARY" position="round-finish" index={1}>
      <div className={styles.container}>
        <div className={styles.title}>
          <img className={styles.icon} src="/sprites/round-complete.png" alt="Round Complete" />
        </div>

        <ul className={styles.list}>
          {countryData.map((country, index) => (
            <div key={country.name} className={styles.countryItem}>
              <div className={styles.checkbox}>
                [{index <= countryIndex + offset ? "X" : " "}] {country.name}
              </div>
              <div className={styles.divider}></div>
              <div className={styles.points}>{score[index] === -1 ? "N/A" : (score[index] * 100).toString() + " points"}</div>
            </div>
          ))}
        </ul>

        <div className={styles.mapContainer}>
          <img className={styles.map} src="/sprites/map.png" alt="" draggable={false} />
        </div>
      </div>
    </Frame>
  );
}
