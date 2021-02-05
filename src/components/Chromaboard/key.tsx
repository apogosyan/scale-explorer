import { ReactEventHandler } from "react";
import { ScaleNote } from "../../theory";
import styles from "./index.module.css";

interface KeyProps extends Omit<ScaleNote, "midi"> {
  onPress: ReactEventHandler<HTMLDivElement>;
  onRelease: ReactEventHandler<HTMLDivElement>;
}

export const Key = ({
  tone,
  degree,
  disabled,
  onPress,
  onRelease,
}: KeyProps) => {
  return disabled ? (
    <div className={styles.key} onMouseDown={onPress} onMouseUp={onRelease}>
      <div>{tone}</div>
      <div>{degree}</div>
    </div>
  ) : (
    <div className={`${styles.key} ${styles.disabledKey}`}></div>
  );
};
