import styles from "./Panel.module.css";

export type Props = {
  label: string;
  gridName?: string;
  children?: React.ReactNode;
};

export default function Panel({ children, label, gridName }: Props) {
  return (
    <div style={{ gridArea: gridName }} className={styles.container}>
      <div className={styles.label}>{label}</div>
      <div className={styles.panel}>{children}</div>
    </div>
  );
}
