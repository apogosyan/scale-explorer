import { Chromaboard } from "../Chromaboard";
import ScalePicker from "../ScalePicker";
import Scale from "../../theory";
import styles from "./index.module.css";

const pentatonic = new Scale([1, 4, 6, 8, 11]);

const Explorer = () => {
  return (
    <div className={styles.explorer}>
      <ScalePicker />
      <Chromaboard scale={pentatonic} />
    </div>
  );
};

export default Explorer;
