import styles from "./RoundFinishFrame.module.css";
import Frame from "../Frame/Frame";
import { useAppStore } from "@/app/store";
import { countryData } from "../gameData";

export default function RoundEndFrame() {
  const countryIndex = useAppStore((state) => state.countryIndex);
  const score = useAppStore((state) => state.score);

  return (
    <Frame allowDrag label="ITINERARY" position="round-finish" index={1}>
      <div className={styles.container}>
        <div className={styles.title}>ROUND COMPLETE</div>

        <ul className={styles.list}>
          {countryData.map((country, index) => (
            <div key={country.name} className={styles.countryItem}>
              <div className={styles.checkbox}>
                [{index <= countryIndex ? "X" : " "}] {country.name}
              </div>
              <div className={styles.divider}></div>
              <div className={styles.miles}>{score[index] === -1 ? "N/A" : (score[index] * 100).toString()}</div>
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
