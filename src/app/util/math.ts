export function randRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function randiRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
