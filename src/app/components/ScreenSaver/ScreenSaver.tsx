import { useEffect, useRef, useState } from "react";
import styles from "./ScreenSaver.module.css";
import { type Vector2 } from "@/types/Vector2";
import { useAppStore } from "@/app/store";
import { cancelFrame, frame } from "framer-motion";
import { usePixelSize } from "@/app/hooks/usePixelSize";
import useDeviceDetails from "@/app/hooks/useDeviceDetails";

export default function ScreenSaver() {
  const pixelSize = usePixelSize();
  const containerRef = useRef<HTMLDivElement>(null);
  const bouncerRef = useRef<HTMLDivElement>(null);
  const {isMobile} = useDeviceDetails();
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  const [bouncerRect, setBouncerRect] = useState<DOMRect | null>(null);
  const transitionState = useAppStore((state) => state.transitionState);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerRect(containerRef.current.getBoundingClientRect());
      }
      if (bouncerRef.current) {
        setBouncerRect(bouncerRef.current.getBoundingClientRect());
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef, bouncerRef]);

  useEffect(() => {
    let velocity: Vector2 = { x: 0.12, y: 0.1 };
    let position: Vector2 = { x: 20, y: 20 };

    const update = (data: any) => {
      if (!containerRect || !bouncerRect) return;
      position.x += velocity.x * data.delta;
      position.y += velocity.y * data.delta;

      if (position.x < 0) {
        position.x = 0;
        velocity.x *= -1;
      }

      if (position.x + bouncerRect.width > containerRect.width) {
        position.x = containerRect.width - bouncerRect.width;
        velocity.x *= -1;
      }

      if (position.y < 0) {
        position.y = 0;
        velocity.y *= -1;
      }

      if (position.y + bouncerRect.height > containerRect.height) {
        position.y = containerRect.height - bouncerRect.height;
        velocity.y *= -1;
      }
    };
    frame.update(update, true);

    const render = () => {
      if (!bouncerRef.current) return;
      bouncerRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
    };
    frame.render(render, true);

    return () => {
      cancelFrame(update);
      cancelFrame(render);
    };
  }, [containerRef, containerRect, bouncerRect, bouncerRef, pixelSize]);

  function handleClick() {
    transitionState("BOOT");
  }

  return (
    <div className={styles.container} ref={containerRef} onClick={handleClick}>
      <div className={styles.bouncer} ref={bouncerRef} />
      <div className={styles.text}> &gt; {isMobile ? "TAP" : "CLICK"} TO WAKE <span className={styles.blinker}></span></div>
    </div>
  );
}
