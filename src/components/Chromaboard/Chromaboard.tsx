import { Scale } from "../../theory";
import { Key } from "./Key";
import styles from "./index.module.css";
import { useMidiPlayer } from "../../helpers/useMidiPlayer";
import { useAudioContext } from "../../helpers/useAudioContext";

interface Props {
  scale: Scale;
}

const CODES = {
  Q: "KeyQ",
  W: "KeyW",
  E: "KeyE",
  R: "KeyR",
  T: "KeyT",
  Y: "KeyY",
  U: "KeyU",
  I: "KeyI",
  O: "KeyO",
  P: "KeyP",
  "[": "BracketLeft",
  "]": "BracketRight",
};

// TODO: add loading animation while soundfont is loading

export const Chromaboard = ({ scale }: Props) => {
  const AudioContext = useAudioContext()!;
  const { isLoading, noteOn, noteOff } = useMidiPlayer(AudioContext);
  const title = scale.name + (scale.alias ? ` (${scale.alias})` : "");

  return (
    <div className={styles.chromaboard}>
      <h2>{title}</h2>
      <div className={styles.keys}>
        {scale.notes.map(({ tone, degree, midi, disabled }, idx) => (
          <Key
            key={midi}
            degree={degree}
            midi={midi}
            triggerCode={Object.values(CODES)[tone - 1]}
            keyLabel={Object.keys(CODES)[tone - 1]}
            disabled={disabled || isLoading}
            onPress={noteOn}
            onRelease={noteOff}
          />
        ))}
      </div>
    </div>
  );
};
