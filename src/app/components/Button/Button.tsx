import { useCallback } from "react";
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
    e.stopPropagation();
    onClick();
  }

  const handleMouseDown = useCallback(() => {
    audio(disabled ? "clickDisabled" : "clickDown");
  }, [disabled]);

  function handleMouseUp() {
    audio("clickUp");
  }

  return (
    <button
      onPointerDown={handleMouseDown}
      onPointerUp={handleMouseUp}
      onClick={handleClick}
      disabled={disabled}
      className={styles.button}
    >
      {children}
    </button>
  );
}
