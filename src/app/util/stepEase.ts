export function stepKeyframes(steps: number) {
  // animate={{ scale:     [0, 0,    0.3, 0.3,   0.6, 0.6, 1.0] }}
  // transition={{ times:  [0, 0.29, 0.3, 0.59,  0.6, 0.99, 1.0] }}
  const values = [];
  const times = [];
  for (let i = 0; i <= steps; i++) {
    const value = i / steps;
    values.push(value);
    times.push(value);

    if (i < steps) {
      values.push(value);
      times.push((i + 1) / steps - 0.01);
    }
  }

  return [values, times] as const;
}
export function stepEase(steps: number): (progress: number) => number {
  return (progress: number) => {
    // Round to nearest interval based on steps
    const step = 1 / steps;
    const rounded = Math.round(progress / step) * step;
    return Math.min(1, rounded);
  };
}
