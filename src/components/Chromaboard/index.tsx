import { Scale } from "../../theory";
import Key from "./key";
import styles from "./index.module.css";

interface Props {
  scale: Scale;
}

export const Chromaboard = ({ scale }: Props) => {
  return (
    <>
      <h2>{scale.name}</h2>
      <div className={styles.chromaboard}>
        {[...Array(13).keys()].slice(1).map((i) => {
          const label = scale.tones.includes(i)
            ? scale.degrees[scale.tones.indexOf(i)]
            : undefined;
          return <Key label={label} />;
        })}
      </div>
    </>
  );
};
