import { useAudio, useMute } from "@/app/hooks/useAudio";
import styles from "./Mute.module.css";
export default function Mute() {
  const audio = useAudio();
  const [muted, setMuted] = useMute();

  const handleClick = () => {
    setMuted((previous) => {
      if (previous) {
        audio("scroll");
      }
      return !previous;
    });
  };

  return (
    <button className={styles.mute} onClick={handleClick}>
      <img className={styles.image} src={`/sprites/${muted ? "mute" : "unmute"}.png`} alt="Mute" draggable={false} />
    </button>
  );
}
