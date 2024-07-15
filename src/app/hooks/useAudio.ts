import { Howl } from "howler";
import { useCallback, useRef } from "react";

export const soundBoard = {
  dragStart: new Howl({ src: "./audio/maximize_009.ogg", volume: 0.2 }),
  dragEnd: new Howl({ src: "./audio/minimize_009.ogg", volume: 0.2 }),
  auto: new Howl({ src: "./audio/confirmation_002.ogg", volume: 0.3 }),
  gain: new Howl({ src: "./audio/confirmation_003.ogg", volume: 0.3 }),
  correct: new Howl({ src: "./audio/confirmation_001.ogg", volume: 0.6 }),
  click: new Howl({ src: "./audio/switch_006.ogg", volume: 0.6 }),
  clickShort: new Howl({ src: "./audio/click_004.ogg", volume: 0.6 }),
  tick: new Howl({ src: "./audio/click_003.ogg", volume: 0.3 }),
  tock: new Howl({ src: "./audio/tick_004.ogg", volume: 0.3 }),
  error: new Howl({ src: "./audio/error_005.ogg", volume: 0.6 }),
  open: new Howl({ src: "./audio/maximize_008.ogg", volume: 0.3 }),
  close: new Howl({ src: "./audio/minimize_006.ogg", volume: 0.3 }),
  finish: new Howl({ src: "./audio/confirmation_004.ogg", volume: 0.3 }),
  finishSmall: new Howl({ src: "./audio/confirmation_003.ogg", volume: 0.3 }),
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

/*
 * For use outside of a hook
 */
export function playSound(id: SoundName, rate = 1) {
  const sound = soundBoard[id].play();
  soundBoard[id].rate(rate, sound);
}
