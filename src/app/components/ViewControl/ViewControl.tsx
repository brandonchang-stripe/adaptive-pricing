import { motion } from "framer-motion";
import styles from "./ViewControl.module.css";
import { useCallback, useRef } from "react";
import { useAudio } from "@/app/hooks/useAudio";

type ViewControlProps = {
  onUpdate: (x: number) => void;
};

export default function ViewControl({ onUpdate }: ViewControlProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const audio = useAudio();

  const handleUpdate = useCallback((latest: { x: number }) => {
    onUpdate(latest.x);
  }, [onUpdate]);

  function handleDragStart() {
    audio("dragStart");
  }

  function handleDragEnd() {
    audio("dragEnd");
  }

  return (
    <motion.div className={styles.container} ref={containerRef}>
      <motion.div
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.1 }}
        className={styles.control}
        dragConstraints={containerRef}
        dragTransition={{ bounceStiffness: 1500, bounceDamping: 50 }}
        drag="x"
        dragSnapToOrigin
        dragElastic={0.1}
        onUpdate={handleUpdate}
      >
        <img className={styles.image} src="/sprites/view-control.png" draggable="false" alt="Drag to view" />
      </motion.div>
    </motion.div>
  );
}
