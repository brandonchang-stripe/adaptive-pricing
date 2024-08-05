import styles from "./ViewControl.module.css";
import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useAudio } from "@/app/hooks/useAudio";

type ViewControlProps = {
  onUpdate: (x: number) => void;
};

export default function ViewControl({ onUpdate }: ViewControlProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const audio = useAudio();

  const handleUpdate = useCallback(
    (latest: { x: number }) => {
      onUpdate(latest.x);
    },
    [onUpdate]
  );

  function handleDragStart() {
    if (Howler.ctx.state !== "running") return;
    audio("dragStart");
  }

  function handleDragEnd() {
    if (Howler.ctx.state !== "running") return;
    audio("dragEnd");
  }

  return (
    <div className={styles.container} ref={containerRef} >
      <div className={styles.track} />
      <motion.img
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className={styles.control}
        dragConstraints={containerRef}
        dragTransition={{ bounceStiffness: 1500, bounceDamping: 50 }}
        dragListener={true}
        drag="x"
        dragSnapToOrigin
        dragElastic={0.1}
        onUpdate={handleUpdate}
        src="/sprites/view-control.png"
      />
    </div>
  );
}
