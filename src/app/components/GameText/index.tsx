import { ReactNode, useEffect, useRef } from "react";
import styles from "./GameText.module.css";
import { useAppStore } from "@/app/store";
import { Vector2 } from "@/types/Vector2";

export type Props = {
  node: () => ReactNode;
  position: Vector2;
  id: string;
};
export default function GameText({ node, position, id }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.left = position.x + "px";
      ref.current.style.top = position.y + "px";
    }
  }, [ref.current]);

  return (
    <div id={id} className={styles.text} ref={ref}>
      {node()}
    </div>
  );
}
