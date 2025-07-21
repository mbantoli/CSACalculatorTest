import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { NRFlowContext } from "../components/NRFlowContext";
import PageLayout from "../components/PageLayout";
import FormLayout from "../components/FormLayout";
import useRedirectOnEmptyForm from "../components/useRedirectOnEmptyForm";
import { generateQueryParams } from "../utils/flow";

import { isRequired } from "../validators";
import RadioGroup from "../components/RadioGroup";
import styles from "./thermal.module.scss";

export const thermalValidator = isRequired("Please select an option.");

const ThermalBarrierForm = () => {
  useRedirectOnEmptyForm();

  const router = useRouter();
  const { formState, setFormState, steps } = useContext(NRFlowContext);
  const [showError, setShowError] = useState(false);

  const currentThermalBarrier = formState.thermal ? formState.thermal : "";

  const errorMessage = thermalValidator(currentThermalBarrier);

  const handleSelectionUpdate = (event: React.FormEvent<HTMLInputElement>) => {
    const selectionId = event.currentTarget.value;
    const newTags = [
      ...formState.tags.split(",").filter(tag => !tag.startsWith("thermal")),
      event.currentTarget.value
    ];

    setShowError(false);

    setFormState({
      ...formState,
      tags: newTags.toString(),
      thermal: selectionId
    });
  };

  return (
    <PageLayout
      errorMessage={errorMessage}
      showError={showError}
      headTitle="Thermal Barrier | IKO"
      onSubmit={() => {
        if (errorMessage) {
          setShowError(true);
        } else {
          router.push(`/coverboard${generateQueryParams(formState)}`);
        }
      }}
      stepName="Thermal Barrier"
      steps={steps}
    >
      <FormLayout stepText="Question 4 of 6" title="Thermal Barrier Required">
        <RadioGroup
          className={styles.Options}
          labelClassName={styles.OptionLabel}
          name="Thermal Barrier"
          options={[
            {
              value: "thermal-yes",
              label: "Yes"
            },
            { value: "thermal-no", label: "No" },
            {
              value: "thermal-unsure",
              label: "Not Sure/Optional"
            }
          ]}
          selected={currentThermalBarrier}
          onChange={handleSelectionUpdate}
        />
      </FormLayout>
    </PageLayout>
  );
};

export default ThermalBarrierForm;
