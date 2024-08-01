import styles from "./Background.module.css";

export default function Background() {
  return <img className={styles.background} src="/sprites/background.png" draggable={false} />
}