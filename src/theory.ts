/* A basic unit of a scale. There are 12 possible tones in a scale, starting at 1 (root tone) */
type Tone = number;

/** Scale is a collection of tones. A minimal scale is a Root + one or more other tones.
 *Also can have aliases, e.g. [1,3,5,6,8,10,12] can also be referred to as Major or Ionian.
 */
export interface Scale {
  tones: Tone[];
  aliases?: string[];
}

const kCombinations = <T>(set: T[], k: number): T[][] => {
  const n = set.length;
  let result: T[][] = [];

  function dfs(current: T[], start: number) {
    if (current.length === k) {
      result.push(current);
      return;
    }
    for (let i = start; i < n; i++) {
      dfs([...current, set[i]], i + 1);
    }
  }
  dfs([], 0);
  return result;
};

/* Return all scales of n size */
export const scaleOfSize = (size: number): Scale[] => {
  const full: Tone[] = [...Array(12).keys()].map((i) => i + 1);
  const root = full.slice(0, 1);
  const rest = full.slice(1);
  const combs = kCombinations(rest, size - 1);
  return combs.map((comb) => ({ tones: root.concat(comb) }));
};
