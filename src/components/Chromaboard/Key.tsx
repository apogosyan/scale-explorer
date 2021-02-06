import { useState, useEffect } from "react";
import { ScaleNote } from "../../theory";
import { MidiValue } from "../../theory";
import styles from "./index.module.css";

interface KeyProps extends Omit<ScaleNote, "tone"> {
  onPress: (note: MidiValue) => Promise<void>;
  onRelease: (note: MidiValue) => Promise<void>;
  triggerCode: string;
  keyLabel: string;
}

export const Key = ({
  degree,
  midi,
  triggerCode,
  keyLabel,
  disabled,
  onPress,
  onRelease,
}: KeyProps) => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    function handleKeyDown({ code }: KeyboardEvent): void {
      if (!disabled && !keyPressed && code === triggerCode) {
        setKeyPressed(true);
        onPress(midi);
      }
    }

    function handleKeyUp({ code }: KeyboardEvent): void {
      if (!disabled && keyPressed && code === triggerCode) {
        setKeyPressed(false);
        onRelease(midi);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

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
      <div className={styles.keyLabel}>
        <div>{keyLabel}</div>
      </div>
    </div>
  );
};
