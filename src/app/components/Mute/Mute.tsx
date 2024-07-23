import { useMute } from "@/app/hooks/useAudio";
import styles from "./Mute.module.css";
export default function Mute() {
  const [muted, setMuted] = useMute();

  const handleClick = () => {
    setMuted(!muted);
  }

  return <button className={styles.mute} onClick={handleClick}>
    <img className={styles.image} src={`/sprites/${muted ? "mute" : "unmute"}.png`} alt="Mute" />
  </button>
}