export function randRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function randiRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function relativeRound(value: number) {
  if (value >= 100) {
    return Math.floor(value);
  } else {
    return Math.floor(value * 100) / 100;
  }
}

export function remap(
  value: number,
  low1: number,
  high1: number,
  low2: number,
  high2: number
) {
  return low2 + ((value - low1) * (high2 - low2)) / (high1 - low1);
}

export const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
