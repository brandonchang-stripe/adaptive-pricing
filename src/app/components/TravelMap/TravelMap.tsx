import styles from "./TravelMap.module.css";
import Frame from "../Frame/Frame";

type TravelMapProps = {
  index?: number;
};

export default function TravelMap({ index = 0 }: TravelMapProps) {
  return (
    <Frame allowDrag label="Travel map" position="map" index={index}>
      <div className={styles.travelMap}>
        <div className={styles.travelMapContainer}>
          <img
            draggable={false}
            className={styles.travelMapImage}
            src="/sprites/map.png"
            alt="Travel map"
          />
        </div>
      </div>
    </Frame>
  );
}
