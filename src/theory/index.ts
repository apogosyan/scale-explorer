import { kCombinations } from "./helpers";

/**
 * Represents a basic unit of a scale. Named 1 to 12 since there are
 * only 12 possible distinct tones in an octave. Tone 1 is also called
 * a tonic and it's a starting point of any scale.
 * Each tone has corresponding degree in major scale.
 */
type Tone = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type ScaleSize = Tone;
type Degree =
  | "1"
  | "m2"
  | "M2"
  | "m3"
  | "M3"
  | "P4"
  | "TT"
  | "P5"
  | "m6"
  | "M6"
  | "m7"
  | "M7";

export interface ToneDegree {
  tone: Tone;
  degree: Degree;
}

/**
 * Scale is a collection of at least one and at most twelve distinct tones.
 * Some scales have common names, e.g. [1,3,5,6,8,10,12] is called major scale;
 */
class Scale {
  private static NAMES: { [key: string]: string } = {
    "1 3 5 6 8 10 12": "Major",
    "1 4 6 8 11": "Minor Pentatonic",
    "1 2 3 4 5 6 7 8 9 10 11 12": "Chromatic",
  };

  private _id: string;
  private _tones: Tone[];

  constructor(tones: number[]) {
    this._tones = tones.map((tone) => tone as Tone);
    this._id = this._tones.join(" ");
  }

  get id() {
    return this._id;
  }

  get name() {
    if (this.id in Scale.NAMES) {
      return Scale.NAMES[this.id];
    }
    return "Unnamed";
  }

  get tones() {
    return this._tones;
  }

  get degrees() {
    return this.tones.map((tone) => this.toneToDegree(tone));
  }

  toneToDegree(tone: Tone): Degree {
    const degrees = "- 1 m2 M2 m3 M3 P4 TT P5 m6 M6 m7 M7".split(" ");
    return degrees[tone] as Degree;
  }

  base12toneDegrees(): (ToneDegree | null)[] {
    let result = Array(12).fill(null);
    this.tones.forEach((tone) => {
      result[tone - 1] = { tone: tone, degree: this.toneToDegree(tone) };
    });
    return result;
  }
}

/* Return all scales of n size */
export const scalesOfSize = (size: ScaleSize): Scale[] => {
  const full = [...Array(13).keys()].slice(1);
  const root = full.slice(0, 1);
  const rest = full.slice(1);
  const combs = kCombinations(rest, size - 1);
  return combs.map((comb) => new Scale(root.concat(comb)));
};

export default Scale;
