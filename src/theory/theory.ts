import { kCombinations } from "../helpers";

type Tone = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
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

export type MidiValue = number;

export interface ScaleNote {
  tone: Tone;
  degree: Degree;
  midi: MidiValue;
  disabled: boolean;
}

export interface Scale {
  name: string;
  notes: ScaleNote[];
  alias?: string;
}

const ALIASES: Record<string, string> = {
  "1.M2.M3.P4.P5.M6.M7": "Major",
  "1.m3.P4.P5.m7": "Minor Pentatonic",
  "1.m2.M2.m3.M3.P4.TT.P5.m6.M6.m7.M7": "Chromatic",
};

const DEGREES = "1 m2 M2 m3 M3 P4 TT P5 m6 M6 m7 M7".split(" ");
const MIDI_C3 = 48;

function tonesToScale(tones: Tone[]): Scale {
  const chromatic = [...Array(12).keys()];
  const notes: ScaleNote[] = chromatic.map((n) => ({
    tone: (n + 1) as Tone,
    degree: DEGREES[n] as Degree,
    midi: MIDI_C3 + n,
    disabled: !tones.includes((n + 1) as Tone),
  }));

  const name = notes
    .filter((note) => !note.disabled)
    .map((note) => note.degree)
    .join(".");
  const alias = ALIASES[name];

  return { name, notes, alias };
}

export const pentatonic = tonesToScale([1, 4, 6, 8, 11]);

export type AudioContextOrNull = typeof AudioContext | null;

type ScaleSize = Tone;

/* Return all scales of n size */
export const scalesOfSize = (size: ScaleSize): Scale[] => {
  const full = [...Array(13).keys()].slice(1);
  const root = full.slice(0, 1);
  const rest = full.slice(1);
  const combs = kCombinations(rest, size - 1);
  return combs.map((comb) => tonesToScale(root.concat(comb) as Tone[]));
};
