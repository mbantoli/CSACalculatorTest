import React from "react";
import cx from "classnames";

import styles from "./index.module.scss";

const GridWrapper = ({ children, largeGrid = 1 }) => (
  <div
    className={cx(styles.Grid, {
      [styles.Grid3Large]: largeGrid === 3,
      [styles.Grid2Large]: largeGrid === 2,
      [styles.Grid1Large]: largeGrid === 1
    })}
  >
    {children}
  </div>
);

export default GridWrapper;
