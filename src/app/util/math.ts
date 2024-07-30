export function randRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function randiRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function relativeRound(value: number) {
  if (value >= 100) {
    return Math.round(value);
  } else {
    return Math.round(value * 100) / 100;
  }
}

export function convertRoundedToUSD(priceUSD: number, conversion: number) {
  const value = Math.round(priceUSD * conversion);
  if (value >= 100) {
    return Math.round(value);
  } else {
    return Math.round(value * 100) / 100;
  }
}

export function pad(num: number, size: number) {
  var s = "000000000" + num;
  return s.substring(s.length - size);
}

export function toMMSS(num: number) {
  var date = new Date(0);
  date.setSeconds(num); // specify value for SECONDS here
  return date.toISOString().substring(14, 19);
}

export function remap(value: number, low1: number, high1: number, low2: number, high2: number) {
  return low2 + ((value - low1) * (high2 - low2)) / (high1 - low1);
}

export const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

export function pitchToRate(note: number, scale: "major" | "chromatic" = "major") {
  let selectedScale: number[];
  if (scale === "major") {
    selectedScale = [1, 9 / 8, 5 / 4, 4 / 3, 3 / 2, 5 / 3, 15 / 8];
  } else {
    selectedScale = [1, 25 / 24, 9 / 8, 6 / 5, 5 / 4, 4 / 3, 45 / 32, 3 / 2, 8 / 5, 5 / 3, 9 / 5, 15 / 8];
  }

  const octave = Math.floor(note / selectedScale.length);
  return selectedScale[note % selectedScale.length] * Math.pow(2, octave);
}
