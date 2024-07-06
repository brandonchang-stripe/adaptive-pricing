import { useEffect, useRef } from "react";
import styles from "./GameText.module.css";
import { useAppStore } from "@/app/v3/store";
import { Vector2 } from "@/types/Vector2";

export type Props = {
  text: string;
  position: Vector2;
  id: string;
};
export default function GameText({ text, position, id }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // !! This uses v3 store
  const pop = useAppStore(state => state.popGameText)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.left = position.x + 'px';
      ref.current.style.top = position.y + 'px';
      const animation = ref.current.animate([
        { transform: `translate(-50%, -100px)`, opacity: 1 },
        { transform: `translate(-50%, -150px)`, opacity: 1 },
        { transform: `translate(-50%, -200px)`, opacity: 0 },
      ], {duration: 800});

      animation.addEventListener('finish', () => {
        pop(id);
      });
    }
  }, []);

  return (
    <div className={styles.text} ref={ref}>
      {text}
    </div>
  );
}
