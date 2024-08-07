import { useCallback } from "react";
import styles from "./Button.module.css";
import { useAudio } from "@/app/hooks/useAudio";

type Props = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  as?: "button" | "a";
};

export default function Button({ children, onClick, disabled, href, className, as = "button" }: Props) {
  const audio = useAudio();

  function handleClick(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) {
    if (!href) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (onClick) {
      onClick();
    }
  }
  

  const handleMouseDown = useCallback(() => {
    audio(disabled ? "clickDisabled" : "clickDown");
  }, [disabled]);

  function handleMouseUp() {
    audio("clickUp");
  }

  return as === "button" ? (
    <button
      onPointerDown={handleMouseDown}
      onPointerUp={handleMouseUp}
      onClick={handleClick}
      disabled={disabled}
      className={styles.button}
    >
      {children}
    </button>
  ) : (
    <a
      href={href}
      onPointerDown={handleMouseDown}
      onPointerUp={handleMouseUp}
      onClick={handleClick}
      className={`${styles.button} ${className || ""}`}
      target="_blank"
    >
      {children}
    </a>
  );
}
