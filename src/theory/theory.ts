import { kCombinations } from "./helpers";

/**
 * Represents a basic unit of a scale. Named 1 to 12 since there are
 * only 12 possible distinct tones in an octave. Tone 1 is also called
 * a root and it's a mandatory for a scale to have a root.
 */
type Tone = number;

/**
 * Scale is a collection of at least one and at most twelve distinct tones.
 * Some scales have common names, e.g. [1,3,5,6,8,10,12] is called major scale;
 */
export interface Scale {
  tones: Tone[];
  aliases?: string[];
}

/* Return all scales of n size */
export const scalesOfSize = (size: number): Scale[] => {
  const full: Tone[] = [...Array(12).keys()].map((i) => i + 1);
  const root = full.slice(0, 1);
  const rest = full.slice(1);
  const combs = kCombinations(rest, size - 1);
  return combs.map((comb) => ({ tones: root.concat(comb) }));
};
