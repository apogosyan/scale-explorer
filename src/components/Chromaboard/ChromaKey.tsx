import { ScaleNote } from "../../theory";
import styles from "./index.module.css";
import { MidiValue } from "../../theory";

interface KeyProps extends Omit<ScaleNote, "tone"> {
  onPress: (note: MidiValue) => Promise<void>;
  onRelease: (note: MidiValue) => Promise<void>;
}

export const ChromaKey = ({
  degree,
  midi,
  disabled,
  onPress,
  onRelease,
}: KeyProps) => {
  return disabled ? (
    <div className={`${styles.key} ${styles.disabledKey}`}></div>
  ) : (
    <div
      className={styles.key}
      onMouseDown={() => onPress(midi)}
      onMouseUp={() => onRelease(midi)}
      onMouseOut={() => onRelease(midi)}
    >
      <div>{degree}</div>
    </div>
  );
};
