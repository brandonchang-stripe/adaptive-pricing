import styles from "./Keyboard.module.css";

export default function Keyboard() {
  return <img className={styles.keyboard} src="/sprites/keyboard.png" alt="" draggable={false} />;
}
