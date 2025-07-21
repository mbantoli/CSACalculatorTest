import React from "react";
import cx from "classnames";
import styles from "./index.scss";

type OptionType = {
  value: string;
  label: React.ReactNode;
  className?: string;
};

type PropsType = {
  name: string;
  options: Array<OptionType>;
  selected?: string;
  onChange?: (event: any) => void;
  className?: string;
  labelClassName?: string;
};
const RadioGroup = (props: PropsType) => {
  const {
    name,
    options,
    selected,
    onChange,
    className,
    labelClassName
  } = props;

  return (
    <div className={cx(styles.RadioGroup, className)}>
      {options.map(option => {
        return (
          <label
            key={option.value}
            className={cx(styles.Label, labelClassName, {
              [styles.LabelChecked]: selected === option.value
            })}
          >
            <input
              className={styles.Radio}
              name={name}
              type="radio"
              value={option.value}
              onChange={onChange}
              checked={selected === option.value}
            />
            <div className={cx(styles.RadioButton, option.className)}>
              {option.label}
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default RadioGroup;
