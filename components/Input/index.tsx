import React, { ReactNode } from "react";
import cx from "classnames";
import styles from "./index.scss";

type PropsType = {
  inputMode:
    | "text"
    | "none"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  value?: string;
  suffix?: ReactNode;
  placeholder?: string;
  errorMessage?: string;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
};
const Input = (props: PropsType) => {
  const {
    inputMode,
    value,
    suffix,
    placeholder,
    errorMessage,
    onChange
  } = props;
  return (
    <div className={styles.Input}>
      <input
        type="text"
        inputMode={inputMode}
        className={cx(styles.Field, {
          [styles.FieldError]: !!errorMessage
        })}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
      {suffix && (
        <div
          className={cx(styles.Suffix, {
            [styles.SuffixError]: !!errorMessage
          })}
        >
          {suffix}
        </div>
      )}
      {errorMessage && (
        <div className={styles.ErrorMessage}>{errorMessage}</div>
      )}
    </div>
  );
};

export default Input;
