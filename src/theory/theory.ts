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
  "1.M2.m3.P4.P5.P6.m7": "Dorian",
  "1.m2.m3.P4.P5.m6.m7": "Phrygian",
  "1.M2.M3.TT.P5.M6.M7": "Lydian",
  "1.M2.M3.P4.P5.M6.m7": "Mixolydian",
  "1.M2.m3.P4.P5.m6.m7": "Aeolian",
  "1.m2.m3.P4.TT.m6.m7": "Locrian",
  "1.M2.M3.P5.M6": "Major pentatonic",
  "1.M2.P4.P5.m7": "Mode II of Major pentatonic",
  "1.m3.P4.m6.m7": "Mode III of Major pentatonic",
  "1.M2.P4.P5.M6": "Mode IV of Major pentatonic",
  "1.m3.P4.P5.m7": "Minor Pentatonic",
  "1.m2.M2.m3.M3.P4.TT.P5.m6.M6.m7.M7": "Chromatic",
  "1.M2.M3.TT.m6.m7": "Whole-tone",
  "1.m2.m3.M3.TT.P5.M6.m7": "Half-whole Symmetrical",
  "1.M2.m3.P4.TT.m6.M6.M7": "Whole-half Symmetrical",
  "1.m3.M3.P5.m6.M7": "Augmented",
  "1.M2.m3.P4.P5.M6.M7": "Jazz Melodic Minor",
  "1.m2.m3.P4.P5.M6.m7": "Dorian ♭2",
  "1.M2.M3.TT.m6.M6.M7": "Lydian Augmented",
  "1.M2.M3.TT.P5.M6.m7": "Lydian Dominant",
  "1.M2.M3.P4.P5.m6.m7": "Mixolydian ♭6",
  "1.M2.m3.P4.TT.m6.m7": "Half-diminished",
  "1.m2.m3.M3.TT.m6.m7": "Altered (Super Locrian)",
  "1.M2.m3.P4.P5.m6.M7": "Harmonic minor",
  "1.m2.m3.P4.P5.m6.M7": "Neapolitan minor",
  "1.m2.m3.P4.P5.M6.M7": "Neapolitan major",
  "1.m2.M3.P4.TT.M6.m7": "Oriental",
  "1.m2.M3.P4.P5.m6.M7": "Double Harmonic",
  "1.m2.M3.TT.m6.m7.M7": "Enigmatic",
  "1.M2.m3.TT.P5.m6.M7": "Hungarian minor",
  "1.m3.M3.TT.P5.M6.m7": "Hungarian Major",
  "1.M2.M3.P4.TT.m6.m7": "Major Locrian",
  "1.M2.M3.TT.P5.m6.m7": "Lydian minor",
  "1.M2.M3.TT.m6.m7.M7": "Leading whole-tone",
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

const scalesOfSize = (size: ScaleSize): Scale[] => {
  const full = [...Array(13).keys()].slice(1);
  const root = full.slice(0, 1);
  const rest = full.slice(1);
  const combs = kCombinations(rest, size - 1);
  return combs.map((comb) => tonesToScale(root.concat(comb) as Tone[]));
};

export const getAllScales = () => {
  const sizes = [...Array(13).keys()];
  let initial: Scale[] = [];
  return sizes.reduce(
    (acc, current) => acc.concat(scalesOfSize(current as Tone)),
    initial
  );
};
