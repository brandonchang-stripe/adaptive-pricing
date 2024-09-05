import { Howl, Howler } from "howler";
import { useCallback, useEffect, useRef, useState } from "react";

export const soundBoard = {
  dragStart: new Howl({ src: "./sfx/drag_start.mp3", volume: 0.04 }),
  dragEnd: new Howl({ src: "./sfx/drag_end.mp3", volume: 0.04 }),
  convert: new Howl({ src: "./sfx/convert.mp3", volume: 1.0 }),
  scroll: new Howl({ src: "./sfx/tock_04.mp3", volume: 0.2 }),
  gainShort: new Howl({ src: "./sfx/confirm_08.mp3", volume: 0.3 }),
  point1: new Howl({ src: "./sfx/point_1.mp3", volume: 0.2 }),
  point2: new Howl({ src: "./sfx/point_2.mp3", volume: 0.2 }),
  point3: new Howl({ src: "./sfx/point_3.mp3", volume: 0.2 }),
  point4: new Howl({ src: "./sfx/point_4.mp3", volume: 0.2 }),
  point5: new Howl({ src: "./sfx/point_5.mp3", volume: 0.2 }),
  clickDown: new Howl({ src: "./sfx/click_02.mp3", volume: 0.8 }),
  clickUp: new Howl({ src: "./sfx/click_01.mp3", volume: 0.8 }),
  clickDisabled: new Howl({ src: "./sfx/tock_01.mp3", volume: 0.5 }),
  check: new Howl({ src: "./sfx/confirm_06.mp3", volume: 0.5 }),
  tock: new Howl({ src: "./sfx/tock_02.mp3", volume: 0.5 }),
  error: new Howl({ src: "./sfx/error.mp3", volume: 0.2 }),
  open: new Howl({ src: "./sfx/open_08.mp3", volume: 0.3 }),
  close: new Howl({ src: "./sfx/close_07.mp3", volume: 0.1 }),
  start: new Howl({ src: "./sfx/confirm_11.mp3", volume: 0.4 }),
  startLightning: new Howl({ src: "./sfx/confirm_12.mp3", volume: 0.4 }),
  roundOver: new Howl({ src: "./sfx/confirm_11.mp3", volume: 0.3 }),
  score: new Howl({ src: "./sfx/score.mp3", volume: 0.3 }),
  boot: new Howl({ src: "./sfx/startup_01.mp3", volume: 0.5 }),
  beep: new Howl({ src: "./sfx/beep_04.mp3", volume: 0.05 }),
  beepNote: new Howl({ src: "./sfx/beep_06.mp3", volume: 0.3 }),
  splash: new Howl({ src: "./sfx/startup_02.mp3", volume: 0.05 }),
  ping: new Howl({ src: "./sfx/confirm_05.mp3", volume: 0.2 }),
  key1: new Howl({ src: "./sfx/key_1.mp3", volume: 0.6 }),
  key2: new Howl({ src: "./sfx/key_2.mp3", volume: 0.6 }),
  shutdown: new Howl({ src: "./sfx/close_05.mp3", volume: 0.6 }),
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
  src: ["./audio/bossa_adapter.mp3", "./audio/bossa_adapter.ogg", "./audio/bossa_adapter.webm"],
  html5: true,
  loop: true,
  volume: 0.7,
});

// Keep this outside of the hook to prevent multiple instances
let musicId: number | undefined;

export function playMusic() {
  const skipMusic = window ? new URLSearchParams(window.location.search).has("nomusic") : false;
  if (!musicId && !skipMusic) {
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

export function stopAll() {
  Howler.stop();
}
