import styles from "./MapBorder.module.css";

export default function MapBorder() {
  return (
    <>
      <div className={`${styles.border} ${styles.leftBorder}`}></div>
      <div className={`${styles.border} ${styles.bottomBorder}`}></div>
    </>
  );
}
