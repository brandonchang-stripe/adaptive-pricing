import { motion, useAnimationFrame } from "framer-motion";
import styles from "./EmailListItem.module.css";
import { stepEase } from "@/app/util/stepEase";
import { SoundName, useAudio } from "@/app/hooks/useAudio";
import { useEffect, useRef } from "react";

type Props = {
  subject: string;
  from: string;
  imageSrc: string;
  children?: React.ReactNode;
  index: number;
  openSounds: SoundName[];
};

export default function EmailListItem({
  subject,
  from,
  imageSrc,
  children,
  index,
  openSounds,
}: Props) {
  const audio = useAudio();
  useEffect(() => {
    for (let i = 0; i < openSounds.length; i++) {
      setTimeout(() => audio(openSounds[i]), 400 * (index + 1) + 100);
    }
  }, [openSounds]);

  return (
    <motion.div
      variants={{
        hidden: { display: "none", translateX: "110%" },
        visible: { display: "flex", translateX: "0" },
      }}
      transition={{ ease: stepEase(4), duration: 0.2 }}
      className={styles.item}
    >
      <div className={styles.image}>{/* todo image */}</div>
      <div className={styles.copy}>
        <div>{subject}</div>
        <div>{from}</div>
        {children}
      </div>
    </motion.div>
  );
}
