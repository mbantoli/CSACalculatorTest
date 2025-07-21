import React, { ReactNode } from "react";
import Subtitle from "../Subtitle";
import styles from "./index.scss";

type PropsType = {
  stepText?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  note?: string;
};

const FormLayout = ({
  stepText,
  title,
  subtitle,
  children,
  note
}: PropsType) => {
  return (
    <div className={styles.FormLayout}>
      <div className={styles.FormContent}>
        <div className={styles.FormHeader}>
          {stepText && <div className={styles.StepText}>{stepText}</div>}
          {title && <div className={styles.Title}>{title}</div>}
          {subtitle && (
            <Subtitle className={styles.Subtitle}>{subtitle}</Subtitle>
          )}
        </div>
        {children}
        <div className={styles.Note}>{note}</div>
      </div>
    </div>
  );
};

export default FormLayout;
