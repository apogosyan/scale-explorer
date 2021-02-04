import Scale from "../../theory";
import Key from "./key";

interface Props {
  scale: Scale;
}

export const Chromaboard = ({ scale }: Props) => {
  return (
    <div className="chromaboard">
      <h2>{scale.name}</h2>
      <div className="keys">
        {scale.base12toneDegrees().map((td, idx) => (
          <Key key={`key_${idx}`} toneDegree={td} />
        ))}
      </div>
    </div>
  );
};
