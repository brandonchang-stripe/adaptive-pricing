import { Howl } from "howler";
import { useCallback, useRef } from "react";

export const soundBoard = {
  correct: new Howl({ src: "./audio/confirmation_001.ogg" }),
  click: new Howl({ src: "./audio/switch_006.ogg" }),
  tick: new Howl({ src: "./audio/click_003.ogg" }),
  error: new Howl({ src: "./audio/error_005.ogg" }),
} as const;

export function useAudio() {
  const sounds = useRef(soundBoard).current;
  const playSound = useCallback(
    (id: keyof typeof soundBoard) => {
      sounds[id].play();
    },
    [sounds]
  );

  return playSound;
}
