import styles from "./EmailListItem.module.css";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { stepEase } from "@/app/util/stepEase";
import { SoundName, useAudio } from "@/app/hooks/useAudio";
import { pitchToRate } from "@/app/util/math";

type Props = {
  subject: string;
  from: string;
  imageSrc?: string;
  children?: React.ReactNode;
  index: number;
  openSounds: SoundName[];
};

export default function EmailListItem({ subject, from, imageSrc, children, index, openSounds }: Props) {
  const audio = useAudio();
  useEffect(() => {
    for (let i = 0; i < openSounds.length; i++) {
      setTimeout(() => audio(openSounds[i], pitchToRate(index, "chromatic")), 300 * (index + 2) + 100);
    }
  }, [openSounds, index]);

  return (
    <motion.div
      variants={{
        hidden: { display: "none", translateX: "110%" },
        visible: { display: "flex", translateX: "0" },
      }}
      transition={{ ease: stepEase(4), duration: 0.2 }}
      className={styles.item}
    >
      {imageSrc && <img className={styles.image} src={imageSrc} />}
      <div className={styles.copy}>
        <div>{subject}</div>
        <div>
          <b>{from}</b>
        </div>
        {children}
      </div>
    </motion.div>
  );
}
