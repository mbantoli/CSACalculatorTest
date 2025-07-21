import React from "react";
import cx from "classnames";

import styles from "./index.module.scss";

type PropsType = {
  errorMessage: string;
  showError: boolean;
};

export default ({ errorMessage, showError }: PropsType) => (
  <span className={cx(styles.Wrapper, { [styles.ShowError]: showError })}>
    <span className={styles.Text}>{errorMessage}</span>
  </span>
);
