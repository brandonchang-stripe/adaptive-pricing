import { motion } from "framer-motion";
import styles from "./Frame.module.css";
import { stepEase } from "@/app/util/stepEase";

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
  return (
    <motion.div
      key={label}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { scale: 0 },
        visible: { scale: 1 },
      }}
      transition={{ ease: stepEase(4), duration: 0.4, delay: index * 0.2}}
      className={`${styles.frame} ${position} ${type}`}
      data-type={type}
    >
      <div className={styles.titlebar}>{label}</div>
      <div className={styles.content}>{children}</div>
    </motion.div>
  );
}
