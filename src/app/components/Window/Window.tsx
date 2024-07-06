import { useDrag } from "@/app/hooks/useDrag";
import styles from "./Window.module.css";

export type Props = {
  label: string;
  children?: React.ReactNode;
  width?: number;
  height?: number
};

export default function Window({ children, label, width = 400, height }: Props) {
  const [dragRef] = useDrag<HTMLDivElement>({
    draggable: true,
    damp: 0.92,
  });

  return (
    <div
      className={styles.container}
      ref={dragRef}
      style={{ width: width + "px", height: height ? height + "px" : "auto" }}
    >
      <div className={styles.titlebar}>
        {label}
      </div>
      <div className={styles.contents}>{children}</div>
    </div>
  );
}
