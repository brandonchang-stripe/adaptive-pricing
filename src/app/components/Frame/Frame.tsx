import styles from "./Frame.module.css";
import { motion } from "framer-motion";
import { stepEase } from "@/app/util/stepEase";
import { useAudio } from "@/app/hooks/useAudio";
import { useState } from "react";
import { useScreenRef } from "../Context";

type FrameProps = {
  children?: React.ReactNode;
  label: string;
  position: string;
  type?: "regular" | "note" | "simple";
  index?: number;
  visible?: boolean;
  allowDrag?: boolean;
};

export default function Frame({
  children,
  label,
  position,
  type = "regular",
  index = 0,
  visible = true,
  allowDrag = false,
}: FrameProps) {
  const audio = useAudio();
  // Used to track if this frame has already been opened,
  // to prevent multiple open sounds from playing on drag
  const [opened, setOpened] = useState(false);
  const screenRef = useScreenRef();

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
        if (animation === "hidden") {
          audio("close");
        }
      }}
      key={label}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      exit="hidden"
      variants={{
        hidden: { scale: 0, transition: { ease: stepEase(4), duration: 0.2 } },
        visible: {
          scale: 1,
          transition: { ease: stepEase(4), duration: 0.4, delay: index * 0.3 },
        },
      }}
      className={`${styles.frame} ${position} ${type}`}
      data-type={type}
    >
      {type !== "simple" && <div className={styles.titlebar}>{label}</div>}
      <div className={styles.content}>{children}</div>
    </motion.div>
  );
}
