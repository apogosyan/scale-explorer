import { Chromaboard } from "../Chromaboard";
import { ScalePicker } from "../ScalePicker";
import { pentatonic } from "../../theory";
import styles from "./index.module.css";

export const Explorer = () => {
  return (
    <div className={styles.explorer}>
      <ScalePicker />
      <Chromaboard scale={pentatonic} />
    </div>
  );
};
