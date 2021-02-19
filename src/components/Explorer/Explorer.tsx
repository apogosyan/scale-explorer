import { useState } from "react";
import { getAllScales } from "../../theory";
import styles from "./index.module.css";
import { Chromaboard } from "../Chromaboard";
import Select from "react-select";

const ALL_SCALES = getAllScales();
const MINOR_PENTATONIC = "1.m3.P4.P5.m7";

export const Explorer = () => {
  const [selectedScaleId, setSelectedScaleId] = useState<string | null>(
    MINOR_PENTATONIC
  );

  const selectedScale = ALL_SCALES.find(
    (scale) => scale.name === selectedScaleId
  )!;

  const options = ALL_SCALES.map((scale) => ({
    value: scale.name,
    label: `${scale.name} ${scale.alias ?? ""}`,
  }));

  return (
    <div className={styles.explorer}>
      <div className={styles.selector}>
        <Select
          options={options}
          onChange={(selected) => setSelectedScaleId(selected!.value)}
          defaultValue={{ value: MINOR_PENTATONIC, label: MINOR_PENTATONIC }}
        />
      </div>
      <Chromaboard scale={selectedScale} />
    </div>
  );
};
