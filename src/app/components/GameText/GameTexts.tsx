import GameText from ".";
import styles from "./GameText.module.css";
import { useAppStore } from "@/app/store";

export default function GameTexts() {
  const texts = useAppStore((state) => state.popovers);

  return (
    <div className={styles.container}>
      {Array.from(texts).map(([id, props]) => (
        <GameText {...props} key={id} />
      ))}
    </div>
  );
}
