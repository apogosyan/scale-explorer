import { Chromaboard } from "../Chromaboard";
import ScalePicker from "../ScalePicker";
import { Scale } from "../../theory";
import styles from "./index.module.css";

const pentatonic: Scale = {
  id: "12345",
  tones: [1, 4, 6, 8, 11],
  degrees: ["1", "m3", "P4", "P5", "m7"],
  name: "Minor pentatonic",
};

const Explorer = () => {
  return (
    <div className={styles.explorer}>
      <ScalePicker />
      <Chromaboard scale={pentatonic} />
    </div>
  );
};

export default Explorer;
