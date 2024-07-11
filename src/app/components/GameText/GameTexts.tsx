import GameText from ".";
import styles from "./GameText.module.css";
import { useAppStore } from "@/app/store";

export default function GameTexts() {
  const texts = useAppStore((state) => state.gameTexts);

  return (
    <div className={styles.container}>
      {texts.map((text) => (
        <GameText {...text} key={text.id} />
      ))}
    </div>
  );
}
