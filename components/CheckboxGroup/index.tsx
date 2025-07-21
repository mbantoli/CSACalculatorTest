import React from "react";
import cx from "classnames";

import { SelectedIcon } from "../Icons";
import styles from "./index.scss";

type OptionType = {
  value: string;
  label: React.ReactNode;
  checked?: boolean;
  className?: string;
};

type PropsType = {
  className?: string;
  name: string;
  options: Array<OptionType>;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;

  labelClassName?: string;
};

const CheckboxGroup = (props: PropsType) => {
  const { name, options, onChange, className, labelClassName } = props;
  return (
    <div className={cx(className, styles.CheckboxGroup)}>
      {options.map(option => {
        const inputId = `${name}-${option.value}`;

        return (
          <label
            key={option.value}
            className={cx(styles.Label, labelClassName, {
              [styles.LabelChecked]: option.checked
            })}
          >
            <input
              className={styles.Checkbox}
              name={name}
              type="checkbox"
              onChange={onChange}
              value={option.value}
              checked={option.checked}
              aria-checked={option.checked}
              aria-labelledby={inputId}
            />
            <div className={cx(styles.CheckboxButton, option.className)}>
              {option.label}
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default CheckboxGroup;
