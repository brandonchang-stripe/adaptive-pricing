import { useAppStore } from "@/app/store";
import { useScreenRef } from "../Context";
import styles from "./Monitor.module.css";
import Wallpaper from "../Wallpaper/Wallpaper";

type Props = {
  children?: React.ReactNode;
};

export default function Monitor({ children }: Props) {
  const state = useAppStore((state) => state.state);
  const screenRef = useScreenRef();

  return (
    <div className={styles.bezel}>
      {state !== "SLEEP" && state !== "BOOT" && <div className={styles.screenBackground} />}
      {state !== "SLEEP" && state !== "BOOT" && state !== "SPLASH" && <Wallpaper key="wallpaper" />}
      <div className={styles.screen} ref={screenRef}>
        {children}
      </div>
    </div>
  );
}
