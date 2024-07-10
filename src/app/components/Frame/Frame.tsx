import { motion } from "framer-motion";
import styles from "./Frame.module.css";
import { stepEase } from "@/app/util/stepEase";
import { useAudio } from "@/app/hooks/useAudio";
import { useEffect, useState } from "react";
import { useScreenRef } from "../Context";

type FrameProps = {
  children?: React.ReactNode;
  label: string;
  position: string;
  type?: "regular" | "note";
  index?: number;
  allowDrag?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
};

export default function Frame({
  children,
  label,
  position,
  type = "regular",
  index = 0,
  allowDrag = false,
  dismissible = false,
  onDismiss,
}: FrameProps) {
  const audio = useAudio();
  const [opened, setOpened] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const screenRef = useScreenRef();

  function handleDismiss(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (onDismiss) onDismiss();
    setDismissed(true);
  }

  return (
    <motion.div
      drag={allowDrag}
      dragSnapToOrigin
      dragConstraints={screenRef}
      dragElastic={0.1}
      dragTransition={{
        bounceStiffness: 500,
        bounceDamping: 30,
      }}
      onAnimationStart={(animation) => {
        if (animation === "visible" && opened === false) {
          setOpened(true);
          setTimeout(() => audio("open"), 300 * index);
        }
      }}
      key={label}
      initial="hidden"
      animate={dismissed ? "hidden" : "visible"}
      exit="hidden"
      variants={{
        hidden: { scale: 0 },
        visible: { scale: 1 },
      }}
      transition={{ ease: stepEase(4), duration: 0.4, delay: index * 0.3 }}
      className={`${styles.frame} ${position} ${type}`}
      data-type={type}
    >
      <div className={styles.titlebar}>
        {label}
        {dismissible && (
          <button onClick={handleDismiss} className={styles.dismiss}>
            x
          </button>
        )}
      </div>
      <div className={styles.content}>{children}</div>
    </motion.div>
  );
}
