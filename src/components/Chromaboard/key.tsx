import styles from "./index.module.css";

interface Props {
  label?: string;
}

const Key = ({ label }: Props) => {
  return <div className={styles.key}>{label}</div>;
};

export default Key;
