import { Scale } from "../../theory";
import { Key } from "./Key";
import styles from "./index.module.css";
import { useMidiPlayer } from "../../helpers/useMidiPlayer";
import { useAudioContext } from "../../helpers/useAudioContext";

interface Props {
  scale: Scale;
}

// TODO: add loading animation while soundfont is loading

export const Chromaboard = ({ scale }: Props) => {
  const AudioContext = useAudioContext()!;
  const { isLoading, noteOn, noteOff } = useMidiPlayer(AudioContext);
  const title = scale.name + (scale.alias ? ` (${scale.alias})` : "");

  return (
    <div className={styles.chromaboard}>
      <h2>{title}</h2>
      <div className={styles.keys}>
        {scale.notes.map(({ degree, midi, disabled }, idx) => (
          <Key
            key={`key_${idx}`}
            degree={degree}
            midi={midi}
            disabled={disabled || isLoading}
            onPress={noteOn}
            onRelease={noteOff}
          />
        ))}
      </div>
    </div>
  );
};
