import React from "react";
import cx from "classnames";
import Link from "next/link";
import { CheckIcon, CircleIcon, RightArrowIcon } from "../Icons";

import styles from "./index.module.scss";

export const BreadcrumbItem = ({
  status,
  name,
  showIcon = false,
  className = ""
}: {
  status: "complete" | "active" | "future";
  name: string;
  showIcon?: boolean;
  className?: string;
}) => (
  <>
    {showIcon && (
      <div className={styles.IconWrapper}>
        {status === "complete" ? (
          <CheckIcon />
        ) : (
          <CircleIcon color={status === "active" ? "active" : "inactive"} />
        )}
      </div>
    )}
    <span
      className={cx(styles.BreadcrumbText, className, {
        [styles.BreadcrumbTextFaded]: status === "future"
      })}
    >
      {name}
    </span>
  </>
);

const BreadCrumb = ({
  currentStep,
  steps,
  showIcon = false
}: {
  showIcon?: boolean;
  currentStep: StepNameType;
  steps: Array<{
    path: string;
    title: StepNameType;
    state?: string;
  }>;
}) => {
  let currentStepIndex = steps.findIndex(step => step.title === currentStep);
  currentStepIndex = currentStepIndex === -1 ? steps.length : currentStepIndex;
  return (
    <ol className={styles.BreadcrumbRow}>
      {steps.map((step, index) => {
        let stepComponent = (
          <Link href={step.path}>
            <a className={styles.BreadcrumbItem}>
              <BreadcrumbItem
                showIcon={showIcon}
                status="complete"
                name={step.title}
              />
            </a>
          </Link>
        );
        if (index === currentStepIndex || index > currentStepIndex)
          stepComponent = (
            <div className={styles.BreadcrumbItem}>
              <BreadcrumbItem
                showIcon={showIcon}
                status={index === currentStepIndex ? "active" : "future"}
                name={step.title}
              />
            </div>
          );

        return <li key={step.title}>{stepComponent}</li>;
      })}
    </ol>
  );
};

export default BreadCrumb;

export const MiniCrumb = ({ setCurrentStep, currentStep, secondStepName }) => {
  return (
    <div className={styles.MiniCrumbs}>
      <button
        className={styles.CrumbButton}
        onClick={() => setCurrentStep(1)}
        type="button"
      >
        <BreadcrumbItem
          className={styles.MiniCrumbItem}
          name="Manufacturer"
          status={currentStep === 1 ? "active" : "complete"}
        />
      </button>
      <RightArrowIcon />
      <button
        className={styles.CrumbButton}
        onClick={() => setCurrentStep(2)}
        type="button"
      >
        <BreadcrumbItem
          className={styles.MiniCrumbItem}
          name={secondStepName}
          status={currentStep === 2 ? "active" : "future"}
        />
      </button>
    </div>
  );
};
