import React from "react";
import cx from "classnames";
import styles from "./index.scss";

type PropsType = {
  small?: boolean;
  secondary?: boolean;
  inline?: boolean;
} & React.ComponentProps<"button">;

const Button = (props: PropsType) => {
  const {
    type = "button",
    small = false,
    secondary = false,
    inline = false,
    className = "",
    ...otherProps
  } = props;

  return (
    <button
      type={type}
      className={cx(styles.Button, className, {
        [styles.ButtonSecondary]: secondary,
        [styles.ButtonSmall]: small,
        [styles.ButtonInline]: inline
      })}
      {...otherProps}
    />
  );
};

export default Button;
