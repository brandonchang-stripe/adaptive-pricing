import styles from "./Frame.module.css";

type FrameProps = {
  children: React.ReactNode;
  label: string;
};

export default function Frame({ children, label }: FrameProps) {
  return (
    <div className={styles.frame}>
      <div className={styles.titlebar}>{label}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
