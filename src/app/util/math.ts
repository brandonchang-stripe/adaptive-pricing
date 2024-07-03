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
