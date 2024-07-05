import { Howl } from "howler";
import { useCallback, useRef } from "react";

export const soundBoard = {
  correct: new Howl({ src: "./audio/confirmation_001.ogg" }),
  click: new Howl({ src: "./audio/switch_006.ogg" }),
  tick: new Howl({ src: "./audio/click_003.ogg", volume: 0.3 }),
  tock: new Howl({ src: "./audio/tick_004.ogg", volume: 0.3 }),
  error: new Howl({ src: "./audio/error_005.ogg" }),
} as const;

export type SoundName = keyof typeof soundBoard;

export function useAudio() {
  const sounds = useRef(soundBoard).current;
  const playSound = useCallback(
    (id: SoundName, rate = 1) => {
      const sound = sounds[id].play();
      sounds[id].rate(rate, sound);
    },
    [sounds]
  );

  return playSound;
}
