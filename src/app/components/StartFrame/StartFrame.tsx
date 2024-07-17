import styles from "./StartFrame.module.css";
import Frame from "@/app/components/Frame/Frame";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/app/hooks/useAudio";
import { useCurrentCountry } from "@/app/store";
import { usePixelSize } from "@/app/hooks/usePixelSize";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

export default function StartFrame() {
  const audio = useAudio();
  const country = useCurrentCountry();
  const mapRef = useRef<HTMLImageElement>(null);
  const [mapSize, setMapSize] = useState({ x: 0, y: 0 });
  const pixelSize = usePixelSize();
  const stringIndex = useMotionValue(-1);
  const string = useTransform(stringIndex, (v) => {
    const index = Math.round(v);
    return country.name
      .split("")
      .map((char, i) => (i <= index ? char : "+"))
      .join("");
  });

  useEffect(() => {
    const handleLoad = (event: Event) => {
      const target = event.target as HTMLImageElement;
      setMapSize({
        x: target.naturalWidth,
        y: target.naturalHeight,
      });
    };

    if (mapRef.current) {
      if (mapRef.current.complete) {
        setMapSize({
          x: mapRef.current.naturalWidth,
          y: mapRef.current.naturalHeight,
        });
      } else {
        mapRef.current.addEventListener("load", handleLoad);
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.removeEventListener("load", handleLoad);
      }
    };
  }, [mapRef]);

  useEffect(() => {
    audio("start");
    animate(stringIndex, country.name.length, { duration: 0.5, delay: 0.5 });
  }, [audio]);

  return (
    <Frame index={0} label="" position="game-start" allowDrag type="simple">
      <div className={styles.container}>
        <img
          className={styles.map}
          ref={mapRef}
          width={mapSize.x * pixelSize}
          height={mapSize.y * pixelSize}
          src={`/sprites/maps/${country.name.replaceAll(" ", "").toLowerCase()}.png`}
          alt=""
          draggable={false}
        />
        <div className={styles.header}>
          <div className={styles.block} />
          <div>NEXT ROUND</div>
          <div className={styles.block} />
        </div>
        <motion.div className={styles.text}>{string}</motion.div>
        <div className={styles.footer}>
          <div className={styles.block} />
          <div>GET READY</div>
          <div className={styles.block} />
        </div>
      </div>
    </Frame>
  );
}
