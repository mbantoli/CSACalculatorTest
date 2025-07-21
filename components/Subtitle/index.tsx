import React from "react";
import cx from "classnames";

import styles from "./index.module.scss";

const Subtitle = ({ children, className = "" }) => {
  return <div className={cx(styles.Subtitle, className)}>{children}</div>;
};

export default Subtitle;
