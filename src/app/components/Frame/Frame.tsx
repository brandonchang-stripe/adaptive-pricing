import { motion } from "framer-motion";
import styles from "./Frame.module.css";
import { stepEase } from "@/app/util/stepEase";
import { useAudio } from "@/app/hooks/useAudio";
import { useEffect, useState } from "react";

type FrameProps = {
  children?: React.ReactNode;
  label: string;
  position: string;
  type?: "regular" | "note";
  index?: number;
  allowDrag?: boolean;
};

export default function Frame({
  children,
  label,
  position,
  type = "regular",
  index = 0,
  allowDrag = false,
}: FrameProps) {
  const audio = useAudio();
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      drag={allowDrag}
      dragSnapToOrigin
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
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { scale: 0 },
        visible: { scale: 1 },
      }}
      transition={{ ease: stepEase(4), duration: 0.4, delay: index * 0.3 }}
      className={`${styles.frame} ${position} ${type}`}
      data-type={type}
    >
      <div className={styles.titlebar}>{label}</div>
      <div className={styles.content}>{children}</div>
    </motion.div>
  );
}
