import * as React from "react";
import styles from "./index.module.css";

type Props = {
  children: React.ReactChild;
};

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.root}>
      <header>
        <h1>Scale Explorer</h1>
      </header>
      {children}
    </div>
  );
};

export default Layout;
