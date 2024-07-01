"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { type DragData } from "@/app/hooks/useDrag";
import styles from "../MapCanvas/MapCanvas.module.css";
import { type PixelContextType, Context } from "../../Context";
import { useAppStore } from "@/app/store";

type Props = {
  dragData: DragData;
  children?: React.ReactNode;
};

export default function MapCanvas({ dragData }: Props) {
  const { pixelSize } = useContext<PixelContextType>(Context);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [canvasRef.current]);

  function onResize() {
    if (!canvasRef.current || !containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    canvasRef.current.width = width / pixelSize;
    canvasRef.current.height = height / pixelSize;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    (async () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.imageSmoothingEnabled = false;
      const img = await fetchImage("/earth.png");
      const ratio = img.width / img.height;

      requestAnimationFrame(tick);

      function tick() {
        if (!canvas || !ctx) return;
        const zoom = useAppStore.getState().zoom;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          img,
          dragData.offset.x / pixelSize,
          dragData.offset.y / pixelSize,
          Math.round(canvas.width * zoom),
          Math.round((canvas.width * zoom) / ratio)
        );
        requestAnimationFrame(tick);
      }
    })();
  }, [canvasRef.current]);

  async function fetchImage(src: string): Promise<HTMLImageElement> {
    const img = new Image();
    img.src = src;

    return new Promise((resolve) => {
      img.onload = () => {
        resolve(img);
      };
    });
  }

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </div>
  );
}
