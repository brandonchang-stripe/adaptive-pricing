import { Howl } from "howler";
import { useCallback, useRef } from "react";

export const soundBoard = {
  dragStart: new Howl({ src: "./audio/maximize_009.ogg", volume: 0.2 }),
  dragEnd: new Howl({ src: "./audio/minimize_009.ogg", volume: 0.2 }),
  convert: new Howl({ src: "./sfx/convert.mp3", volume: 0.5 }),
  scroll: new Howl({ src: "./audio/scroll_001.ogg", volume: 0.2 }),
  auto: new Howl({ src: "./audio/confirmation_002.ogg", volume: 0.3 }),
  gain: new Howl({ src: "./audio/confirmation_003.ogg", volume: 0.3 }),
  correct: new Howl({ src: "./sfx/confirm_01.mp3", volume: 0.8 }),
  click: new Howl({ src: "./audio/switch_006.ogg", volume: 0.6 }),
  clickShort: new Howl({ src: "./audio/click_004.ogg", volume: 0.6 }),
  clickDown: new Howl({ src: "./sfx/click_02.mp3", volume: 0.8 }),
  clickUp: new Howl({ src: "./sfx/click_01.mp3", volume: 0.8 }),
  clickDisabled: new Howl({ src: "./sfx/tock_01.mp3", volume: 0.5 }),
  tick: new Howl({ src: "./audio/click_003.ogg", volume: 0.3 }),
  tock: new Howl({ src: "./sfx/tock_02.mp3", volume: 0.5 }),
  error: new Howl({ src: "./sfx/error_01.mp3", volume: 0.6 }),
  open: new Howl({ src: "./audio/maximize_008.ogg", volume: 0.3 }),
  close: new Howl({ src: "./audio/minimize_006.ogg", volume: 0.3 }),
  start: new Howl({ src: "./sfx/confirm_11.mp3", volume: 0.4 }),
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
