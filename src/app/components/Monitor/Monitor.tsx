import styles from "./Monitor.module.css";

type Props = {
  children?: React.ReactNode;
};

export default function Monitor({ children }: Props) {
  return (
    <div className={styles.bezel}>
      {/* <img src="/sprites/monitor-screen.png" alt="" className={styles.overlay} /> */}
      <div className={styles.screenBackground}></div>
      <div className={styles.screen}>
        {children}
      </div>
    </div>
  );
}
