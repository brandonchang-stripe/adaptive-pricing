import styles from "./StartFrame.module.css";
import Frame from "@/app/components/Frame/Frame";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/app/hooks/useAudio";
import { useAppStore, useCurrentCountry, useIsLightningRound } from "@/app/store";
import { usePixelSize } from "@/app/hooks/usePixelSize";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { countryData } from "../gameData";
import { stepEase } from "@/app/util/stepEase";

export default function StartFrame() {
  const audio = useAudio();
  const country = useCurrentCountry();
  const countryIndex = useAppStore((state) => state.countryIndex);
  const isLightningRound = useIsLightningRound();
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
    if (isLightningRound) {
      audio("startLightning");
    } else {
      audio("start");
    }
    for (let i = 0; i < country.name.length; i++) {
      setTimeout(() => {
        audio("scroll");
      }, (500 / country.name.length) * i + 450);
    }

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
          {isLightningRound ? (
            <div>FINAL ROUND</div>
          ) : (
            <div>
              ROUND {countryIndex + 1} / {countryData.length}
            </div>
          )}
          <div className={styles.block} />
        </div>

        <div className={styles.textContainer}>
          <motion.div className={styles.text}>{string}</motion.div>
          {isLightningRound && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, zIndex: 2, transition: { delay: 1, ease: stepEase(3) } }}
            >
              <div className={styles.lightningtext}>
                <br />
                All prices are
                <br />
                now converted
              </div>
            </motion.div>
          )}
        </div>
        <div className={styles.footer}>
          <div className={styles.block} />
          <div>GET READY</div>
          <div className={styles.block} />
        </div>
      </div>
    </Frame>
  );
}
