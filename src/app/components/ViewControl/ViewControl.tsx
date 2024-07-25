import { motion, useDragControls } from "framer-motion";
import styles from "./ViewControl.module.css";
import { useCallback, useRef } from "react";
import { useAudio } from "@/app/hooks/useAudio";

type ViewControlProps = {
  onUpdate: (x: number) => void;
};

export default function ViewControl({ onUpdate }: ViewControlProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const audio = useAudio();

  const startDrag = useCallback(
    (event: React.PointerEvent) => {
      dragControls.start(event, { snapToCursor: true });
    },
    [dragControls]
  );

  const handleUpdate = useCallback(
    (latest: { x: number }) => {
      onUpdate(latest.x);
    },
    [onUpdate]
  );

  function handleDragStart() {
    audio("dragStart");
  }

  function handleDragEnd() {
    audio("dragEnd");
  }

  return (
    <div className={styles.container} ref={containerRef} onPointerDown={startDrag}>
      <div className={styles.track} />
      <motion.div
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className={styles.control}
        dragConstraints={containerRef}
        dragTransition={{ bounceStiffness: 1500, bounceDamping: 50 }}
        dragControls={dragControls}
        dragListener={true}
        drag="x"
        dragSnapToOrigin
        dragElastic={0.1}
        onUpdate={handleUpdate}
      >
        <img className={styles.image} src="/sprites/view-control.png" draggable={false} alt="Drag to view" />
      </motion.div>
    </div>
  );
}
