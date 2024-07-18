import { useAppStore } from "@/app/store";
import { useScreenRef } from "../Context";
import styles from "./Monitor.module.css";

type Props = {
  children?: React.ReactNode;
};

export default function Monitor({ children }: Props) {
  const state = useAppStore((state) => state.state);
  const screenRef = useScreenRef();

  return (
    <div className={styles.bezel}>
      {/* <img src="/sprites/monitor-screen.png" alt="" className={styles.overlay} /> */}
      {state !== "SLEEP" && state !== "BOOT" && <div className={styles.screenBackground} />}
      <div className={styles.screen} ref={screenRef}>
        {children}
      </div>
    </div>
  );
}
