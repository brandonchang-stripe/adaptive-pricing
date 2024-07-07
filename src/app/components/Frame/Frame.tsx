import { motion } from "framer-motion";
import styles from "./Frame.module.css";
import { stepEase } from "@/app/util/stepEase";

type FrameProps = {
  children?: React.ReactNode;
  label: string;
  position: string;
  type?: "regular" | "note";
};


export default function Frame({
  children,
  label,
  position,
  type = "regular",
}: FrameProps) {
  return (
    <motion.div
      variants={{
        hidden: { scale: 0, y: 20},
        visible: { scale: 1, y: 0 },
      }}
      transition={{ ease: stepEase(4), duration: 0.4 }}
      className={`${styles.frame} ${position} ${type}`}
      data-type={type}
    >
      <div className={styles.titlebar}>{label}</div>
      <div className={styles.content}>{children}</div>
    </motion.div>
  );
}
