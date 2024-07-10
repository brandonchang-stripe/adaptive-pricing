import styles from "./InGame.module.css";

import Frame from "@/app/components/Frame/Frame";
import { ActiveItem, useAppStore, useCurrentCountry } from "../../store";
import { relativeRound, toMMSS } from "@/app/util/math";
import Button from "@/app/components/Button/Button";
import { CountryName, countryData } from "@/app/components/countryData";
import { useEffect, useRef, useState } from "react";
import { useDrag } from "@/app/hooks/useDrag";
import { SoundName, useAudio } from "@/app/hooks/useAudio";
import { throttle } from "throttle-debounce";
import TravelMap from "@/app/components/TravelMap/TravelMap";

export default function InGame() {
  const currentItems = useAppStore((state) => state.currentItems);
  const country = useAppStore((state) => state.currentCountry);
  const evaluate = useAppStore((state) => state.evaluate);

  return (
    <>
      <TravelMap key="travel-map" />

      {currentItems.map((item, i) => (
        <ItemDisplayFrame key={item.merchant} item={item} index={i + 1} />
      ))}

      <Frame
        allowDrag
        label="How to play"
        position="how-to-play"
        type="note"
        index={4}
        dismissible
      >
        <p>
          Buy the cheapest option available. Some merchants only sell in their
          local currency, so i&apos;ll need to convert the price to USD to
          compare.
        </p>
      </Frame>

      <ConversionSlider country={country!} position="slider" index={3} />
      <TimerFrame onTimeout={() => evaluate(false)} index={5} />
    </>
  );
}

type ItemDisplayFrameProps = {
  item: ActiveItem;
  index: number;
};

function ItemDisplayFrame({ item, index }: ItemDisplayFrameProps) {
  const currentCountry = useCurrentCountry()!;
  const evaluate = useAppStore((state) => state.evaluate);

  return (
    <Frame
      allowDrag
      key={item.type}
      label={item.merchant}
      position={`item-${index}`}
      index={index}
    >
      <div className={styles.itemDisplay}>
        <div className={styles.itemDisplayContainer}>
          <div className={styles.itemDisplayImage} />
          <div className={styles.itemDisplayData}>
            <div>{item.type}</div>
            <div className={styles.itemDisplayPrice}>
              {item.converted
                ? `$${item.usdPrice.toFixed(2)}`
                : `${currentCountry!.currencySymbol} ${relativeRound(
                    item.usdPrice * currentCountry.conversionRateDefault
                  )}`}
            </div>
          </div>
        </div>
        <Button onClick={() => evaluate(item.merchant)}>Buy</Button>
      </div>
    </Frame>
  );
}

type ConversionWindowProps = {
  country: CountryName;
  position: string;
  index?: number;
};

function ConversionSlider({
  country,
  position,
  index = 0,
}: ConversionWindowProps) {
  const data = countryData.find((c) => c.name === country)!;
  const [usd, setUsd] = useState(1);

  return (
    <Frame label="currency-slider.com" position={position} index={index}>
      <div className={styles.conversionContainer}>
        <div className={styles.conversionPrice}>
          {data.currencySymbol}{" "}
          {relativeRound(data.conversionRateDefault * usd)} = ${usd}.00 USD
        </div>
        <ChaseSlider onChange={(v) => setUsd(v)} />
      </div>
    </Frame>
  );
}

type ChaseSliderProps = {
  step?: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

function ChaseSlider({
  step = 1,
  min = 0,
  max = 100,
  onChange,
}: ChaseSliderProps) {
  const notchWidth = 10;
  const count = Math.floor((max - min) / step);
  const [dragRef, dragData] = useDrag<HTMLDivElement>({
    minX: count * -notchWidth,
    maxX: 0,
    damp: 0.98,
  });
  const rafRef = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const lastVal = useRef(0);
  const arr = Array(count + 1).fill(0);
  const play = useAudio();
  const setPosition = useAppStore((state) => state.setPosition);
  const throttleFunc = useRef(
    throttle(60, (sound: SoundName, rate: number) => {
      play(sound, rate);
    })
  ).current;

  useEffect(() => {
    function handleResize() {
      if (indicatorRef.current) {
        const { width, height, left, top } =
          indicatorRef.current.getBoundingClientRect();
        setPosition("indicator", { x: width / 2 + left, y: height / 2 + top });
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function tick() {
      const { offset, lastOffset } = dragData;
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(${offset.x}px)`;
      }

      const val = Math.round(-offset.x / notchWidth);
      if (val !== lastVal.current) {
        const rate = Math.abs(offset.x - lastOffset.x) * 0.005 + 0.9;
        throttleFunc("tick", rate);
        onChange(val);
      }
      lastVal.current = val;

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [sliderRef, rafRef, dragData]);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderWrapper} ref={dragRef}>
        <div className={styles.sliderControl} ref={sliderRef}>
          {arr.map((_, i) => {
            return <div className={styles.sliderNotch} key={i} />;
          })}
        </div>
        <div className={styles.sliderIndicator} ref={indicatorRef}></div>
      </div>
    </div>
  );
}

type TimerProps = {
  onTimeout: () => void;
  index?: number;
};

function TimerFrame({ onTimeout, index }: TimerProps) {
  const [seconds, setSeconds] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const running = useAppStore((state) => state.isTimerRunning);
  const duration = useAppStore((state) => state.timerDuration);

  useEffect(() => {
    function tick() {
      const now = Date.now();
      rafRef.current = requestAnimationFrame(tick);
      if (startTimeRef.current !== null && duration > 0) {
        const elapsed = now - startTimeRef.current;

        if (progressRef.current) {
          const value = 100 - (elapsed / duration) * 100;
          const timeInSeconds = Math.ceil((duration - elapsed) / 1000);
          if (seconds !== timeInSeconds) {
            progressRef.current.style.width = `${value}%`;
            setSeconds(timeInSeconds);
          }
        }

        if (elapsed >= duration) {
          startTimeRef.current = null;
          if (progressRef.current) {
            progressRef.current.style.width = `0%`;
          }
          setSeconds(0);
          onTimeout();
        }
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, onTimeout, seconds]);

  useEffect(() => {
    startTimeRef.current = running ? Date.now() : null;
  }, [running]);

  return (
    <Frame
      allowDrag
      label="Time left to purchase"
      position="timer"
      index={index}
    >
      <div className={styles.timerContainer}>
        <div className={styles.timerNumberTop}>{toMMSS(seconds)}</div>
        <div className={styles.timerProgress} ref={progressRef}>
          <div className={styles.timerNumber}>{toMMSS(seconds)}</div>
        </div>
      </div>
    </Frame>
  );
}
