import { motion } from "framer-motion";
import styles from "./ViewControl.module.css";
import { useRef } from "react";

type ViewControlProps = {
  onUpdate: (x: number) => void;
};

export default function ViewControl({ onUpdate }: ViewControlProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div className={styles.container} ref={containerRef}>
      <motion.img
        className={styles.control}
        dragConstraints={containerRef}
        drag="x"
        dragTransition={{ bounceStiffness: 1500, bounceDamping: 50 }}
        dragSnapToOrigin
        dragElastic={0.1}
        onUpdate={(latest) => onUpdate(latest.x as number)}
        draggable="false"
        src="/sprites/view-control.png"
      >
      </motion.img>
    </motion.div>
  );
}
