import { kCombinations } from "./helpers";

/**
 * Represents a basic unit of a scale. Named 1 to 12 since there are
 * only 12 possible distinct tones in an octave. Tone 1 is also called
 * a tonic and it's a starting point of any scale.
 * Each tone has corresponding degree in major scale.
 */
type Tone = number;

/**
 * Scale is a collection of at least one and at most twelve distinct tones.
 * Some scales have common names, e.g. [1,3,5,6,8,10,12] is called major scale;
 */
export interface Scale {
  id: string;
  tones: Tone[];
  degrees: string[];
  name?: string;
}

function buildScale(tones: Tone[], name?: string): Scale {
  const degreeAbbrs = "- 1 m2 M2 m3 M3 P4 TT P5 m6 M6 m7 M7".split(" ");
  return {
    id: "12-1",
    degrees: tones.map((tone) => degreeAbbrs[tone]),
    tones,
    name,
  };
}

/**
 * The only possible scale with all 12 tones, known as chromatic scale.
 */
export const chromaticScale = buildScale(
  [...Array(13).keys()].slice(1),
  "Chromatic"
);

/* Return all scales of n size */
export const scalesOfSize = (size: number): Scale[] => {
  const tonic = [1];
  const rest = chromaticScale.tones.slice(1);
  const combs = kCombinations(rest, size - 1);
  return combs.map((comb) => buildScale(tonic.concat(comb)));
};
