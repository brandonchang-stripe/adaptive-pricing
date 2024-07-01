import type { DragData } from "@/app/hooks/useDrag";
import { useCallback, useEffect, useRef } from "react";
import { useAppStore } from "@/app/store";
import styles from "./MapMarkers.module.css";
import { countryData } from "../../data";
import MapMarker from "../MapMarker/MapMarker";

export type Props = {
  children?: React.ReactNode;
  dragData: DragData;
};

export default function MapMarkers({ dragData }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const selectedCountry = useAppStore((state) => state.selectedCountry);
  const setSelectedCountry = useAppStore((state) => state.setSelectedCountry);

  useEffect(() => {
    if (!ref.current) return;
    let raf = requestAnimationFrame(tick);

    function tick() {
      ref.current!.style.transform = `translate(${dragData.offset.x}px, ${dragData.offset.y}px)`;
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [dragData, ref.current]);

  const handleClick = useCallback(
    (i: number) => {
      setSelectedCountry(i);
    },
    [setSelectedCountry]
  );

  return (
    <>
      <div ref={ref} className={styles.markers}>
        {countryData.map((country, i) => (
          <MapMarker
            key={country.name}
            countryData={country}
            selected={selectedCountry === i}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>
    </>
  );
}
