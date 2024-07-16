export function replaceAt<T>(array: Array<T>, index: number, value: T) {
  const ret = [...array];
  ret[index] = value;
  return ret;
}
