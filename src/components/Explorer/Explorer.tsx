import { useContext, useState } from "react";
import { getAllScales } from "../../theory";
import styles from "./index.module.css";
import { InstrumentContext } from "../../App";
import { Chromaboard } from "../Chromaboard";
import { Piano } from "../Piano";
import { Guitar } from "../Guitar";

const ALL_SCALES = getAllScales();
const MINOR_PENTATONIC = "1.m3.P4.P5.m7";

const instruments: Record<string, any> = {
  chromaboard: Chromaboard,
  piano: Piano,
  guitar: Guitar,
};

export const Explorer = () => {
  const { currentInstrument, setCurrentInstrument } = useContext(
    InstrumentContext
  );

  const [selectedScaleId, setSelectedScaleId] = useState(MINOR_PENTATONIC);

  const selectedScale = ALL_SCALES.find(
    (scale) => scale.name === selectedScaleId
  )!;

  const InstrumentComponent = instruments[currentInstrument];

  return (
    <div className={styles.explorer}>
      <select
        value={currentInstrument}
        onChange={(e) => setCurrentInstrument(e.target.value)}
      >
        <option value="chromaboard">Chromatic Keyboard</option>
        <option value="piano">Piano</option>
        <option value="guitar">Guitar</option>
      </select>

      <select
        value={selectedScaleId}
        onChange={(e) => setSelectedScaleId(e.target.value)}
      >
        {ALL_SCALES.map((scale) => (
          <option value={scale.name}>
            {scale.name} {scale.alias}
          </option>
        ))}
      </select>

      <InstrumentComponent scale={selectedScale} />
    </div>
  );
};
