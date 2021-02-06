import { useState, useRef, useEffect } from "react";
import Soundfont, { Player } from "soundfont-player";
import { MidiValue, AudioContextOrNull } from "../theory";

const DEFAULT_INSTRUMENT = "electric_guitar_jazz";

interface MidiPlayer {
  isLoading: boolean;
  noteOn(note: MidiValue): Promise<void>;
  noteOff(note: MidiValue): Promise<void>;
}

export function useMidiPlayer(
  AudioContext: NonNullable<AudioContextOrNull>
): MidiPlayer {
  let activeNotes: Record<MidiValue, Player | null> = {};

  const [isLoading, setIsLoading] = useState(false);
  const [player, setPlayer] = useState<Player | null>(null);
  const ac = useRef(new AudioContext());
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!isLoading && !hasLoaded.current) {
      init();
    }
  });

  async function init() {
    setIsLoading(true);
    const player = await Soundfont.instrument(ac.current, DEFAULT_INSTRUMENT);

    setIsLoading(false);
    hasLoaded.current = true;
    setPlayer(player);
  }

  async function resume() {
    return ac.current.state === "suspended"
      ? await ac.current.resume()
      : Promise.resolve();
  }

  async function noteOn(midi: MidiValue) {
    await resume();
    if (!player) return;

    const node = player.play(midi.toString());
    activeNotes = { ...activeNotes, [midi]: node };
  }

  async function noteOff(midi: MidiValue) {
    await resume();
    if (activeNotes[midi]) {
      activeNotes[midi]!.stop();
      activeNotes = { ...activeNotes, [midi]: null };
    }
  }

  return { isLoading, noteOn, noteOff };
}
