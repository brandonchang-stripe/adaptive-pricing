import styles from "./ScoreFrame.module.css";

export default function ScoreMileCounter() {
  return (
    <div className={styles.numberSquare}>
      <div className={styles.number}>0</div>
      <div className={styles.number}>1</div>
      <div className={styles.number}>2</div>
      <div className={styles.number}>3</div>
      <div className={styles.number}>4</div>
      <div className={styles.number}>5</div>
      <div className={styles.number}>6</div>
      <div className={styles.number}>7</div>
      <div className={styles.number}>8</div>
      <div className={styles.number}>9</div>
      <div className={styles.number}>0</div>
    </div>
  );
}
