import { Scale } from "../../theory";
import { Key } from "./Key";
import styles from "./index.module.css";

interface Props {
  scale: Scale;
}

export const Chromaboard = ({ scale }: Props) => {
  const play = () => {
    console.log("play");
  };
  const stop = () => {
    console.log("stop");
  };

  const title = scale.name + (scale.alias ? `(${scale.alias})` : "");

  return (
    <div className={styles.chromaboard}>
      <h2>{title}</h2>
      <div className={styles.keys}>
        {scale.notes.map(({ tone, degree, disabled }, idx) => (
          <Key
            key={`key_${idx}`}
            tone={tone}
            degree={degree}
            disabled={disabled}
            onPress={(event) => play()}
            onRelease={(event) => stop()}
          />
        ))}
      </div>
    </div>
  );
};
