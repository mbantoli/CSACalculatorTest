import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { NRFlowContext } from "../components/NRFlowContext";
import PageLayout from "../components/PageLayout";
import FormLayout from "../components/FormLayout";
import Button from "../components/Button";
import Input from "../components/Input";
import { generateQueryParams } from "../utils/flow";
import styles from "./index.module.scss";

import {
  combineValidators,
  isRequired,
  isNumber,
  greaterThanZero
} from "../validators";

export const pressureUnitValidator = isRequired(
  "Wind Pressure unit is required."
);

export const pressureValidator = combineValidators([
  isRequired("Wind Pressure is required."),
  isNumber("Input must be a valid number"),
  greaterThanZero("Wind Pressure must be greater than zero.")
]);

const PressureForm = () => {
  const stepName = "Wind Pressure";
  const router = useRouter();
  const { formState, setFormState, steps } = useContext(NRFlowContext);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const displayValue = formState.windPressure || "";

  const pressureUnit = formState.windPressureUnit || "kpa";

  const handlePressureChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (errorMessage) {
      setErrorMessage(undefined);
    }

    setFormState({
      ...formState,
      windPressure: event.currentTarget.value,
      windPressureUnit: pressureUnit
    });
  };

  const toggleUnitSelection = () => {
    const newPressureUnit = pressureUnit === "kpa" ? "psf" : "kpa";

    setFormState({
      ...formState,
      windPressureUnit: newPressureUnit
    });
  };

  return (
    <PageLayout
      headTitle="Wind Pressure | IKO"
      onSubmit={() => {
        const error = pressureValidator(displayValue);
        if (error) {
          setErrorMessage(error);
        } else {
          router.push(`/attachment${generateQueryParams(formState)}`);
        }
      }}
      stepName={stepName}
      steps={steps}
    >
      <FormLayout
        stepText="Question 1 of 6"
        title="Enter the required wind pressure"
        subtitle="Can be entered as either kPa or psf."
        note="The results of your search will include the 1.5x safety factor."
      >
        <Input
          inputMode="decimal"
          onChange={handlePressureChange}
          value={displayValue}
          suffix={pressureUnit === "kpa" ? "kPa" : "psf"}
          placeholder="0.0"
          errorMessage={errorMessage}
        />
        <Button
          className={styles.SwitchButton}
          inline
          small
          onClick={toggleUnitSelection}
        >
          {pressureUnit === "kpa" && "switch to psf"}
          {pressureUnit === "psf" && "switch to kPa"}
        </Button>
      </FormLayout>
    </PageLayout>
  );
};

export default PressureForm;
