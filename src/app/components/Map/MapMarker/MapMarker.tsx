import { MouseEventHandler } from "react";
import { useAppStore } from "@/app/store";
import { CountryData } from "../../data";
import styles from "./MapMarker.module.css";

export type Props = {
  onClick?: MouseEventHandler<HTMLDivElement>;
  countryData: CountryData;
  selected: boolean;
};

export default function MapMarker({ countryData, selected, onClick }: Props) {
  const zoom = useAppStore((state) => state.zoom);

  return (
    <div onClick={onClick}>
      <img
        className={styles.marker}
        style={{
          transform: `translate(${countryData.position.x * zoom}px, ${
            countryData.position.y * zoom
          }px)`,
        }}
        draggable={false}
        src={selected ? "/marker-selected.png" : "/marker.png"}
      />
    </div>
  );
}
