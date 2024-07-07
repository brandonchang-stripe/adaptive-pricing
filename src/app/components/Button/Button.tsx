import styles from "./Button.module.css";
import { useAudio } from "@/app/hooks/useAudio";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

export default function Button({ children, onClick, disabled }: Props) {
  const audio = useAudio();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation()
    audio('clickShort');
    onClick();
  }

  return (
    <button onClick={handleClick} disabled={disabled} className={styles.button}>
      {children}
    </button>
  );
}
