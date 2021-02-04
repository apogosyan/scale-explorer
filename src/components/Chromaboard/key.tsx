import { ToneDegree } from "../../theory";

interface Props {
  toneDegree: ToneDegree | null;
}

const Key = ({ toneDegree }: Props) => {
  return toneDegree ? (
    <div className="key">{toneDegree.degree}</div>
  ) : (
    <div className="key disabledKey"></div>
  );
};

export default Key;
