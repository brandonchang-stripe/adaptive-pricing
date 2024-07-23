import { Howl, Howler } from "howler";
import { useCallback, useEffect, useRef, useState } from "react";

export const soundBoard = {
  dragStart: new Howl({ src: "./audio/maximize_009.ogg", volume: 0.2 }),
  dragEnd: new Howl({ src: "./audio/minimize_009.ogg", volume: 0.2 }),
  convert: new Howl({ src: "./sfx/convert.mp3", volume: 0.5 }),
  scroll: new Howl({ src: "./sfx/tock_04.mp3", volume: 0.2 }),
  auto: new Howl({ src: "./audio/confirmation_002.ogg", volume: 0.3 }),
  gain: new Howl({ src: "./audio/confirmation_003.ogg", volume: 0.3 }),
  correct: new Howl({ src: "./sfx/confirm_01.mp3", volume: 0.8 }),
  click: new Howl({ src: "./audio/switch_006.ogg", volume: 0.6 }),
  clickShort: new Howl({ src: "./audio/click_004.ogg", volume: 0.6 }),
  clickDown: new Howl({ src: "./sfx/click_02.mp3", volume: 0.8 }),
  clickUp: new Howl({ src: "./sfx/click_01.mp3", volume: 0.8 }),
  clickDisabled: new Howl({ src: "./sfx/tock_01.mp3", volume: 0.5 }),
  check: new Howl({ src: "./sfx/confirm_06.mp3", volume: 0.5 }),
  tick: new Howl({ src: "./audio/click_003.ogg", volume: 0.3 }),
  tock: new Howl({ src: "./sfx/tock_02.mp3", volume: 0.5 }),
  error: new Howl({ src: "./sfx/error_01.mp3", volume: 0.6 }),
  open: new Howl({ src: "./audio/maximize_008.ogg", volume: 0.3 }),
  close: new Howl({ src: "./audio/minimize_006.ogg", volume: 0.3 }),
  start: new Howl({ src: "./sfx/confirm_11.mp3", volume: 0.4 }),
  startLightning: new Howl({ src: "./sfx/confirm_12.mp3", volume: 0.4 }),
  finish: new Howl({ src: "./audio/confirmation_004.ogg", volume: 0.3 }),
  finishSmall: new Howl({ src: "./audio/confirmation_003.ogg", volume: 0.3 }),
  boot: new Howl({ src: "./sfx/startup_01.mp3", volume: 0.5 }),
  beep: new Howl({ src: "./sfx/beep_04.mp3", volume: 0.05 }),
  splash: new Howl({ src: "./sfx/startup_02.mp3", volume: 0.05 }),
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

export function useMute() {
  const [muted, setMuted] = useState(false);
  useEffect(() => {
    Howler.mute(muted);
  }, [muted]);

  return [muted, setMuted] as const;
}

/*
 * For use outside of a hook
 */
export function playSound(id: SoundName, rate = 1) {
  const sound = soundBoard[id].play();
  soundBoard[id].rate(rate, sound);
}
