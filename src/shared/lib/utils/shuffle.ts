export const shuffle = <T,>(input: readonly T[]): T[] => {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const pickRandom = <T,>(arr: readonly T[], n: number): T[] =>
  shuffle(arr).slice(0, n);
