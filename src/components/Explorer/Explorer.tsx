import { useState } from "react";
import { Chromaboard } from "../Chromaboard";
import { getAllScales } from "../../theory";
import styles from "./index.module.css";

const ALL_SCALES = getAllScales();
const MINOR_PENTATONIC = "1.m3.P4.P5.m7";

export const Explorer = () => {
  const [selectedScaleId, setSelectedScaleId] = useState(MINOR_PENTATONIC);

  const selectedScale = ALL_SCALES.find(
    (scale) => scale.name === selectedScaleId
  )!;

  return (
    <div className={styles.explorer}>
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

      <Chromaboard scale={selectedScale} />
    </div>
  );
};
