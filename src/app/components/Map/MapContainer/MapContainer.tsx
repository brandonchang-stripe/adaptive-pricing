import styles from "./MapContainer.module.css";

export type Props = {
  children?: React.ReactNode;
  mapRef?: React.RefObject<HTMLDivElement>;
};

export default function MapContainer({ children, mapRef }: Props) {
  return (
    <div ref={mapRef} className={styles.container}>
      {children}
    </div>
  );
}
