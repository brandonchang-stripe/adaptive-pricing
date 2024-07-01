import { useDrag } from "@/app/hooks/useDrag";
import styles from "./index.module.css";
import MapBorder from "./MapBorder/MapBorder";
import MapCanvas from "./MapCanvas/MapCanvas";
import MapContainer from "./MapContainer/MapContainer";
import MapMarkers from "./MapMarkers/MapMarkers";
import { useCallback, useEffect } from "react";
import { useAppStore } from "@/app/store";

export default function Map() {
  const [ref, dragData] = useDrag<HTMLDivElement>();
  const zoom = useAppStore((state) => state.zoom);
  const zoomIn = useAppStore((state) => state.zoomIn);
  const zoomOut = useAppStore((state) => state.zoomOut);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("wheel", onWheel);
    }
    return () => {
      ref.current?.removeEventListener("wheel", onWheel);
    };
  }, [ref.current]);

  const onWheel = useCallback(
    (e: WheelEvent) => {
      if (e.deltaY > 0) {
        zoomOut();
      } else if (e.deltaY < 0) {
        zoomIn();
      }
    },
    [zoom]
  );

  return (
    <div className={styles.container}>
      <MapBorder />
      <MapContainer mapRef={ref}>
        <MapCanvas dragData={dragData} />
        <MapMarkers dragData={dragData} />
      </MapContainer>
    </div>
  );
}
