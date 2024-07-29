import { Howl, Howler } from "howler";
import { useCallback, useEffect, useRef, useState } from "react";

export const soundBoard = {
  dragStart: new Howl({ src: "./sfx/move_start.mp3", volume: 0.04 }),
  dragEnd: new Howl({ src: "./sfx/move_end.mp3", volume: 0.04 }),
  convert: new Howl({ src: "./sfx/convert.mp3", volume: 0.5 }),
  scroll: new Howl({ src: "./sfx/tock_04.mp3", volume: 0.2 }),
  gainShort: new Howl({ src: "./sfx/confirm_09.mp3", volume: 0.3 }),
  gain: new Howl({ src: "./audio/confirmation_003.ogg", volume: 0.3 }),
  correct: new Howl({ src: "./sfx/confirm_01.mp3", volume: 0.8 }),
  click: new Howl({ src: "./audio/switch_006.ogg", volume: 0.6 }),
  clickShort: new Howl({ src: "./audio/click_004.ogg", volume: 0.6 }),
  clickDown: new Howl({ src: "./sfx/click_02.mp3", volume: 0.8 }),
  clickUp: new Howl({ src: "./sfx/click_01.mp3", volume: 0.8 }),
  clickDisabled: new Howl({ src: "./sfx/tock_01.mp3", volume: 0.5 }),
  check: new Howl({ src: "./sfx/confirm_06.mp3", volume: 0.5 }),
  tock: new Howl({ src: "./sfx/tock_02.mp3", volume: 0.5 }),
  error: new Howl({ src: "./sfx/error_01.mp3", volume: 0.6 }),
  open: new Howl({ src: "./sfx/open_08.mp3", volume: 0.3 }),
  close: new Howl({ src: "./sfx/close_07.mp3", volume: 0.1 }),
  start: new Howl({ src: "./sfx/confirm_11.mp3", volume: 0.4 }),
  startLightning: new Howl({ src: "./sfx/confirm_12.mp3", volume: 0.4 }),
  roundOver: new Howl({ src: "./sfx/confirm_11.mp3", volume: 0.3 }),
  score: new Howl({ src: "./sfx/score.mp3", volume: 0.3 }),
  boot: new Howl({ src: "./sfx/startup_01.mp3", volume: 0.5 }),
  beep: new Howl({ src: "./sfx/beep_04.mp3", volume: 0.05 }),
  splash: new Howl({ src: "./sfx/startup_02.mp3", volume: 0.05 }),
  ping: new Howl({ src: "./sfx/confirm_05.mp3", volume: 0.2 }),
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

const music = new Howl({
  src: "./audio/bossa_adapter.mp3",
  html5: true,
  loop: true,
  volume: 0.7,
});

// Keep this outside of the hook to prevent multiple instances
let musicId: number | undefined;

export function playMusic() {
  if (!musicId) {
    musicId = music.play();
  }
}

export function stopMusic() {
  if (musicId) {
    music.fade(0.5, 0, 500, musicId);
    music.once("fade", () => {
      music.stop(musicId);
      musicId = undefined;
    });
  }
}
