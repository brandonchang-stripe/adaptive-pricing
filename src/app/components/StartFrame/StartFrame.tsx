import styles from "./StartFrame.module.css";
import Frame from "@/app/components/Frame/Frame";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/app/hooks/useAudio";
import { useAppStore, useCurrentCountry, useIsLightningRound } from "@/app/store";
import { usePixelSize } from "@/app/hooks/usePixelSize";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import useDeviceDetails from "@/app/hooks/useDeviceDetails";

export default function StartFrame() {
  const audio = useAudio();
  const country = useCurrentCountry();
  const countryIndex = useAppStore((state) => state.countryIndex);
  const countryData = useAppStore((state) => state.countryData);
  const { isMobile, height } = useDeviceDetails();
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
    const resizeImage = (image: HTMLImageElement) => {
      setMapSize({
        x: image.naturalWidth,
        y: image.naturalHeight,
      });
    }

    const handleLoad = (event: Event) => {
      resizeImage(event.target as HTMLImageElement);
    };

    if (mapRef.current) {
      if (mapRef.current.complete) {
        resizeImage(mapRef.current);
      } else {
        mapRef.current.addEventListener("load", handleLoad);
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.removeEventListener("load", handleLoad);
      }
    };
  }, [mapRef, isMobile, pixelSize, height]);

  useEffect(() => {
    audio("start");

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
            <div>
              ROUND {countryIndex + 1} / {countryData.length}
            </div>
          <div className={styles.block} />
        </div>

        <div className={styles.textContainer}>
          <motion.div className={styles.text}>{string}</motion.div>
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
