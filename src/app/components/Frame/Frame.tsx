import { motion } from "framer-motion";
import styles from "./Frame.module.css";
import { stepEase } from "@/app/util/stepEase";
import { useAudio } from "@/app/hooks/useAudio";

type FrameProps = {
  children?: React.ReactNode;
  label: string;
  position: string;
  type?: "regular" | "note";
  index?: number;
};

export default function Frame({
  children,
  label,
  position,
  type = "regular",
  index = 0,
}: FrameProps) {
  const audio = useAudio();
  return (
    <motion.div
      onAnimationStart={() => setTimeout(() => audio("open"), 300 * index)}
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
